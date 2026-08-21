# Portfólio — Arthur Machado

Site estático (HTML/CSS/JS puro, sem build) do portfólio profissional.

## Rodar localmente

Abra `index.html` direto no navegador, ou sirva a pasta com qualquer servidor
estático (recomendado para o `fetch`/paths relativos funcionarem igual à produção):

```bash
npx serve .
# ou
python -m http.server 8080
```

## Idiomas

O site tem duas versões independentes que compartilham CSS/JS/logos:

- **Português**: `index.html` (raiz)
- **English**: `en/index.html`

Um link no header (PT/EN) alterna entre elas. Tema (claro/escuro) é salvo no
`localStorage` e vale para as duas.

## Editar conteúdo

- **Projetos**: edite `data/projects.js` (PT) e `data/projects.en.js` (EN) —
  cada item vira um card na seção "Projetos"/"Projects".
  Use `status: "pass"` quando o projeto estiver publicado e pronto pra mostrar.
- **Texto/experiência**: direto em `index.html` e `en/index.html`.
- **Cores, tipografia, espaçamento**: variáveis no topo de `css/style.css`
  (inclui paleta clara e escura).
- **CV**: substitua `assets/cv-arthur-machado.pdf` (PT) e
  `assets/resume-arthur-machado.pdf` (EN) quando atualizar o currículo.

## Deploy

Qualquer host de site estático funciona sem configuração adicional:

- **GitHub Pages**: `git init`, suba num repo, ative Pages apontando pra branch/pasta.
- **Netlify / Vercel**: arraste a pasta no dashboard, ou conecte o repo Git —
  não precisa de build command (site já é estático).

## Migrar para um framework depois

O conteúdo já está separado da marcação onde fazia sentido (`data/projects.js`),
e o CSS usa variáveis/tokens em vez de valores soltos. Migrar para Astro/Next
depois significa principalmente: converter as seções de `index.html` em
componentes e importar `data/projects.js` como dados.
