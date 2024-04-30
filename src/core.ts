import { calcDistance, isPathMoved } from './util.js'

/**
 * 检测状态
 */
export enum CheckStatus {
  /**
   * 未准备好(未调用 init 函数)
   * 1. 调用 new AntiFakeGPS() 后
   */
  NOT_READY = 'NOT_READY',
  /**
   * 正在定位
   * 1. 调用 init 方法后
   */
  POSITIONING = 'POSITIONING',
  /**
   * 正在检测
   * 1. 状态在 POSITIONING、POSITION_FAILED、LONG_TIME_NOT_UPDATE，首次获取到定位后
   * 2. 状态在 OK，海拔变动超过 altitudeChangeThreshold 规定的范围后
   * 3. 状态在 OK，距离变动超过 distanceChangeThreshold 规定的范围后
   */
  CHECKING = 'CHECKING',
  /**
   * 定位失败
   * 1. 超过 startupTime 规定的时间未获取到位置
   * 2. 获取定位出现错误时
   */
  POSITION_FAILED = 'POSITION_FAILED',
  /**
   * 长时间未更新
   * 1. 状态在 OK 或 CHECKING，超过 positionUpdateInterval 规定的时间未更新位置时
   */
  LONG_TIME_NOT_UPDATE = 'LONG_TIME_NOT_UPDATE',
  /**
   * 没有问题
   * 1. 状态在 CHECKING，通过所有检测，且稳定次数超过 positionStableTimes 后
   */
  OK = 'OK',
}

/**
 * 检测结果
 */
export type CheckResult = {
  /**
   * 检测状态
   */
  status: CheckStatus,
  /**
   * 经度
   */
  longitude: number | null,
  /**
   * 纬度
   */
  latitude: number | null,
  /**
   * 海拔高度（若设备不支持海拔定位，则此值固定为 null）
   */
  altitude: number | null,
  /**
   * 定位时间
   */
  time: number | null,
  /**
   * 持续稳定时间(ms)
   */
  stableTime: number,
  /**
   * 持续稳定次数（GPS 点位数）
   */
  stableCount: number,
  /**
   * 前一段时间的轨迹: [时间(ms), 经度, 纬度]
   */
  path: Array<[number, number, number]>,
  /**
   * 检测是否出现过移动
   * @param threshold 检测阈值（米，默认使用 20 米）
   * @param time 最多检测多久的轨迹（毫秒，默认使用所有轨迹）
   * @returns 移动了返回 true，未移动返回 false
   */
  pathMoved: (threshold?: number, time?: number) => boolean
  /**
   * 判断状态是否为 CheckStatus.OK
   * @returns 状态是否为 CheckStatus.OK
   */
  isOk: () => boolean,
}

/**
 * 模拟定位检测工具
 * 检测方案（文档）: TODO
 * 用法示例（文档）: TODO
 * 事件（实现）: TODO
 */
export class AntiFakeGPS extends EventTarget {
  /**
   * 初始化后，最多用多长时间用于获取定位，超过视为定位失败(ms)
   */
  private readonly startupTime: number
  /**
   * 正常定位时，间隔不应该超过多久(ms)
   */
  private readonly positionUpdateInterval: number
  /**
   * 持续几次位置更新在正常范围内，才开始视为位置稳定
   */
  private readonly positionStableTimes: number
  /**
   * 位置更新后，每秒平均海拔变动超过多少米时，重新进行检测(若设备不支持海拔定位，则忽略此配置)
   */
  private readonly altitudeChangeThreshold: number
  /**
   * 位置更新后，每秒平均距离变动超过多少米时，重新进行检测
   */
  private readonly distanceChangeThreshold: number
  /**
   * 在内存中保留最近多久的路径(仅在每次有新位置数据到来时才进行清理)
   */
  private readonly pathSaveTime: number
  /**
   * 通过定时器进行的检测，每隔多久进行一次
   */
  private readonly checkInterval: number
  /**
   * 移动检测的阈值(米)，为 null 即不启用此特性
   */
  private readonly moveThreshold: number | null

  /**
   * 调用 init 函数的时间
   */
  private initTime = -1
  /**
   * 检测结论
   */
  private status = CheckStatus.NOT_READY

  /**
   * 上次调用 timer 的时间
   */
  private lastTimerTime: number | null = null
  /**
   * 最新一次定位成功的时间
   */
  private lastPositionTime: number | null = null
  /**
   * 最新一次定位的经度
   */
  private lastLongitude: number | null = null
  /**
   * 最新一次定位成功的纬度
   */
  private lastLatitude: number | null = null
  /**
   * 最新一次定位成功的海拔
   */
  private lastAltitude: number | null = null
  /**
   * 前一段时间的轨迹(时间(ms), 经度, 纬度)
   */
  private path: Array<[number, number, number]> = []

  /**
   * 位置稳定的开始时间
   */
  private stableStartTime: number | null = null
  /**
   * 位置稳定的次数（点位数）
   */
  private stableTimes = 0

  /**
   * 构造一个模拟定位检测器
   * @param startupTime 初始化后，最多用多长时间用于获取定位，超过视为定位失败(ms)
   * @param positionUpdateInterval 正常定位时，间隔不应该超过多久(ms)
   * @param positionStableTimes 持续几次位置更新在正常范围内，才开始视为位置稳定(建议不小于 2)
   * @param altitudeChangeThreshold 位置更新后，每秒平均海拔变动超过多少米时，重新进行检测(若设备不支持海拔定位，则忽略此配置)
   * @param distanceChangeThreshold 位置更新后，每秒平均距离变动超过多少米时，重新进行检测
   * @param checkInterval 通过定时器进行的检测，每隔多久进行一次(ms)
   * @param pathSaveTime 在内存中保留最近多久的路径以用于检测(仅在每次有新位置数据到来时才进行清理)
   * @param moveThreshold 移动检测的阈值(米，不传即不启用此特性，但仍可通过 check().pathMoved() 进行检测)
   */
  constructor({ startupTime=20000, positionUpdateInterval=20000, positionStableTimes=2, altitudeChangeThreshold=20, distanceChangeThreshold=200, checkInterval=500, pathSaveTime=30000, moveThreshold=-1 }={}) {
    super()

    this.startupTime = startupTime
    this.positionUpdateInterval = positionUpdateInterval
    this.positionStableTimes = positionStableTimes
    this.altitudeChangeThreshold = altitudeChangeThreshold
    this.distanceChangeThreshold = distanceChangeThreshold
    this.pathSaveTime = pathSaveTime
    this.checkInterval = checkInterval
    this.moveThreshold = moveThreshold <= 0 ? null : moveThreshold
  }

  /**
   * 进行初始化(仅限调用一次)
   */
  init(): void {
    if (this.initTime > 0) throw new Error('已经初始化过了')
    this.changeStatus(CheckStatus.POSITIONING)
    this.initTime = Date.now()

    // 注册定位器
    navigator.geolocation.watchPosition(result => this.onPositionSuccess(result), err => this.onPositionError(err), { enableHighAccuracy: true, timeout: 10_000 })

    // 先立刻获取一次定位
    navigator.geolocation.getCurrentPosition(result => this.onPositionSuccess(result), err => this.onPositionError(err), { enableHighAccuracy: true, timeout: 10_000 })

    // 注册周期性检测代码
    setInterval(() => this.onTimer(), this.checkInterval)
  }

  /**
   * 定位成功回调
   */
  private onPositionSuccess(result: GeolocationPosition): void {
    // 投递事件
    this.dispatchEvent(new CustomEvent('position', { detail: { result }}))

    // 位置没变，后续就不用处理了
    const { coords } = result
    if (coords.longitude == this.lastLongitude && coords.latitude == this.lastLatitude) {
      return
    }

    // 投递事件
    this.dispatchEvent(new CustomEvent('positionChange', { detail: { result }}))

    // 如果状态在 POSITIONING、POSITION_FAILED、LONG_TIME_NOT_UPDATE，更新为检测中
    if (this.status == CheckStatus.POSITIONING || this.status == CheckStatus.POSITION_FAILED || this.status == CheckStatus.LONG_TIME_NOT_UPDATE) {
      this.changeStatus(CheckStatus.CHECKING)
    }

    // 本次更新距离上次更新的时间，若为 init 后首次获取到位置，此值为 null
    const time = this.lastPositionTime ? result.timestamp - this.lastPositionTime : null

    // 如果海拔变动超过 altitudeChangeThreshold 约定的范围，状态更新为检测中
    if (coords.altitude && this.lastAltitude && time) {
      const diff = Math.abs(this.lastAltitude - coords.altitude)
      const diffPreSecond = diff / time * 1000

      if (diffPreSecond > this.altitudeChangeThreshold) {
        this.changeStatus(CheckStatus.CHECKING)
      }
    }

    // 如果距离变动超过 distanceChangeThreshold 约定的范围，状态更新为检测中
    if (this.lastPositionTime && time) {
      const distance = calcDistance([this.lastLongitude!, this.lastLatitude!], [coords.longitude, coords.latitude])
      const distancePreSecond = distance / time * 1000

      if (distancePreSecond > this.distanceChangeThreshold) {
        this.changeStatus(CheckStatus.CHECKING)
      }
    }

    // 如果距离上次位置更新，时间间隔在合理范围内（即首次定位到某个位置，会被忽略）
    if (time && time < this.positionUpdateInterval) {
      // 如果是第一次稳定，修改稳定开始时间
      if (this.stableTimes == 1) {
        this.stableStartTime = result.timestamp
      }

      // 增加间隔正常的次数
      this.stableTimes += 1
      // 如果间隔在正常范围内的次数，达到 positionStableTimes 约定的次数，将状态由检测中变更为正常
      if (this.status == CheckStatus.CHECKING && this.stableTimes >= this.positionStableTimes) {
        this.changeStatus(CheckStatus.OK)
      }
    }

    // 保存定位成功的时间
    this.lastPositionTime = result.timestamp

    // 保存定位结果
    this.lastLongitude = coords.longitude
    this.lastLatitude = coords.latitude
    this.lastAltitude = coords.altitude

    // 保存路径
    this.path.push([result.timestamp, coords.longitude, coords.latitude])

    // 清理过时的路径
    const pathStartTime = result.timestamp - this.pathSaveTime
    this.path = this.path.filter(p => p[0] >= pathStartTime)

    // 如果启用了移动检测，并检测到最近移动了，状态更新为检测中
    if (this.moveThreshold) {
      if (isPathMoved(this.path, this.moveThreshold)) {
        this.changeStatus(CheckStatus.CHECKING)
      }
    }

    // 投递事件
    this.dispatchEvent(new CustomEvent('positionChangeEnd', { detail: { result }}))
  }

  /**
   * 定位失败回调
   */
  private onPositionError(err: GeolocationPositionError): void {
    // 投递事件
    this.dispatchEvent(new CustomEvent('positionError', { detail: { err }}))

    // 在启动后等待定位阶段，且未超过规定时限时，豁免本次定位失败
    if (this.status == CheckStatus.POSITIONING && Date.now() - this.initTime <= this.startupTime) {
      return
    }

    // 标记状态为定位失败
    this.changeStatus(CheckStatus.POSITION_FAILED)
  }

  /**
   * 周期性检测回调
   */
  private onTimer(): void {
    // 在启动后的检测阶段，超过规定时限时，标记定位失败
    if (this.status == CheckStatus.POSITIONING && Date.now() - this.initTime > this.startupTime) {
      this.changeStatus(CheckStatus.POSITION_FAILED)
      return
    }

    // 如果距离上次调用超过 3 个 timer 周期，则将状态变更为检测中
    const now = Date.now()
    if (this.lastTimerTime && now - this.lastTimerTime > this.checkInterval * 3) {
      this.changeStatus(CheckStatus.CHECKING)
    }
    this.lastTimerTime = now

    // 如果状态正常或正在检测，且超过规定时间未更新位置，标记状态为有问题
    if ((this.status == CheckStatus.OK || this.status == CheckStatus.CHECKING) && Date.now() - this.lastPositionTime! > this.positionUpdateInterval) {
      this.changeStatus(CheckStatus.LONG_TIME_NOT_UPDATE)
      return
    }
  }

  /**
   * 变更状态
   * @param newStatus 新状态
   */
  private changeStatus(newStatus: CheckStatus): void {
    // 根据新状态，做一些公共处理
    switch (newStatus) {
      case CheckStatus.CHECKING:
      case CheckStatus.POSITION_FAILED:
      case CheckStatus.LONG_TIME_NOT_UPDATE:
        this.stableStartTime = null
        this.stableTimes = 0
        break
    }

    // 投递事件
    this.dispatchEvent(new CustomEvent('changeStatus', { detail: { oldStatus: this.status, newStatus }}))

    // 修改状态
    this.status = newStatus
  }

  /**
   * 获取检测结果
   * @returns 检测结果
   */
  check(): CheckResult {
    const time = this.lastPositionTime
    const path = this.path.filter(() => true) // deepClone
    const isOk = this.status == CheckStatus.OK

    return {
      status: this.status,
      longitude: this.lastLongitude,
      latitude: this.lastLatitude,
      altitude: this.lastAltitude,
      time,
      stableTime: (this.lastPositionTime && this.stableStartTime) ? this.lastPositionTime - this.stableStartTime : 0,
      stableCount: this.stableTimes,
      path,
      pathMoved: (threshold: number=20, usedTime: number | undefined=undefined) => isPathMoved(path, threshold, usedTime),
      isOk: () => isOk,
    }
  }

  /**
   * 判断模拟定位检测是否通过
   * @returns 检测是否通过
   */
  isOk(): boolean {
    return this.status == CheckStatus.OK
  }

  /**
   * 如果当前状态为 OK，强制修改为 CHECKED
   */
  forgeCheckIfOk(): void {
    if (this.isOk()) {
      this.changeStatus(CheckStatus.CHECKING)
    }
  }
}
