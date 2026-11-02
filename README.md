# LINT — Panni in Microfibra Professionali

Sito web cinematografico per LINT, ridisegnato con React + Vite + Tailwind CSS + Framer Motion.

## 🎬 Deploy su GitHub Pages

### Setup Iniziale

1. **Crea un nuovo repository su GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git
   git push -u origin main
   ```

2. **Configura il base path in `vite.config.js`**
   
   Modifica la riga:
   ```js
   const base = '/NOME_REPO/';
   ```
   
   Sostituisci `NOME_REPO` con il nome esatto del tuo repository GitHub.
   
   > ⚠️ Se il repository è `username.github.io` (sito personale), usa `'/'`

3. **Abilita GitHub Pages**
   - Vai su **Settings** → **Pages** del repository
   - Sotto **Source**, seleziona **GitHub Actions**
   - Il deploy partirà automaticamente ad ogni push su `main`

4. **Verifica il deploy**
   - Dopo il push, vai su **Actions** per vedere il workflow
   - Il sito sarà disponibile su: `https://TUO_USERNAME.github.io/NOME_REPO/`

### Deploy Manuale (Alternativo)

Se preferisci deployare manualmente:

```bash
# Build del progetto
npm run build

# La cartella dist/ contiene i file statici
# Copia il contenuto di dist/ nel branch gh-pages
git subtree push --prefix dist origin gh-pages
```

Oppure con `gh-pages` package:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

### Struttura del Deploy

```
.github/
  workflows/
    deploy.yml      # Workflow automatico GitHub Actions
public/
  .nojekyll         # Disabilita Jekyll su GitHub Pages
  404.html          # Pagina 404 con redirect SPA
dist/               # Output del build (generato)
```

## 🛠️ Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Build per produzione
npm run build

# Preview del build
npm run preview
```

## 📋 Requisiti

- Node.js 18+
- npm 9+

## 🎨 Stack Tecnologico

- **React 18** — UI framework
- **Vite** — Build tool ultra-rapido
- **Tailwind CSS** — Utility-first CSS
- **Framer Motion** — Animazioni cinematografiche
- **TypeScript** — Type safety

## 📝 Note

- Il sito è ottimizzato per GitHub Pages con SPA routing
- Il file `404.html` gestisce il redirect per le route client-side
- Il base path in `vite.config.js` deve corrispondere al nome del repo
- Le immagini sono ottimizzate automaticamente da Vite nel build
