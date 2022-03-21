const { imageFromBuffer, getImageData } = require("@canvas/image");
const PHash = require("./PHash");
const { download, hexToBin } = require("./utils");
const blockhash = require("blockhash-core");

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

  async hash() {
    const data = await imageFromBuffer(this.buffer);
    const hexHash = await blockhash.bmvbhash(getImageData(data), 8);
    const hash = hexToBin(hexHash);
    return new PHash(hash);
  }

  async compare(other) {
    if (!(other instanceof HashImage)) {
      throw new Error("Can't compare with a non HashImage value");
    }
    const hash1 = await this.hash();
    const hash2 = await other.hash();
    return hash1.compare(hash2);
  }
}

module.exports = HashImage;
