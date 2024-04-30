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

/**
 * 检测一段轨迹是否出现过移动
 * @param path 被检测轨迹记录: [时间(ms), 经度, 纬度]
 * @param threshold 检测阈值（米，默认使用 30 米）
 * @param time 最多检测多久的轨迹（毫秒，默认使用所有轨迹）
 * @returns 移动了返回 true，未移动返回 false
 */
export function isPathMoved(path: Array<[number, number, number]>, threshold: number=30, usedTime: number | undefined=undefined) {
  // 如果不够 2 个，直接返回没有移动
  if (path.length <= 1) return false

  // 找出本次计算使用的路径清单
  let usedPath = path
  if (usedTime) {
    const pathStartTime = path[path.length - 1][0] - usedTime
    usedPath = path.filter(p => p[0] >= pathStartTime)
  }

  // 如果不够 2 个，直接返回没有移动
  if (usedPath.length <= 1) return false

  // 计算所有点的中心点
  let lon = 0, lat = 0
  for (const p of usedPath) {
    lon += p[1]
    lat += p[2]
  }
  lon /= usedPath.length
  lat /= usedPath.length

  // 计算所有点到中心点的距离
  let distance = 0
  for (const p of usedPath) {
    distance += calcDistance([p[1], p[2]], [lon, lat])
  }

  // 计算平均距离
  distance /= usedPath.length

  // 判断是否大于阈值
  return distance > threshold
}
