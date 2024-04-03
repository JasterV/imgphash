import  { HashImage } from "../src/HashImage.js";
import { PHash } from "../src/PHash.js";

import {expect} from 'expect';

const url1 =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/w_400/koala1.jpg";
const url2 = "https://res.cloudinary.com/demo/image/upload/h_180/koala2.jpg";
const url3 =
  "https://res.cloudinary.com/demo/image/upload/h_180/another_koala.jpg";
const hash1 = "010101";
const hash2 = "010001";
const testBuffer = Buffer.from("Hello, World");

describe("Test HashImage", () => {
  it("Can create an instance from a buffer", async () => {
    expect.assertions(1);
    const image = new HashImage(testBuffer);
    expect(image).toBeInstanceOf(HashImage);
  });

  it("Can create an instance from a valid url", async () => {
    expect.assertions(1);
    const image = await HashImage.fromUrl(url1);
    expect(image).toBeInstanceOf(HashImage);
  });

  it("Can't create an instance from an invalid url", async () => {
    expect.assertions(1);
    await expect(HashImage.fromUrl("invalid-url")).rejects.toThrowError(
      "Error on image download, make sure you are passing a valid string url"
    );
  });

  it("Can compare 2 valid images", async () => {
    expect.assertions(1);
    const image1 = await HashImage.fromUrl(url1);
    const image2 = await HashImage.fromUrl(url2);
    await expect(image1.compare(image2)).resolves.toEqual(expect.any(Number));
  });

  it("Returns 1 when comparing 2 equal images", async () => {
    expect.assertions(1);
    const image1 = await HashImage.fromUrl(url1);
    const image2 = await HashImage.fromUrl(url1);
    const similarity = await image1.compare(image2);
    expect(similarity).toBe(1);
  });

  it("Can't compare with a non HashImage object", async () => {
    expect.assertions(1);
    const image = new HashImage(testBuffer);
    await expect(image.compare("asdfsdf")).rejects.toThrowError(
      "Can't compare with a non HashImage value"
    );
  });
});

describe("Test PHash", () => {
  it("Can create an instance from a valid binary hash", () => {
    expect.assertions(1);
    const phash = new PHash(hash1);
    expect(phash).toBeInstanceOf(PHash);
  });

  it("Can't create an instance from a non string value", () => {
    expect.assertions(1);
    try {
      new PHash(2);
    } catch (err) {
      expect(err.message).toBe(
        "Can't construct a PHash instance with a non-string value"
      );
    }
  });

  it("Can't create an instance from a non binary hash", () => {
    expect.assertions(1);
    try {
      new PHash("dfgdfg");
    } catch (err) {
      expect(err.message).toBe(
        "Can't construct a PHash instance with a non-binary string value"
      );
    }
  });

  it("Can compare 2 valid PHash", () => {
    expect.assertions(1);
    const phash1 = new PHash(hash1);
    const phash2 = new PHash(hash2);
    const result = phash1.compare(phash2);
    expect(result).toEqual(expect.any(Number));
  });

  it("Returns 1 for 2 completely equal hashes", () => {
    expect.assertions(1);
    const phash1 = new PHash(hash1);
    const result = phash1.compare(phash1);
    expect(result).toBe(1);
  });

  it("Returns a result smaller than 1 for 2 different hashes", () => {
    expect.assertions(1);
    const phash1 = new PHash(hash1);
    const phash2 = new PHash(hash2);
    const similarity = phash1.compare(phash2);
    expect(similarity).toBeLessThan(1);
  });
});
