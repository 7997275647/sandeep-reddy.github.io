export function CircuitBoard() {
  return (
    <div className="circuit-illustration" aria-hidden="true">
      <svg className="circuit-svg" viewBox="0 0 620 490" fill="none">
        <defs>
          <linearGradient id="board-face" x1="182" y1="155" x2="460" y2="405" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2e3b25" /><stop offset=".55" stopColor="#1c2917" /><stop offset="1" stopColor="#27371f" />
          </linearGradient>
          <linearGradient id="chip-face" x1="218" y1="181" x2="376" y2="290" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b4930" /><stop offset=".5" stopColor="#26351e" /><stop offset="1" stopColor="#1d2b16" />
          </linearGradient>
          <linearGradient id="trace-color" x1="94" y1="209" x2="490" y2="338" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b1dc7b" stopOpacity=".2" /><stop offset=".5" stopColor="#c3f58a" /><stop offset="1" stopColor="#6c9148" stopOpacity=".2" />
          </linearGradient>
          <radialGradient id="board-glow"><stop stopColor="#8eae4b" stopOpacity=".14" /><stop offset="1" stopColor="#8eae4b" stopOpacity="0" /></radialGradient>
          <filter id="chip-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <pattern id="board-grid" width="38" height="22" patternUnits="userSpaceOnUse" patternTransform="translate(6 3)">
            <path d="M0 11L19 0 38 11 19 22Z" stroke="#7a9161" strokeOpacity=".08" strokeWidth=".6" />
          </pattern>
        </defs>
        <ellipse cx="326" cy="300" rx="286" ry="180" fill="url(#board-glow)" />
        <path d="M5 244L311 65 613 241 307 422Z" fill="url(#board-grid)" opacity=".55" />
        <path d="M24 277L288 121 578 288 314 443Z" fill="#050904" opacity=".6" />
        <path d="M42 258L282 118 566 281 326 421 42 258Z" fill="url(#board-face)" stroke="#5e7646" strokeWidth="1" />
        <path d="M42 258V273L326 437V421L42 258Z" fill="#141d10" stroke="#465b33" strokeWidth=".8" />
        <path d="M326 421L566 281V296L326 437V421Z" fill="#24321c" stroke="#51683b" strokeWidth=".8" />
        <path d="M66 258L283 131 542 281 326 407 66 258Z" stroke="#829b5a" strokeOpacity=".25" />
        <g stroke="#60794a" strokeWidth="1" opacity=".56">
          <path d="M255 233L184 192 169 201 125 175M265 227L195 186 195 166 244 138M275 221L219 187 219 153 261 129" />
          <path d="M242 244L193 216 148 242 116 223 64 253M248 252L196 222 157 245 157 270 126 287" />
          <path d="M265 285L217 314 162 282 134 298M278 292L230 321 230 353 266 374M292 301L252 325 252 343 308 375 308 410" />
          <path d="M354 297L402 325 438 304 496 337M365 290L414 318 432 308 476 333M376 283L430 315 458 298 512 329" />
          <path d="M400 258L457 291 491 271 535 296M405 246L457 275 475 264 512 285 544 267M399 234L435 213 493 246 513 235" />
          <path d="M365 211L399 191 465 229M350 201L382 183 382 176 426 201M335 194L351 185 351 170 330 158" />
          <path d="M145 276L122 262 98 276M180 310L207 325 195 332M395 374L372 360 345 376M472 264L486 256 478 251" />
        </g>
        <g stroke="url(#trace-color)" strokeWidth="1.7">
          <path d="M239 237L201 215 151 244 122 227 81 251" />
          <path d="M289 208L251 186 251 163 289 142" />
          <path d="M281 282L211 322 211 337 262 367" />
          <path d="M373 267L430 300 452 287 498 313" />
          <path d="M385 235L421 214 479 248" />
          <path d="M318 302L318 344 365 371 365 389" />
        </g>
        <g stroke="#d1ff9a" strokeWidth="2">
          <path className="trace-pulse" d="M81 251L122 227 151 244 201 215 239 237" />
          <path className="trace-pulse" d="M262 367L211 337 211 322 281 282" />
          <path className="trace-pulse" d="M373 267L430 300 452 287 498 313" />
          <path className="trace-pulse" d="M289 142L251 163 251 186 289 208" />
        </g>
        <g fill="#a4c474">
          {[[81, 251], [122, 227], [151, 244], [289, 142], [262, 367], [365, 389], [498, 313], [479, 248]].map(([cx, cy]) =>
            <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="2.6" ry="1.6" />)}
        </g>
        <g fill="#14200f" stroke="#66834b" strokeWidth=".8">
          <path d="M104 251L128 237 153 251 129 265Z" /><path d="M104 251V259L129 273V265Z" /><path d="M129 265L153 251V259L129 273Z" />
          <path d="M423 276L447 262 473 277 449 291Z" /><path d="M423 276V284L449 299V291Z" /><path d="M449 291L473 277V285L449 299Z" />
          <path d="M263 353L287 339 313 354 289 368Z" /><path d="M263 353V361L289 376V368Z" /><path d="M289 368L313 354V362L289 376Z" />
        </g>
        <g stroke="#a7bc82" strokeWidth="3">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <path d={`M${218 + i * 9.4} ${226 - i * 5.5}l-14 -8`} />
              <path d={`M${228 + i * 9.4} ${265 + i * 5.5}l-13 8`} />
              <path d={`M${332 + i * 9.4} ${316 - i * 5.5}l13 8`} />
              <path d={`M${334 + i * 9.4} ${180 + i * 5.5}l13 -8`} />
            </g>
          ))}
        </g>
        <path d="M211 241L318 178 429 243 319 308Z" fill="#b7f077" opacity=".18" filter="url(#chip-glow)" />
        <path d="M216 222L317 163 420 223 319 282Z" fill="url(#chip-face)" stroke="#c1ef83" strokeWidth="1.5" />
        <path d="M216 222V249L319 310V282Z" fill="#1d2d14" stroke="#91bc5e" />
        <path d="M319 282L420 223V250L319 310Z" fill="#314324" stroke="#91bc5e" />
        <path d="M227 222L317 170 409 223 319 276Z" stroke="#aecf7d" strokeOpacity=".4" />
        <path d="M216 233L319 294 420 234" stroke="#c3f58a" strokeOpacity=".25" />
        <g transform="matrix(.866 .5 -.866 .5 318 216)">
          <text x="0" y="0" fill="#d6edb6" textAnchor="middle" fontFamily="monospace" fontSize="27" letterSpacing="1">STM32</text>
          <text x="0" y="20" fill="#aac48c" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2">ARM CORTEX-M</text>
          <path d="M-40 33H40" stroke="#accf7b" strokeOpacity=".4" />
        </g>
        <g fill="#92b36d">
          <ellipse cx="81" cy="260" rx="5" ry="3" /><ellipse cx="281" cy="142" rx="5" ry="3" />
          <ellipse cx="326" cy="397" rx="5" ry="3" /><ellipse cx="536" cy="282" rx="5" ry="3" />
        </g>
        <g fill="#10190c">
          <ellipse cx="81" cy="260" rx="2" ry="1.4" /><ellipse cx="281" cy="142" rx="2" ry="1.4" />
          <ellipse cx="326" cy="397" rx="2" ry="1.4" /><ellipse cx="536" cy="282" rx="2" ry="1.4" />
        </g>
        <path d="M406 183L451 157V117" stroke="#749552" strokeWidth=".8" />
        <circle cx="406" cy="183" r="2.5" fill="#bfe887" />
        <rect x="399" y="84" width="142" height="35" rx="5" fill="#1a2414" stroke="#567340" strokeWidth=".8" />
        <circle cx="412" cy="102" r="2.5" fill="#c3f58a" />
        <text x="424" y="105" fill="#c5dbac" fontFamily="monospace" fontSize="8" letterSpacing=".6">C / C++ / REAL-TIME</text>
        <path d="M190 302L146 327H96" stroke="#749552" strokeWidth=".8" />
        <circle cx="190" cy="302" r="2.5" fill="#bfe887" />
        <rect x="40" y="328" width="137" height="43" rx="5" fill="#1a2414" stroke="#567340" strokeWidth=".8" />
        <text x="52" y="345" fill="#8ea57a" fontFamily="monospace" fontSize="6" letterSpacing="1">ENGINEERING AT THE</text>
        <text x="52" y="359" fill="#d4e6bf" fontFamily="monospace" fontSize="9">hardware boundary.</text>
        <g stroke="#748863" strokeWidth=".6" opacity=".55">
          <path d="M35 168h10M40 163v10M559 170h10M564 165v10M115 405h10M120 400v10M535 385h10M540 380v10" />
          <path d="M5 286L280 447M347 447L594 304" strokeDasharray="2 6" />
        </g>
      </svg>
    </div>
  );
}
