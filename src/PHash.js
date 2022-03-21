class PHash {
  constructor(hash) {
    if (typeof hash !== "string") {
      throw new Error(
        "Can't construct a PHash instance with a non-string value"
      );
    }
    const isNonBinary = hash
      .trim()
      .split("")
      .some((chr) => chr !== "0" && chr !== "1");
    if (isNonBinary) {
      throw new Error(
        "Can't construct a PHash instance with a non-binary string value"
      );
    }
    this.hash = hash;
  }

  compare(other) {
    if (!(other instanceof PHash)) {
      throw new Error("Can't compare with a non PHash value");
    }
    const minLength = Math.min(this.hash.length, other.hash.length);
    const maxLength = Math.max(this.hash.length, other.hash.length);
    let similarity = 0;
    for (let i = 0; i < minLength; i++) {
      if (this.hash[i] === other.hash[i]) {
        similarity += 1;
      }
    }
    return similarity / maxLength;
  }
}

module.exports = PHash;
