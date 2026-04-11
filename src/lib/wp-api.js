// Server-side data fetching module (no directive needed — imported by Server Components)

const API_URL = process.env.WORDPRESS_API_URL;
import { mapOpaqueError } from "./security";

async function fetchAPI(query, { variables } = {}) {
  const headers = { 
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referer": process.env.NEXT_PUBLIC_BASE_URL || API_URL
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const fetchOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { 
      tags: ["wordpress"] 
    },
  };

  try {
    if (!API_URL) {
      console.warn("WORDPRESS_API_URL is not set — returning empty data.");
      return null;
    }
    const res = await fetch(API_URL, fetchOptions);
    if (!res.ok) {
      console.error(`WordPress API responded with ${res.status}: ${res.statusText}`);
      return null;
    }
    const json = await res.json();
    if (json.errors && Array.isArray(json.errors) && json.errors.length > 0) {
      const errorMessage = json.errors[0]?.message || 'Unknown GraphQL Error';
      const opaqueError = await mapOpaqueError(errorMessage, 'GRAPHQL');
      console.warn(`[Secure Fetch] ${opaqueError}`);
      return null;
    }
    return json.data;
  } catch (err) {
    const opaqueError = await mapOpaqueError(err, 'NETWORK');
    console.warn(`[Secure Fetch] ${opaqueError}`);
    return null; // fetchAPI itself can still return null as it's a generic base
  }
}

export async function getHeroData(config = {}) {
  const { 
    fresh = "politics", 
    stacked = "crime", 
    popular = "news" 
  } = config;

  const data = await fetchAPI(
    `
    query GetHeroData($fresh: String!, $stacked: String!, $popular: String!) {
      # Big Featured Post - Most recent from ALL posts (site-wide)
      featured: posts(first: 1) {
        nodes {
          ...PostFields
        }
      }
      # Fresh Stories (Used for bottom row and right-top)
      fresh: posts(first: 6, where: { categoryName: $fresh }) {
        nodes {
          ...PostFields
        }
      }
      # Stacked Sidebar (Left Column)
      stacked: posts(first: 2, where: { categoryName: $stacked }) {
        nodes {
          ...PostFields
        }
      }
      # Popular Stories (Numbered List on Right)
      popular: posts(first: 5, where: { categoryName: $popular }) {
        nodes {
          ...PostFields
        }
      }
      # Ticker Headlines
      ticker: posts(first: 5) {
        nodes {
          title
          slug
        }
      }
    }
    ${postFieldsFragment}
  `,
    {
      variables: { fresh, stacked, popular }
    }
  );

  const big = data?.featured?.nodes?.[0] || data?.fresh?.nodes?.[0] || data?.ticker?.nodes?.[0] || null;

  return {
    big,
    fresh: (data?.fresh?.nodes || []).filter(p => p.slug !== big?.slug),
    stacked: data?.stacked?.nodes || [],
    popular: data?.popular?.nodes || [],
    ticker: data?.ticker?.nodes || [],
  };
}

export async function getHomeSections(sections = []) {
  if (!sections.length) return {};

  const queries = sections.map((s, i) => `
    section${i}: posts(first: ${s.limit || 6}, where: { categoryName: "${s.categorySlug}", orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...PostFields
      }
    }
  `).join("\n");

  const data = await fetchAPI(
    `
    query GetHomeSections {
      ${queries}
    }
    ${postFieldsFragment}
    `
  );

  const result = {};
  sections.forEach((s, i) => {
    result[s.id || s.categorySlug] = data?.[`section${i}`]?.nodes || [];
  });

  return result;
}

const postFieldsFragment = `
    fragment PostFields on Post {
      title
      slug
      date
      excerpt
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
`;

export async function getCategoryPosts(slug, first = 12) {
  // --- Slug Mapping for Pretty URLs ---
  const slugMap = {
    "cover": "cover-stories",
    "society-and-fashion": "society"
  };
  const targetSlug = slugMap[slug] || slug;

  const data = await fetchAPI(
    `
    query GetCategoryPosts($slug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $slug }) {
        nodes {
          ...PostFields
        }
      }
    }
    ${postFieldsFragment}
  `,
    {
      variables: { slug: targetSlug, first },
    }
  );

  const posts = data?.posts?.nodes || [];
  
  let categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  if (posts.length > 0 && posts[0].categories?.nodes?.length > 0) {
    const match = posts[0].categories.nodes.find(c => c.slug?.toLowerCase() === targetSlug.toLowerCase());
    if (match) categoryName = match.name;
  }

  return {
    name: categoryName,
    description: "",
    posts: posts || [],
  };
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetPostDetails($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ...PostDetailFields
      }
    }
    fragment PostDetailFields on Post {
      id
      databaseId
      title
      content
      date
      excerpt
      slug
      author {
        node {
          name
          avatar { url }
        }
      }
      categories {
        nodes {
          name
          slug
          databaseId
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  `,
    {
      variables: { slug },
    }
  );

  const post = data?.post;
  if (!post) return null;

  return {
    ...post,
    cursor: null
  };
}

export async function getAdjacentPosts(cursor) {
  if (!cursor) return { next: null, previous: null };

  const data = await fetchAPI(
    `
    query GetAdjacent($after: String, $before: String) {
      next: posts(first: 1, after: $after) {
        nodes { title slug }
      }
      previous: posts(last: 1, before: $before) {
        nodes { title slug }
      }
    }
    `,
    { variables: { after: cursor, before: cursor } }
  );

  return {
    next: data?.next?.nodes?.[0] || null,
    previous: data?.previous?.nodes?.[0] || null,
  };
}

export async function getLatestPosts(first = 5) {
  const data = await fetchAPI(
    `
    query GetLatestPosts($first: Int!) {
      posts(first: $first) {
        nodes {
          title
          slug
          date
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `,
    {
      variables: { first },
    }
  );

  return data?.posts?.nodes || [];
}
export async function getLatestPostsByCategory(categorySlug, first = 5) {
  const data = await fetchAPI(
    `
    query GetLatestPostsByCategory($categorySlug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categorySlug }) {
        nodes {
          title
          slug
          date
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `,
    {
      variables: { categorySlug, first },
    }
  );

  return data?.posts?.nodes || [];
}

export async function getRelatedPosts(categoryIds, excludeId, first = 4) {
  const data = await fetchAPI(
    `
    query GetRelatedPosts($categoryIds: [ID], $excludeId: [ID], $first: Int!) {
      posts(first: $first, where: { categoryIn: $categoryIds, notIn: $excludeId }) {
        nodes {
          title
          slug
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `,
    {
      variables: { categoryIds, excludeId: [excludeId], first },
    }
  );

  const related = data?.posts?.nodes || [];

  // Fallback: If fewer than requested, get latest posts
  if (related.length < first) {
    const fallbackCount = first - related.length;
    const latest = await getLatestPosts(fallbackCount + 1);
    const filteredLatest = latest.filter(p => !related.find(r => r.slug === p.slug) && p.id !== excludeId);
    return [...related, ...filteredLatest.slice(0, fallbackCount)];
  }

  return related;
}

export async function getCategories() {
  const data = await fetchAPI(
    `
    query GetCategories {
      categories(first: 50) {
        nodes {
          name
          slug
          parentDatabaseId
        }
      }
    }
    `
  );
  return data?.categories?.nodes || [];
}

export async function getAdvertsByPlacement(placementSlug, first = 5) {
  const data = await fetchAPI(
    `
    query GetAdverts($first: Int!) {
      adverts(first: $first) {
        nodes {
          title
          adLink
          adVideoUrl
          adPlacements {
            nodes {
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: { first: 50 }, // Fetch a larger batch and filter locally for robustness
    }
  );

  const allAdverts = data?.adverts?.nodes || [];
  
  // Filter by placement slug locally
  const filtered = allAdverts.filter(ad => 
    ad.adPlacements?.nodes?.some(p => p.slug === placementSlug)
  );

  return filtered.slice(0, first);
}

export async function getAllPostSlugs() {
  const data = await fetchAPI(
    `
    query GetAllPostSlugs {
      posts(first: 100) {
        nodes {
          slug
          date
        }
      }
    }
    `
  );
  return data?.posts?.nodes || [];
}
