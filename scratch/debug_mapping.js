const { getCategoryPosts } = require('./src/lib/wp-api');

async function test() {
  try {
    console.log("Testing 'cover' -> 'cover-stories'...");
    const data = await getCategoryPosts("cover", 1);
    console.log("Success:", data.name);
    
    console.log("Testing 'society-and-fashion' -> 'society'...");
    const data2 = await getCategoryPosts("society-and-fashion", 1);
    console.log("Success:", data2.name);
  } catch (err) {
    console.error("Error during fetch:", err);
  }
}

test();
