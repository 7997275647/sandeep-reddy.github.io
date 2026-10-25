import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await Promise.all([
  sharp(fileURLToPath(new URL("../Images/profile_picture.jpg", import.meta.url)))
    .resize(320, 360, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(fileURLToPath(new URL("../public/portrait.webp", import.meta.url))),
  sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#101210"/>
    <g stroke="#283323" stroke-width="1" fill="none">
      <path d="M800 0v155l150 100v375M1000 0v125l-150 100v405M700 0v210l350 200v220M1100 0v270L750 470v160"/>
      <rect x="780" y="195" width="270" height="240" rx="20"/>
    </g>
    <rect x="830" y="245" width="170" height="140" rx="14" fill="#202a19" stroke="#c3f58a"/>
    <text x="915" y="327" font-family="sans-serif" font-size="36" text-anchor="middle" fill="#c3f58a">STM32</text>
    <circle cx="76" cy="72" r="5" fill="#c3f58a"/>
    <text x="96" y="79" font-family="sans-serif" font-size="19" fill="#c3f58a" letter-spacing="3">EMBEDDED SOFTWARE ENGINEER</text>
    <text x="70" y="225" font-family="sans-serif" font-weight="bold" font-size="78" fill="#f1f3eb">Software that</text>
    <text x="70" y="320" font-family="sans-serif" font-weight="bold" font-size="78" fill="#f1f3eb">moves the</text>
    <text x="70" y="415" font-family="serif" font-style="italic" font-size="94" fill="#c3f58a">real world.</text>
    <path d="M70 492h1060" stroke="#343c30"/>
    <text x="70" y="548" font-family="sans-serif" font-size="25" fill="#f1f3eb">Sandeep Reddy Modugu</text>
    <text x="1130" y="548" text-anchor="end" font-family="sans-serif" font-size="18" fill="#a5aea0">C / STM32 / FreeRTOS / DSP</text>
  </svg>`)).png().toFile(fileURLToPath(new URL("../public/og-image.png", import.meta.url))),
]);
console.log("Generated optimized portrait and original Open Graph artwork.");
