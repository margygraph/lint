# 🚀 Guida Deploy su GitHub Pages

## ⚡ Deploy Automatico (Consigliato)

### 1. Prepara il Repository

```bash
# Inizializza git (se non già fatto)
git init
git add .
git commit -m "Initial commit - LINT website"

# Crea il repository su GitHub
# Vai su https://github.com/new e crea un nuovo repo
# NON inizializzare con README, .gitignore o license

# Collega il repo locale a GitHub
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git
git push -u origin main
```

### 2. Configura il Base Path

**Importante:** Modifica `vite.config.js` e sostituisci `NOME_REPO` con il nome esatto del tuo repository:

```javascript
const base = '/NOME_REPO/';  // ← Cambia qui
```

**Esempi:**
- Repo: `mario/lint-website` → `base: '/lint-website/'`
- Repo: `mario/mario.github.io` → `base: '/'` (sito personale)

### 3. Abilita GitHub Pages

1. Vai sul tuo repository su GitHub
2. Clicca su **Settings** (tab in alto)
3. Nel menu laterale, clicca su **Pages**
4. Sotto **Source**, seleziona **GitHub Actions**
5. Salva le impostazioni

### 4. Deploy Automatico

Ora ogni push su `main` triggerà automaticamente il deploy:

```bash
# Fai una modifica
git add .
git commit -m "Update content"
git push origin main
```

Il workflow GitHub Actions:
1. Installerà le dipendenze
2. Buildarà il progetto
3. Deployarà su GitHub Pages

**Tempo stimato:** 2-3 minuti

### 5. Verifica il Deploy

1. Vai su **Actions** nel tuo repository
2. Vedrai il workflow in esecuzione
3. Al completamento, il sito sarà disponibile su:
   ```
   https://TUO_USERNAME.github.io/NOME_REPO/
   ```

---

## 🔧 Deploy Manuale (Alternativo)

Se preferisci deployare manualmente senza GitHub Actions:

### Opzione A: Branch gh-pages

```bash
# Installa gh-pages
npm install -D gh-pages

# Build del progetto
npm run build

# Deploy su branch gh-pages
npx gh-pages -d dist
```

Poi su GitHub:
1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` → `/ (root)`
4. Salva

### Opzione B: Git Subtree

```bash
# Build
npm run build

# Push della cartella dist su branch gh-pages
git subtree push --prefix dist origin gh-pages
```

---

## 🐛 Troubleshooting

### Problema: Pagina bianca o 404

**Causa:** Base path errato in `vite.config.js`

**Soluzione:**
```javascript
// Se il repo è "username/lint-website"
const base = '/lint-website/';

// Se il repo è "username/username.github.io"
const base = '/';
```

### Problema: Assets non caricano (CSS/JS 404)

**Causa:** Percorsi assoluti errati

**Soluzione:** Verifica che il `base` in `vite.config.js` corrisponda al nome del repo.

### Problema: Route del SPA non funzionano

**Causa:** GitHub Pages non gestisce nativamente le route client-side

**Soluzione:** Il file `404.html` incluso gestisce automaticamente il redirect.

### Problema: Workflow non parte

**Causa:** GitHub Actions non abilitato o branch errato

**Soluzione:**
1. Verifica che il workflow sia in `.github/workflows/deploy.yml`
2. Verifica che il push sia su `main` o `master`
3. Controlla in **Actions** per vedere gli errori

---

## 📝 Checklist Pre-Deploy

- [ ] Modificato `base` in `vite.config.js` con il nome del repo
- [ ] Creato repository su GitHub
- [ ] Push del codice su GitHub
- [ ] Abilitato GitHub Pages (Settings → Pages → GitHub Actions)
- [ ] Verificato che il workflow sia in esecuzione
- [ ] Testato il sito su `https://username.github.io/repo-name/`

---

## 🌐 Dominio Personalizzato (Opzionale)

Se vuoi usare un dominio personalizzato (es. `www.lintmicrofibercloths.it`):

### 1. Configura il DNS

Nel tuo provider DNS, aggiungi:

**Per dominio apex (lintmicrofibercloths.it):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**Per sottodominio (www.lintmicrofibercloths.it):**
```
CNAME www   TUO_USERNAME.github.io
```

### 2. Configura GitHub

1. **Settings** → **Pages**
2. **Custom domain**: `www.lintmicrofibercloths.it`
3. Spunta **Enforce HTTPS**
4. Salva

### 3. Crea il file CNAME

```bash
echo "www.lintmicrofibercloths.it" > public/CNAME
```

---

## 📊 Monitoraggio

Dopo il deploy, puoi monitorare:

- **Actions**: Stato dei deploy
- **Pages**: URL del sito e dominio personalizzato
- **Analytics**: Integra Google Analytics o Plausible

---

## 🔄 Aggiornamenti

Per aggiornare il sito:

```bash
# Fai le tue modifiche
npm run dev  # Testa in locale

# Quando pronto
git add .
git commit -m "Update: descrizione modifiche"
git push origin main
```

Il deploy è automatico! 🎉

---

## 📞 Supporto

Se hai problemi:
1. Controlla i log in **Actions**
2. Verifica la configurazione in **Settings → Pages**
3. Consulta la [documentazione GitHub Pages](https://docs.github.com/en/pages)
