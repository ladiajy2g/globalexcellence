import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");

  // 1. Security check
  if (secret !== process.env.REVALIDATION_TOKEN && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    let body = null;
    try {
        body = await request.json();
    } catch(e) {
        // body could be empty or not json sent
    }

    // 2. We use a universal tag 'wordpress' for our fetchAPI calls
    revalidateTag('wordpress');

    if (body && body.type) {
        // New strategy: WP Webhooks Json body
        if (body.type === 'post' && body.slug) {
            revalidateTag(`post-${body.slug}`);
        }
    } else {
        // 3. Fallback: Query params based path clearing (Old Way)
        const slug = request.nextUrl.searchParams.get("slug");
        const category = request.nextUrl.searchParams.get("category");

        revalidatePath("/");
        if (slug) {
            revalidatePath(`/${slug}`);
        }
        if (category) {
            revalidatePath(`/category/${category}`);
        }
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now()
    });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}

// Optional: Support GET for easy manual testing or simple webhooks
export async function GET(request) {
  return POST(request);
}
