# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Especialista IA (Groq + Llama + Whisper)

1. Copie o arquivo `.env.example` para `.env.local`.
2. Preencha:
   - `VITE_GROQ_API_KEY`
   - `VITE_GROQ_MODEL` (padrao: `llama-3.3-70b-versatile`)
   - `VITE_GROQ_WHISPER_MODEL` (padrao: `whisper-large-v3-turbo`)
   - `VITE_OPENAI_API_KEY`
   - `VITE_OPENAI_WHISPER_MODEL` (padrao: `whisper-1`)
3. Rode o projeto:

```bash
npm run dev
```

O Especialista IA aparece no cabecalho (desktop), com chat ampliado e suporte a interacoes por audio via Whisper.

## Deploy no GitHub Pages (gratis)

Ja existe workflow pronto em:

`/.github/workflows/deploy-pages.yml`

Como publicar:

1. Suba o projeto para um repositorio no GitHub (branch `main`).
2. No repositório, abra `Settings > Pages`.
3. Em `Source`, selecione `GitHub Actions`.
4. Faça um push na `main` (ou rode manualmente em `Actions > Deploy GitHub Pages`).
5. Aguarde o job concluir e abra a URL publicada.

Observacoes tecnicas:

- O build ajusta automaticamente `VITE_BASE_PATH` para funcionar em:
  - `https://usuario.github.io/repositorio` (Project Pages)
  - `https://usuario.github.io` (User Pages)
- O arquivo `public/404.html` faz fallback de SPA para rotas internas (`/blog`, `/catalogo/produtos/...`).
