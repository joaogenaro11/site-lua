# Luana Genaro — Nutrição de Precisão e Saúde

Site oficial (landing page) de Luana Genaro, nutricionista no Lago Sul, Brasília (DF).
Domínio: **https://luanagenaro.com.br**

Site estático feito com [Astro](https://astro.build) e CSS próprio. Não tem backend, banco de dados nem CMS, então pode ser hospedado de graça no Cloudflare Pages.

## Estrutura

```
src/
  data/site.ts         ← contatos, CRN, WhatsApp, formação (edite aqui)
  data/faq.ts          ← perguntas frequentes
  pages/index.astro    ← página principal (10 seções)
  pages/politica-de-privacidade.astro
  pages/404.astro
  components/          ← logo, monograma, cabeçalho, rodapé, botão flutuante
  assets/fotos/        ← fotos originais (otimizadas no build para WebP + JPG)
  styles/global.css    ← paleta, tipografia e componentes base
public/                ← favicon, ícones, imagem de compartilhamento, robots.txt, _headers
scripts/gerar-imagens-sociais.mjs ← gera favicon/ícones/og-image.jpg
```

## Rodar localmente

Requer Node.js 18.20+ (recomendado 22).

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:4321.

Build de produção (gera a pasta `dist/`):

```bash
npm run build
```

```bash
npm run preview
```

## Como editar

- **Telefone, Instagram, CRN, texto do WhatsApp:** `src/data/site.ts`
- **Perguntas frequentes:** `src/data/faq.ts`
- **Textos das seções:** `src/pages/index.astro`
- **Trocar uma foto:** substitua o arquivo em `src/assets/fotos/` mantendo o mesmo nome (ou ajuste o `import` no topo de `index.astro`). O build gera as versões otimizadas.

## Publicação no Cloudflare Pages (gratuito)

1. Acesse https://dash.cloudflare.com e entre (ou crie a conta gratuita).
2. Menu lateral **Workers & Pages** → **Create** → aba **Pages** → **Connect to Git**.
3. Autorize o GitHub e selecione o repositório `joaogenaro11/site-lua`.
4. Em **Set up builds and deployments**:
   - Production branch: `main`
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Em *Environment variables*, adicione `NODE_VERSION` = `22`
5. **Save and Deploy**. Quando terminar, o site fica disponível em um endereço `*.pages.dev`. Teste esse endereço antes de ligar o domínio.

Cada novo commit na branch `main` publica o site automaticamente.

## Domínio luanagenaro.com.br (Registro.br)

> Antes de mexer no DNS, confira se o domínio já tem e-mail (registros MX) ou outros serviços configurados. Eles precisam ser copiados para a Cloudflare.

**Opção recomendada: DNS na Cloudflare (gratuito)**

1. Cloudflare → **Add a domain** → digite `luanagenaro.com.br` → plano **Free**.
2. A Cloudflare importa os registros DNS atuais. **Confira se os MX (e-mail) e TXT apareceram**; se faltar algum, copie do painel atual do Registro.br.
3. A Cloudflare mostra **dois nameservers** (ex.: `xxx.ns.cloudflare.com`).
4. Em https://registro.br → **Entrar** → clique no domínio `luanagenaro.com.br` → seção **DNS** → **Alterar servidores DNS** → cole os dois nameservers da Cloudflare → **Salvar**.
5. Aguarde a propagação (normalmente de minutos a algumas horas; pode chegar a 48 h). A Cloudflare envia um e-mail quando o domínio estiver ativo.
6. No projeto do Pages → **Custom domains** → **Set up a custom domain** → `luanagenaro.com.br`. Repita para `www.luanagenaro.com.br`.
7. Para redirecionar `www` para o domínio sem `www`: Cloudflare → domínio → **Rules** → **Redirect Rules** → modelo *Redirect from WWW to root*.
8. Teste https://luanagenaro.com.br: o cadeado (HTTPS) deve aparecer. O certificado é emitido automaticamente.

## Privacidade (LGPD)

O site não tem formulários, cookies de rastreamento nem ferramentas de análise. As fontes são servidas pelo próprio site, sem Google Fonts externo. Se no futuro for adicionado Google Analytics, Meta Pixel ou formulário, será preciso atualizar a Política de Privacidade e, conforme o caso, incluir um aviso de consentimento de cookies.

## Fontes e licenças

- Newsreader e Hanken Grotesk: SIL Open Font License, via pacotes `@fontsource-variable`.
- Fotografias: autorais, de uso exclusivo da profissional.
