import { AntiFakeGPS } from './core.js'

/**
 * 使用 useAntiFakeGPS 时的唯一实例
 */
let instance: AntiFakeGPS | undefined

/**
 * 使用模拟定位检测工具(首次调用自动初始化)
 * 如果希望定位数据和检测结果尽快可用，建议在网页加载过程中尽可能早的调用一次本方法
 * @params customInstance 如果需要使用自定义参数，可预先实例化好（但不要初始化），在首次调用时传入
 * @returns 模拟定位检测工具的实例
 */
export function useAntiFakeGPS(customInstance: AntiFakeGPS): Omit<AntiFakeGPS, 'init' | 'dispatchEvent'> {
  if (instance) return instance
  if (customInstance) {
    instance = customInstance
  } else {
    instance = new AntiFakeGPS()
  }
  instance.init()

  return instance
}

export { AntiFakeGPS }
