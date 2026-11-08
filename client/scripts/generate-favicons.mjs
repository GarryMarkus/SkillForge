import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPublicDir = path.resolve(__dirname, '../public');

// Vector SVG template for high-contrast dark theme defaults used in raster rendering
const svgDarkContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <style>
      .bg { fill: #09090B; stroke: #27272A; stroke-width: 2px; }
      .fg { fill: none; stroke: #FFFFFF; stroke-width: 5.5px; stroke-linecap: round; stroke-linejoin: round; }
    </style>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="14" class="bg" />
  <path d="M28 20 H16 V32 H28 V44 H16" class="fg" />
  <path d="M37 44 V20 H49 M37 32 H47" class="fg" />
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

function assembleIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;

  let currentOffset = headerSize + dirSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Palette colors (0 = no palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(currentOffset, 12); // Image offset

    dirEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  const allBuffers = [header, ...dirEntries, ...images.map(img => img.buffer)];
  return Buffer.concat(allBuffers);
}

generateFavicons().catch((err) => {
  console.error('[generate-favicons] Generation error:', err);
  process.exit(1);
});
