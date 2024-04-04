<h1 align="center">Welcome to imgphash 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.5.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/JasterV/imgphash#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/JasterV/imgphash/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/JasterV/imgphash/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/JasterV/imgphash" />
  </a>
</p>

> Provide an image class that is able to calculate similarity to other images using the phash value

### 🏠 [Homepage](https://github.com/JasterV/imgphash#readme)

## Install

```sh
npm i imgphash
```

## Use

This module provides a class `HashImage` that you can use to hash an image and compare it

- Create a `HashImage` from a url

```javascript
const image = await HashImage.fromUrl(url1);
```

- Create a `HashImage` from a Node buffer

```javascript
const image = new HashImage(buffer);
```

- Get the hash of 2 images and compare them

```javascript
const image1 = await HashImage.fromUrl(url1);
const image2 = await HashImage.fromUrl(url2);
const hash1 = await image1.phash(); // PHash instance
const hash2 = await image2.phash();
const similarity = hash1.compare(hash2);
```

> The hash function returns an instance of `PHash`

- Or just compare 2 image objects, this is going to internally calculate their hash and use it

```javascript
const image1 = await HashImage.fromUrl(url1);
const image2 = await HashImage.fromUrl(url2);
const similarity = await image1.compare(image2);
```

> All the comparisons return a value between 0 and 1.
> 0 meaning that the images are completely different and 1 meaning they are exactly the same image

## Author

👤 **Victor Martinez <jaster.victor@gmail.com>**

- Website: https://jasterv.com
- Github: [@JasterV](https://github.com/JasterV)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/JasterV/imgphash/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Victor Martinez <jaster.victor@gmail.com>](https://github.com/JasterV).<br />
This project is [MIT](https://github.com/JasterV/imgphash/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
