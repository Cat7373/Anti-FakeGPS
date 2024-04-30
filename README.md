# Anti-FakeGPS

模拟定位检测工具（只适用于移动端，因为电脑一般没有 GPS 硬件）

[![NPM version][npm-image]][npm-url]
[![Install size][install-size-image]][install-size-url]
[![NPM bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![NPM downloads][npm-download-image]][npm-download-url]

## 在线 Demo

[手机扫下方二维码进行体验](https://cat7373.github.io/Anti-FakeGPS)
[![](https://github.com/Cat7373/taiji-encode/assets/9296576/635a562f-3406-4d50-8eb5-9aeb728da97c)](https://cat7373.github.io/Anti-FakeGPS)

## 安装

```sh
npm install anti-fakegps
```

## 使用

```ts
import { useAntiFakeGPS } from 'anti-fakegps'

/**
 * 当点击提交按钮时
 */
async function submit() {
  // 获取检测结果
  const checkResult = useAntiFakeGPS().check()

  // 根据检测结果，决定下一步操作
  switch (checkResult.status) {
    // 正在定位和正在检测时，提示用户正在定位，请稍等
    case CheckResult.POSITIONING: // 正在定位
    case CheckResult.CHECKING: // 正在检测
      showToast({ type: 'warning', message: '正在定位，请稍等...' })
      return
    // 定位失败时，提示用户打开手机定位开关，并允许网页定位
    case CheckResult.POSITION_FAILED: // 定位失败
      showToast({ type: 'warning', message: '请打开手机定位开关，并允许网页定位，再使用此功能' })
      return
    // 定位间隔超出正常范围时，视为正在使用模拟定位
    case CheckResult.LONG_TIME_NOT_UPDATE:
      // 在服务器记录违规行为
      // await saveCheatRecord({ uid: 'xxx' })

      showConfirmDialog({ title: '警告', message: '请勿使用模拟定位等作弊软件，本次行为已被记录，如果你确实在项目现场，可继续操作，公司会二次排查，确认要继续么？' })
      return
  }

  // 对于巡查定点拍照的场景，可以要求其停留在原地才能使用拍照功能，以应对 AnyGo 类软件
  // 判断手机正在移动，而不是停留在原地
  if (checkResult.pathMoved()) {
    showNotify({ type: 'warning', message: '请在原地稍等一会再拍照...' })
    return
  }

  // TODO 进行具体业务操作...
  // 可使用 checkResult.longitude 和 checkResult.latitude 获取经纬度

  showNotify({ type: 'success', message: '操作成功' })
}
```

## 检测原理

请参阅[博客文章](https://blog.cat73.org/posts/2024/09-anti-fakegps)了解更多

## TODO

1. 拆分源代码到多个文件中，进一步完善各类文档说明等
2. 测试 + 单元测试(Jest?)
3. 更 typescript 一点

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/anti-fakegps.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/anti-fakegps
[install-size-image]: https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=anti-fakegps&query=$.install.pretty&label=install%20size&style=flat-square
[install-size-url]: https://packagephobia.now.sh/result?p=anti-fakegps
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/anti-fakegps?style=flat-square
[npm-bundle-size-url]: https://bundlephobia.com/package/anti-fakegps@latest
[npm-download-image]: https://img.shields.io/npm/dm/anti-fakegps.svg?style=flat-square
[npm-download-url]: https://npm-stat.com/charts.html?package=anti-fakegps
