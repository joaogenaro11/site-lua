// Gera favicon PNG/ICO, ícones do manifest e a imagem de compartilhamento (Open Graph).
// Uso: node scripts/gerar-imagens-sociais.mjs
// Requer as fontes Newsreader e Hanken Grotesk instaladas no sistema para o texto do OG.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const pub = new URL('../public/', import.meta.url);
const favicon = await readFile(new URL('favicon.svg', pub));

for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512], ['favicon-32.png', 32]]) {
  await sharp(favicon, { density: 600 }).resize(size, size).png().toFile(new URL(name, pub).pathname);
}

// favicon.ico (PNG embutido, 32x32)
const png32 = await sharp(favicon, { density: 600 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
await writeFile(new URL('favicon.ico', pub), Buffer.concat([header, png32]));

// Open Graph 1200x630
const W = 1200, H = 630, photoW = 500;
const photo = await sharp(new URL('../src/assets/fotos/luana-genaro-retrato-roxo.jpg', import.meta.url).pathname)
  .extract({ left: 0, top: 170, width: 1333, height: 1646 })
  .resize(photoW, H, { fit: 'cover' })
  .toBuffer();

const panel = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W - photoW}" height="${H}" viewBox="0 0 ${W - photoW} ${H}">
  <rect width="100%" height="100%" fill="#F7F5F0"/>
  <g fill="none" transform="translate(-170 330)" opacity="0.9">
    <circle cx="300" cy="300" r="270" stroke="#76519B" stroke-width="1" opacity="0.35"/>
    <circle cx="300" cy="300" r="200" stroke="#76519B" stroke-width="1" opacity="0.35"/>
  </g>
  <g transform="translate(80 92)" fill="none">
    <circle cx="60" cy="60" r="45" stroke="#512D6D" stroke-width="3" stroke-dasharray="255 28" stroke-linecap="round" transform="rotate(58 60 60) "/>
    <path d="M48 38 V78 H74" stroke="#512D6D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="74" cy="78" r="4.6" fill="#B4D936"/>
  </g>
  <text x="96" y="318" font-family="Newsreader 16pt, Newsreader" font-size="76" fill="#512D6D" letter-spacing="0.5">Luana Genaro</text>
  <text x="99" y="366" font-family="Hanken Grotesk" font-weight="500" font-size="16" fill="#76519B" letter-spacing="4.5">NUTRIÇÃO DE PRECISÃO E SAÚDE</text>
  <text x="98" y="470" font-family="Newsreader 16pt, Newsreader" font-style="italic" font-size="30" fill="#25232A">Nutricionista em Brasília · Lago Sul</text>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: '#F7F5F0' } })
  .composite([
    { input: Buffer.from(panel), left: 0, top: 0 },
    { input: photo, left: W - photoW, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(new URL('og-image.jpg', pub).pathname);

console.log('Imagens geradas em public/');
