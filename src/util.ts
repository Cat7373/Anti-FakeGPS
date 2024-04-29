/**
 * 地球的半径
 */
const EARTH_RADIUS = 6378137.0

/**
 * 弧度算法
 */
function rad(d: number) {
  return d * Math.PI / 180.0
}

/**
 * 计算两点间的距离(米)
 */
export function calcDistance([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]) {
  const radLat1 = rad(lat1)
  const radLat2 = rad(lat2)
  const a = radLat1 - radLat2
  const radLon1 = rad(lon1)
  const radLon2 = rad(lon2)
  const b = radLon1 - radLon2
  const s = 2.0 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2.0), 2.0) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2.0), 2.0)))
  const m = s * EARTH_RADIUS
  return m
}
