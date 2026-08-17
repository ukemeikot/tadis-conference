/**
 * The continent outline, shared by everything on the page that needs the shape of
 * Africa: the hero's point-cloud globe and the gallery's clip path.
 *
 * A hand-simplified polygon rather than real GeoJSON — it is coarse, but it is
 * inline, needs no fetch, and at the sizes used here the difference is invisible.
 *
 * Coordinates are [longitude, latitude] in degrees.
 */
export const AFRICA: ReadonlyArray<readonly [number, number]> = [
  [-17, 14.7], [-16, 12], [-13, 8], [-9, 5], [-5, 4.5], [0, 5.5], [3, 6.4],
  [6, 4.3], [9, 4], [9.5, 2], [11, -2], [12, -5], [13, -8], [12, -13],
  [12, -17], [14, -22], [15, -27], [18, -32], [20, -34.8], [25, -34],
  [29, -31], [32, -28.5], [35, -24], [37, -17], [40, -15], [40, -10],
  [39, -6], [41, -2], [43, 0], [48, 2], [51, 11], [48, 12], [44, 12],
  [43, 11.5], [40, 15], [38, 18], [37, 22], [34, 28], [33, 31], [25, 32],
  [20, 31], [15, 31.5], [10, 34], [3, 36.5], [-2, 35.5], [-6, 35.5],
  [-9, 33], [-10, 30], [-13, 27.5], [-16, 22], [-17, 18],
]

export const MADAGASCAR: ReadonlyArray<readonly [number, number]> = [
  [43.2, -11.9], [49.5, -12.5], [50.5, -15.5], [47.5, -25.2],
  [45, -25.5], [43.2, -21], [43.5, -16],
]

/** Standard ray-casting point-in-polygon test. */
export function inside(
  x: number,
  y: number,
  poly: ReadonlyArray<readonly [number, number]>,
): boolean {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit
    }
  }
  return hit
}

/* -------------------------------- clip path -------------------------------- */

const ALL = [...AFRICA, ...MADAGASCAR]
const LONS = ALL.map(([lon]) => lon)
const LATS = ALL.map(([, lat]) => lat)
const MIN_LON = Math.min(...LONS)
const MAX_LON = Math.max(...LONS)
const MIN_LAT = Math.min(...LATS)
const MAX_LAT = Math.max(...LATS)

/**
 * Normalise a lon/lat ring into a `0..1` SVG subpath.
 *
 * Latitude is flipped because SVG's y axis grows downward. Both rings share one
 * set of bounds so Madagascar keeps its true position and scale relative to the
 * mainland instead of being stretched to its own box.
 */
function ring(poly: ReadonlyArray<readonly [number, number]>): string {
  const points = poly.map(([lon, lat]) => {
    const x = (lon - MIN_LON) / (MAX_LON - MIN_LON)
    const y = (MAX_LAT - lat) / (MAX_LAT - MIN_LAT)
    return `${x.toFixed(4)},${y.toFixed(4)}`
  })
  return `M${points.join('L')}Z`
}

/**
 * Africa plus Madagascar as one path in `objectBoundingBox` units, ready for a
 * `<clipPath clipPathUnits="objectBoundingBox">`. Because it is normalised to 0..1
 * it scales to whatever box it is applied to.
 */
export const AFRICA_CLIP_PATH = `${ring(AFRICA)} ${ring(MADAGASCAR)}`

/**
 * The outline's natural width-to-height ratio, so the box it is clipped into can
 * match and the continent is not stretched.
 */
export const AFRICA_ASPECT = (MAX_LON - MIN_LON) / (MAX_LAT - MIN_LAT)
