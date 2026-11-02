# 📸 Guida Immagini

## Immagini Generate

Il sito utilizza 7 immagini generate con AI che evocano pulizia, freschezza e professionalità:

1. **Hero** - Panni in microfibra professionali arrangiati artisticamente
2. **Multiuso** - Panno multiuso in azione su superficie moderna
3. **Vetri** - Pulizia vetri senza aloni, finitura cristallina
4. **Car Detailing** - Detailing auto professionale con panni premium
5. **Sostenibilità** - Concept eco-friendly con microfibra e natura
6. **Durata** - Lavaggio industriale, resistenza certificata
7. **Efficacia** - Test scientifico di laboratorio

## URL Temporanei (Demo)

Attualmente il sito usa URL temporanei delle immagini generate:

```typescript
// src/images.ts
export const IMAGES = {
  hero: 'https://image.qwenlm.ai/generated-images/c92d373a-8fb7-46a0-b0d1-aadd25448411/_result.png',
  multiuso: 'https://image.qwenlm.ai/generated-images/4cd50a1c-a96d-4eda-b461-54561e37a8ed/_result.png',
  vetri: 'https://image.qwenlm.ai/generated-images/4b89a179-3880-408a-9ae1-558eaf31abbf/_result.png',
  detailing: 'https://image.qwenlm.ai/generated-images/40e6e883-8bb4-4a1f-a6b7-290726aa49a3/_result.png',
  sostenibilita: 'https://image.qwenlm.ai/generated-images/502b8970-d804-44ae-a7e4-84c80278ba16/_result.png',
  durata: 'https://image.qwenlm.ai/generated-images/bd0c4938-0ca6-4a6f-b06e-bc91799b240d/_result.png',
  efficacia: 'https://image.qwenlm.ai/generated-images/b98db643-8e8a-4485-ab59-effbaf339c6f/_result.png',
};
```

## ⚠️ Importante: Scaricare le Immagini per il Deploy

Gli URL temporanei potrebbero non essere permanenti. **Prima del deploy**, scarica le immagini e salvale localmente:

### Metodo 1: Download Manuale

1. Apri ogni URL in un browser
2. Clicca col tasto destro → "Salva immagine con nome"
3. Salva nella cartella `public/images/` con questi nomi:
   - `hero.png`
   - `multiuso.png`
   - `vetri.png`
   - `detailing.png`
   - `sostenibilita.png`
   - `durata.png`
   - `efficacia.png`

4. Aggiorna `src/images.ts`:

```typescript
export const IMAGES = {
  hero: '/images/hero.png',
  multiuso: '/images/multiuso.png',
  vetri: '/images/vetri.png',
  detailing: '/images/detailing.png',
  sostenibilita: '/images/sostenibilita.png',
  durata: '/images/durata.png',
  efficacia: '/images/efficacia.png',
};
```

### Metodo 2: Script di Download (Linux/Mac)

```bash
# Crea la cartella
mkdir -p public/images

# Scarica le immagini
curl -o public/images/hero.png "https://image.qwenlm.ai/generated-images/c92d373a-8fb7-46a0-b0d1-aadd25448411/_result.png"
curl -o public/images/multiuso.png "https://image.qwenlm.ai/generated-images/4cd50a1c-a96d-4eda-b461-54561e37a8ed/_result.png"
curl -o public/images/vetri.png "https://image.qwenlm.ai/generated-images/4b89a179-3880-408a-9ae1-558eaf31abbf/_result.png"
curl -o public/images/detailing.png "https://image.qwenlm.ai/generated-images/40e6e883-8bb4-4a1f-a6b7-290726aa49a3/_result.png"
curl -o public/images/sostenibilita.png "https://image.qwenlm.ai/generated-images/502b8970-d804-44ae-a7e4-84c80278ba16/_result.png"
curl -o public/images/durata.png "https://image.qwenlm.ai/generated-images/bd0c4938-0ca6-4a6f-b06e-bc91799b240d/_result.png"
curl -o public/images/efficacia.png "https://image.qwenlm.ai/generated-images/b98db643-8e8a-4485-ab59-effbaf339c6f/_result.png"
```

### Metodo 3: PowerShell (Windows)

```powershell
# Crea la cartella
New-Item -ItemType Directory -Force -Path public/images

# Scarica le immagini
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/c92d373a-8fb7-46a0-b0d1-aadd25448411/_result.png" -OutFile "public/images/hero.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/4cd50a1c-a96d-4eda-b461-54561e37a8ed/_result.png" -OutFile "public/images/multiuso.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/4b89a179-3880-408a-9ae1-558eaf31abbf/_result.png" -OutFile "public/images/vetri.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/40e6e883-8bb4-4a1f-a6b7-290726aa49a3/_result.png" -OutFile "public/images/detailing.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/502b8970-d804-44ae-a7e4-84c80278ba16/_result.png" -OutFile "public/images/sostenibilita.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/bd0c4938-0ca6-4a6f-b06e-bc91799b240d/_result.png" -OutFile "public/images/durata.png"
Invoke-WebRequest -Uri "https://image.qwenlm.ai/generated-images/b98db643-8e8a-4485-ab59-effbaf339c6f/_result.png" -OutFile "public/images/efficacia.png"
```

## Ottimizzazione Immagini (Opzionale)

Per migliorare le performance, puoi ottimizzare le immagini:

### Con Sharp (Node.js)

```bash
npm install -D sharp
```

```javascript
// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images';

fs.readdirSync(imagesDir).forEach(file => {
  if (file.endsWith('.png')) {
    sharp(path.join(imagesDir, file))
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(imagesDir, file.replace('.png', '.webp')))
      .then(() => console.log(`Optimized: ${file}`))
      .catch(err => console.error(err));
  }
});
```

```bash
node optimize-images.js
```

### Con ImageMagick (CLI)

```bash
# Converti in WebP con qualità 80
for file in public/images/*.png; do
  convert "$file" -quality 80 "${file%.png}.webp"
done

# Ridimensiona a max 1200px larghezza
for file in public/images/*.png; do
  convert "$file" -resize '1200x>' "$file"
done
```

## Struttura Finale

```
public/
  images/
    hero.png (o .webp)
    multiuso.png (o .webp)
    vetri.png (o .webp)
    detailing.png (o .webp)
    sostenibilita.png (o .webp)
    durata.png (o .webp)
    efficacia.png (o .webp)
```

## Note

- Le immagini sono già ottimizzate per il web (PNG)
- Per performance migliori, converti in WebP
- Dimensioni consigliate: max 1200px larghezza
- Qualità consigliata: 80% per WebP, 85% per JPEG

## Alternative: Immagini dal Sito Originale

Se preferisci usare le immagini originali dal sito WordPress:

1. Vai su https://www.lintmicrofibercloths.it/
2. Clicca col tasto destro sulle immagini → "Copia indirizzo immagine"
3. Scarica e salva in `public/images/`
4. Aggiorna `src/images.ts` con i nuovi path

Immagini disponibili sul sito originale:
- Hero: `Panni-in-Microfibra-Professionali.png.webp`
- Multiuso: `LONG-LIFE-Detailing-Polish-Cera.png.webp`
- Vetri: `SUPER-GLASSES-PRO-Vetri-Auto-Pulizia-Asciugatura.png.webp`
- Detailing: `Mommy-Amar-per-Vetri-Cromature-Specchi.png.webp`
- Categorie: `Cat_Panno-Microfibra.png.webp`, `Cat_Accessori-Pulizia.png.webp`, etc.
- Qualità: `sostenibilita-ambientale.jpeg.webp`, `piclumen-1729422225830.webp`, etc.
