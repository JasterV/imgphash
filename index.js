const { download, hash, calculateSimilarity } = require("./lib");

const URL1 =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/w_400/koala1.jpg";
const URL2 = "https://res.cloudinary.com/demo/image/upload/h_180/koala2.jpg";
const URL3 = "https://res.cloudinary.com/demo/image/upload/h_180/koala4.jpg";

async function main() {
  console.log("Urls", { URL1, URL3 });
  const image1 = await download(URL1);
  const image2 = await download(URL3);
  const hash1 = await hash(image1);
  const hash2 = await hash(image2);
  console.log("Hashes", { hash1, hash2 });
  const similarity = calculateSimilarity(hash1, hash2);
  console.log("similarity", { similarity });
}

main().catch((err) => console.log(err));
