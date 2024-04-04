import axios from "axios";

// Utils
export async function download(url) {
  const response = await axios.get(url, { responseType: "stream" });
  const stream = response.data;
  const chunks = [];
  for await (let chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer;
}

export function calculateHashSimilarity(hash1, hash2) {
  let similarity = 0;
  const hash1Array = hash1.split("");
  hash1Array.forEach((bit, index) => {
    hash2[index] === bit ? similarity++ : null;
  });
  return similarity / hash1.length;
}

export function hexToBin(hexString) {
  const hexBinLookup = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let result = "";
  for (let i = 0; i < hexString.length; i++) {
    result += hexBinLookup[hexString[i]];
  }
  return result;
}
