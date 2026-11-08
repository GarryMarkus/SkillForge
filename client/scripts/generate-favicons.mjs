import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPublicDir = path.resolve(__dirname, '../public');
const svgPath = path.join(clientPublicDir, 'favicon.svg');

// Base SVG content specifically with high-contrast dark theme defaults for raster rendering
const svgDarkContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <style>
      .bg { fill: #09090B; stroke: #27272A; stroke-width: 1.5px; }
      .glyph { stroke: #FFFFFF; stroke-width: 4.5px; stroke-linecap: round; stroke-linejoin: round; }
      .accent { fill: #FFFFFF; stroke: #FFFFFF; stroke-width: 4.5px; stroke-linecap: round; }
    </style>
  </defs>
  <rect x="1.5" y="1.5" width="61" height="61" rx="12" class="bg" />
  <line x1="17" y1="45" x2="28" y2="19" class="glyph" />
  <line x1="28" y1="45" x2="39" y2="19" class="glyph" />
  <line x1="44" y1="44" x2="49" y2="44" class="accent" />
</svg>
`.trim();

async function generateFavicons() {
  console.log('[generate-favicons] Starting favicon asset generation...');

  const svgBuffer = Buffer.from(svgDarkContent);

  // 1. Generate 16x16 PNG
  console.log('Generating favicon-16x16.png (16x16)...');
  const png16 = await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(clientPublicDir, 'favicon-16x16.png'), png16);

  // 2. Generate 32x32 PNG
  console.log('Generating favicon-32x32.png (32x32)...');
  const png32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(clientPublicDir, 'favicon-32x32.png'), png32);

  // 3. Generate 180x180 Apple Touch Icon
  console.log('Generating apple-touch-icon.png (180x180)...');
  const png180 = await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(clientPublicDir, 'apple-touch-icon.png'), png180);

  // 4. Assemble multi-size favicon.ico (16x16 and 32x32 PNG-encoded icons)
  console.log('Assembling multi-resolution favicon.ico...');
  const icoBuffer = assembleIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 }
  ]);
  fs.writeFileSync(path.join(clientPublicDir, 'favicon.ico'), icoBuffer);

  console.log('[generate-favicons] All favicon assets generated successfully in client/public/!');
}

/**
 * Packs multiple PNG buffers into a valid Windows ICO format file
 * @param {Array<{ width: number, height: number, buffer: Buffer }>} images
 * @returns {Buffer}
 */
function assembleIco(images) {
  const count = images.length;
  const headerLength = 6;
  const dirEntryLength = 16;
  const headerAndDirSize = headerLength + count * dirEntryLength;

  const header = Buffer.alloc(headerLength);
  header.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  header.writeUInt16LE(1, 2); // 1 = ICO icon
  header.writeUInt16LE(count, 4); // Number of images

  let currentOffset = headerAndDirSize;
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntryLength);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color count (0 = no color palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes (1)
    entry.writeUInt16LE(32, 6); // Bits per pixel (32bpp)
    entry.writeUInt32LE(img.buffer.length, 8); // Size of the image data in bytes
    entry.writeUInt32LE(currentOffset, 12); // Offset of image data from beginning of file

    dirEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
}

generateFavicons().catch((err) => {
  console.error('[generate-favicons] Error generating favicons:', err);
  process.exit(1);
});
