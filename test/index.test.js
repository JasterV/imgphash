import { describe, it, expect } from "bun:test";
import { HashImage } from "../src/HashImage.js";
import { PHash } from "../src/PHash.js";

const url1 =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/w_400/koala1.jpg";
const url2 = "https://res.cloudinary.com/demo/image/upload/h_180/koala2.jpg";
const hash1 = "010101";
const hash2 = "010001";
const testBuffer = Buffer.from("Hello, World");

describe("Test HashImage", () => {
  it("Can create an instance from a buffer", () => {
    const image = new HashImage(testBuffer);
    expect(image).toBeInstanceOf(HashImage);
  });

  it("Can create an instance from a valid url", async () => {
    const image = await HashImage.fromUrl(url1);
    expect(image).toBeInstanceOf(HashImage);
  });

  it("Can't create an instance from an invalid url", async () => {
    await expect(HashImage.fromUrl("invalid-url")).rejects.toThrow(
      "Error on image download, make sure you are passing a valid string url",
    );
  });

  it("Can compare 2 valid images", async () => {
    const image1 = await HashImage.fromUrl(url1);
    const image2 = await HashImage.fromUrl(url2);
    const comparison = await image1.compare(image2);
    expect(comparison).toEqual(expect.any(Number));
  });

  it("Returns 1 when comparing 2 equal images", async () => {
    const image1 = await HashImage.fromUrl(url1);
    const image2 = await HashImage.fromUrl(url1);
    const similarity = await image1.compare(image2);
    expect(similarity).toBe(1);
  });

  it("Can't compare with a non HashImage object", async () => {
    const image = new HashImage(testBuffer);
    await expect(image.compare("asdfsdf")).rejects.toThrow(
      "Can't compare with a non HashImage value",
    );
  });
});

describe("Test PHash", () => {
  it("Can create an instance from a valid binary hash", () => {
    const phash = new PHash(hash1);
    expect(phash).toBeInstanceOf(PHash);
  });

  it("Can't create an instance from a non string value", () => {
    expect(() => new PHash(2)).toThrow(
      "Can't construct a PHash instance with a non-string value",
    );
  });

  it("Can't create an instance from a non binary hash", () => {
    expect(() => new PHash("dfgdfg")).toThrow(
      "Can't construct a PHash instance with a non-binary string value",
    );
  });

  it("Can compare 2 valid PHash", () => {
    const phash1 = new PHash(hash1);
    const phash2 = new PHash(hash2);
    const result = phash1.compare(phash2);
    expect(result).toEqual(expect.any(Number));
  });

  it("Returns 1 for 2 completely equal hashes", () => {
    const phash1 = new PHash(hash1);
    const result = phash1.compare(phash1);
    expect(result).toBe(1);
  });

  it("Returns a result smaller than 1 for 2 different hashes", () => {
    const phash1 = new PHash(hash1);
    const phash2 = new PHash(hash2);
    const similarity = phash1.compare(phash2);
    expect(similarity).toBeLessThan(1);
  });
});
