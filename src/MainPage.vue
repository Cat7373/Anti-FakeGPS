<template lang="pug">
.p-4.min-h-full.bg-slate-50.space-y-4
  .text-center.text-2xl Anti-FakeGPS

  //- 数据区
  van-cell-group(inset)
    van-cell(title="状态", :value="data.status", :label="statusName[data.status]", title-style="flex: 0 1 auto;")
    //- TODO 地图查看位置
    van-cell(title="经度", :value="data.longitude")
    van-cell(title="纬度", :value="data.latitude")
    van-cell(title="海拔", :value="data.altitude")
    van-cell(title="定位时间", :value="dayjs(data.time).format('HH:mm:ss.SSS')")
    van-cell(title="已稳定", :value="data.stableTime / 1000")
      template(#right-icon)
        span.ml-1 秒
    van-cell(title="已稳定", :value="data.stableCount")
      template(#right-icon)
        span.ml-1 次
    //- TODO 地图查看轨迹
    van-cell(title="轨迹点", :value="data.pathLength")
      template(#right-icon)
        span.ml-1 个
    van-cell(title="轨迹移动", :value="String(data.pathMoved)")

  //- 说明区
  fieldset.border.rounded-md.px-4.py-2
    legend 说明
    .text-sm.leading-6
      p 1. 只依赖网页能访问到的数据，判定是否存在模拟定位
      p 2. 可防御市面上绝大部分模拟定位软件
      p 3. 仅支持有物理 GPS 硬件的设备（通常是移动端）
      p
        span 4. 更多细节，请参阅
        a.text-sky-500(href="https://blog.cat73.org#TODO", target="_blank") 博客文章
        span 了解更多
      p
        span 5.&nbsp;
        a.text-sky-500(href="https://github.com/Cat7373/Anti-FakeGPS", target="_blank") Github Repo
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useAntiFakeGPS } from 'anti-fakegps'

const statusName = {
  NOT_READY: '等待初始化',
  POSITIONING: '正在定位',
  CHECKING: '正在检测',
  POSITION_FAILED: '定位失败',
  LONG_TIME_NOT_UPDATE: '检测到模拟定位',
  OK: '通过检测'
}
const data = ref({})

const updatePos = async () => {
  const checkResult = useAntiFakeGPS().check()
  checkResult.pathMoved = checkResult.pathMoved()
  checkResult.pathLength = checkResult.path.length
  data.value = checkResult
}

setInterval(updatePos, 200)
</script>
