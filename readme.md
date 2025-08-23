# 🖼️ imgify-cli - Image Format Converter

<img src="https://raw.githubusercontent.com/sunjay-dev/Image-format-converter/refs/heads/main/assets/preview.webp" alt="SolarVerse Preview" width="100%" />


A simple and powerful CLI tool to **convert images** to different formats like WebP, JPEG, PNG, AVIF, and more — powered by [Sharp](https://github.com/lovell/sharp).

```bash
npm i -g imgify-cli 
```

---

## 🚀 Features
- ✅ Convert a single image or **batch convert all** in a folder
- 🎯 Format support: `webp`, `jpeg`, `png`, `avif`, `tiff`, `gif`
- 🎚️ Control output quality (`-quality=80`)
- 🔍 Filter files by extension (`-ext=jpg`)
- 🗑️ Delete original files after conversion (`-del`)
* 🧪 **preview run** support — see what will be converted (`-preview`)

---



### 📦 Installation & Usage

### 🚀 One-liner (Run CMD on **Administrator**, If throw errors):

```bash
npm i -g imgify-cli 
```

You can use all options like (in any folder):

```bash
imgify-cli -all -ext=png -f=webp -quality=80
```

This is the **recommended way** to use `imgify-cli` quickly and without setup.

---

### 💻 Local Development or Manual Global Setup (For Contribution)

#### 🔧 Manual setup (if you want to contribute or link locally):

1. Clone the repo: (Open Terminal as **Administrator**)

```bash
git clone https://github.com/sunjay-dev/Image-Format-Converter
```

2. Enter the directory:

```bash
cd Image-Format-Converter
```

3. Install dependencies:

```bash
npm install
```

4. Link globally:

```bash
npm link
```

> Now you can run `imgify-cli` anywhere.

---

## 🧑‍💻 Usage

### ➤ Convert a single image

```bash
imgify-cli input.jpg output.png
```

### ➤ Convert with a custom output

```bash
imgify-cli input.jpg output.webp
```

### ➤ Convert all images in the current folder

```bash
imgify-cli -all
```
### ➤ Convert all images in the sub folder too

```bash
imgify-cli -s 
```

### ➤ Convert only `.png` images

```bash
imgify-cli -all -ext=png
```

### ➤ Convert and delete original files

```bash
imgify-cli -all -del
```

### ➤ Preview conversion (preview run)

```bash
imgify-cli -all --preview
```

---

## 🔧 Options

| Flag           | Description                                                  | Default |
| -------------- | ------------------------------------------------------------ | ------- |
| `-all / -a`    | Convert all `.jpg`, `.jpeg`, `.png` in current folder        | —       |
| `-quality=80 / -q`| Output quality (0–100, lossy formats only)                   | `80`    |
| `-format=webp / -f`| Output format: `webp`, `jpeg`, `png`, `avif`, `tiff`         | `webp`  |
| `-ext=png / -e`| Only convert files with the specified extension              | all     |
| `-del / -d`    | Delete the original file(s) after conversion                 | off     |
| `-preview / -p`| Simulate conversion (log what would be converted)            | off     |
| `-help / -h`   | Show usage instructions                                      | —       |
| `-subdir / -s` | Convert all `.jpg`, `.jpeg`, `.png` in sub folders too       | —       |

---

## 🧪 Examples

```bash
imgify-cli input.jpg -format=avif -quality=70
imgify-cli -all -ext=jpeg -format=png -del
imgify-cli input.png output.avif -quality=90
imgify-cli -all -preview
imgify-cli -s -f=webp -d -e=png
```

---

## 📂 Supported Formats

* **Input**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tiff`, `.gif`, `.avif`
* **Output**: `webp`, `jpeg`, `png`, `avif`, `tiff`

> Internally uses [Sharp](https://www.npmjs.com/package/sharp) for fast, high-quality conversions.
