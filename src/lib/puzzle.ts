// Geometría de piezas de rompecabezas (la pieza del isotipo de Fluidamente).
// Cada borde puede ser recto (0), con perilla hacia afuera (1) o con
// encastre hacia adentro (-1).

export type EdgeSign = -1 | 0 | 1;
export type Edges = {
  top: EdgeSign;
  right: EdgeSign;
  bottom: EdgeSign;
  left: EdgeSign;
};

type Pt = [number, number];

// Perfil del borde en coordenadas locales: t a lo largo del borde (0..1),
// h hacia afuera de la pieza (en unidades del largo del borde).
const PROFILE: Pt[][] = [
  // cada tramo es un cubic bezier [c1, c2, end]
  [
    [0.44, 0],
    [0.43, 0.07],
    [0.39, 0.13],
  ],
  [
    [0.33, 0.23],
    [0.4, 0.31],
    [0.5, 0.31],
  ],
  [
    [0.6, 0.31],
    [0.67, 0.23],
    [0.61, 0.13],
  ],
  [
    [0.57, 0.07],
    [0.56, 0],
    [0.62, 0],
  ],
];

const f = (n: number) => Math.round(n * 100) / 100;

function edge(a: Pt, b: Pt, sign: EdgeSign, scale: number): string {
  if (sign === 0) return ` L${f(b[0])} ${f(b[1])}`;
  const ux = b[0] - a[0];
  const uy = b[1] - a[1];
  const len = Math.hypot(ux, uy);
  // normal hacia afuera para un recorrido horario con y hacia abajo
  const nx = (uy / len) * scale * sign;
  const ny = (-ux / len) * scale * sign;
  const at = (t: number, h: number): Pt => [
    a[0] + ux * t + nx * h,
    a[1] + uy * t + ny * h,
  ];
  const p0 = at(0.38, 0);
  let d = ` L${f(p0[0])} ${f(p0[1])}`;
  for (const [c1, c2, e] of PROFILE) {
    const [x1, y1] = at(c1[0], c1[1]);
    const [x2, y2] = at(c2[0], c2[1]);
    const [x3, y3] = at(e[0], e[1]);
    d += ` C${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)} ${f(x3)} ${f(y3)}`;
  }
  return d + ` L${f(b[0])} ${f(b[1])}`;
}

/** Contorno de una pieza cuyo cuerpo ocupa (x, y, w, h). */
export function piecePath(
  x: number,
  y: number,
  w: number,
  h: number,
  e: Edges
): string {
  const s = Math.min(w, h);
  const tl: Pt = [x, y];
  const tr: Pt = [x + w, y];
  const br: Pt = [x + w, y + h];
  const bl: Pt = [x, y + h];
  return (
    `M${f(x)} ${f(y)}` +
    edge(tl, tr, e.top, s) +
    edge(tr, br, e.right, s) +
    edge(br, bl, e.bottom, s) +
    edge(bl, tl, e.left, s) +
    " Z"
  );
}

/** Pseudoaleatorio determinista (igual en servidor y cliente). */
export function rand(seed: number): number {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/** Grilla de piezas con encastres alternados y bordes exteriores rectos. */
export function puzzleGrid(cols: number, rows: number, cell: number) {
  const hSign = (r: number, c: number): EdgeSign =>
    rand(r * 31 + c * 7 + 1) > 0.5 ? 1 : -1; // borde entre fila r-1 y r
  const vSign = (r: number, c: number): EdgeSign =>
    rand(r * 13 + c * 29 + 5) > 0.5 ? 1 : -1; // borde entre col c-1 y c

  const pieces = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const edges: Edges = {
        top: r === 0 ? 0 : (-hSign(r, c) as EdgeSign),
        bottom: r === rows - 1 ? 0 : hSign(r + 1, c),
        left: c === 0 ? 0 : (-vSign(r, c) as EdgeSign),
        right: c === cols - 1 ? 0 : vSign(r, c + 1),
      };
      pieces.push({
        id: r * cols + c,
        r,
        c,
        d: piecePath(c * cell, r * cell, cell, cell, edges),
      });
    }
  }
  return pieces;
}
