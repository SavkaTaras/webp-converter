# webp-converter

## Image converter to webp format

### Tested w/Node 18, npm 8.x.x, and up

From root folder:

```bash
npm install
```

---

Place the images you want to convert into `images` folder.

Run:

```bash
npm run start
```

---

Processed images will go into `processed` folder. Converts `jpg`, `jpeg`, or `png` into `webp` format.

Pass sizes like this:

```bash
npm run start 500 700 1000
```

---

Settings:

https://github.com/imagemin/imagemin-webp

Enjoy.
