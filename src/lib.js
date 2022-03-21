const blockhash = require("blockhash-core");
const { getImageData, imageFromBuffer } = require("@canvas/image");
const { hexToBin, download } = require("./utils");

class HashImage {
  constructor(buffer) {
    if (!(buffer instanceof Uint8Array)) {
      throw new Error(
        "Invalid parameter, please use a buffer or an instance of Uint8Array"
      );
    }
    this.buffer = buffer;
  }

  static async fromUrl(url) {
    try {
      const buffer = await download(url);
      return new HashImage(buffer);
    } catch (err) {
      throw new Error(
        "Error on image download, make sure you are passing a valid string url"
      );
    }
  }

  static hashCompare(hash1, hash2) {
    if (typeof hash1 !== "string" || typeof hash2 !== "string") {
      throw new Error("Both hash values need to be strings");
    }
    let similarity = 0;
    const hash1Array = hash1.split("");
    hash1Array.forEach((bit, index) => {
      hash2[index] === bit ? similarity++ : null;
    });
    return similarity / hash1.length;
  }

  async hash() {
    const data = await imageFromBuffer(this.buffer);
    const hexHash = await blockhash.bmvbhash(getImageData(data), 8);
    const hash = hexToBin(hexHash);
    return hash;
  }

  async compare(other) {
    if (!(other instanceof HashImage)) {
      throw new Error("Can't compare with a non HashImage value");
    }
    const hash1 = await this.hash();
    const hash2 = await other.hash();
    return HashImage.hashCompare(hash1, hash2);
  }
}

module.exports = { HashImage };
