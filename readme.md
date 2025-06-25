# 🖼️ Image Format Converter

A simple and powerful CLI tool to **convert images** to different formats like WebP, JPEG, PNG, AVIF, and more — powered by [Sharp](https://github.com/lovell/sharp).

---

## 🚀 Features

- ✅ Convert a single image or **batch convert all** in a folder
- 🎯 Format support: `webp`, `jpeg`, `png`, `avif`, `tiff`, `heif`
- 🎚️ Control output quality (`-quality=80`)
- 🔍 Filter files by extension (`-ext=jpg`)
- 🗑️ Delete original files after conversion (`-del`)
* 🧪 **Dry run** support — see what will be converted (`-dry`)

---

## 📦 Installation (Global Use)

### 🔧 Step-by-step (run **cmd as Administrator**):

1. Clone the repo:
```bash
git clone https://github.com/sunjay-dev/Image-Format-Converter
````

2. Enter the directory:

```bash
cd Image-Format-Converter
```

3. Install dependencies:

```bash
npm install
```

4. Link the tool globally:

```bash
npm link
```

> ✅ After this, you can run `imgify` from any folder in your terminal.

---

## 🧑‍💻 Usage

### ➤ Convert a single image

```bash
imgify input.jpg
```

### ➤ Convert with a custom output

```bash
imgify input.jpg output.webp
```

### ➤ Convert all images in the current folder

```bash
imgify -all
```

### ➤ Convert only `.png` images

```bash
imgify -all -ext=png
```

### ➤ Convert and delete original files

```bash
imgify -all -del
```

### ➤ Preview conversion (dry run)

```bash
imgify -all --dry
```

---

## 🔧 Options

| Flag           | Description                                                  | Default |
| -------------- | ------------------------------------------------------------ | ------- |
| `-all`         | Convert all `.jpg`, `.jpeg`, `.png` in current folder        | —       |
| `-quality=80`  | Output quality (0–100, lossy formats only)                   | `80`    |
| `-format=webp` | Output format: `webp`, `jpeg`, `png`, `avif`, `tiff`, `heif` | `webp`  |
| `-ext=png`     | Only convert files with the specified extension              | all     |
| `-del`         | Delete the original file(s) after conversion                 | off     |
| `-dry`         | Simulate conversion (log what would be converted)            | off     |
| `-help`        | Show usage instructions                                      | —       |

---

## 🧪 Examples

```bash
imgify input.jpg -format=avif -quality=70
imgify -all -ext=jpeg -format=png -del
imgify input.png output.avif -quality=90
imgify -all --dry
```

---

## 📂 Supported Formats

* **Input**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tiff`, `.gif`, `.avif`, `.heif`
* **Output**: `webp`, `jpeg`, `png`, `avif`, `tiff`, `heif`

> Internally uses [Sharp](https://www.npmjs.com/package/sharp) for fast, high-quality conversions.
