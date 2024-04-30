<template lang="pug">
.p-4.min-h-full.bg-slate-50.space-y-4
  .text-center.text-2xl Anti-FakeGPS

  van-cell-group(inset)
    van-tabs
      //- 数据区
      van-tab(title="数据")
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
        van-cell(title="正在移动", :value="String(data.pathMoved)")

      //- 模拟表单区
      van-tab(title="模拟表单")
        van-cell(title="状态", :value="data.status", :label="statusName[data.status]", title-style="flex: 0 1 auto;")
        van-cell(title="正在移动", :value="String(data.pathMoved)")

        van-field(label="允许移动提交")
          template(#input)
            van-switch(v-model="mockField2")
        van-field(label="工作记录", v-model="mockField1")

        van-button.w-full(type="primary", @click="submit") 提交

  

  //- 说明区
  fieldset.border.rounded-md.px-4.py-2
    legend 说明
    .text-sm.leading-6
      p 1. 只依赖网页能访问到的数据，判定是否存在模拟定位
      p 2. 适用巡逻打卡拍照等场景，可防市面上绝大部分模拟定位软件
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
// import { useAntiFakeGPS } from '@/anti'
import { useAntiFakeGPS } from 'anti-fakegps'
import { showConfirmDialog, showNotify } from 'vant'

const statusName = {
  NOT_READY: '等待初始化',
  POSITIONING: '正在定位',
  CHECKING: '正在检测',
  POSITION_FAILED: '定位失败',
  LONG_TIME_NOT_UPDATE: '检测到模拟定位',
  OK: '通过检测'
}
const data = ref({})
const mockField1 = ref('')
const mockField2 = ref(false)

const updatePos = async (source) => {
  const checkResult = useAntiFakeGPS().check()
  checkResult.pathMoved = checkResult.pathMoved()
  checkResult.pathLength = checkResult.path.length
  data.value = checkResult

  console.log(`${source}: ${checkResult.time}: ${checkResult.longitude}, ${checkResult.latitude}, ${checkResult.altitude} => ${checkResult.status}`)
}

async function submit() {
  const checkResult = useAntiFakeGPS().check()
  switch (checkResult.status) {
    case 'POSITIONING':
    case 'CHECKING':
      showNotify({ type: 'warning', message: '正在定位，请稍等...' })
      return
    case 'POSITION_FAILED':
      showNotify({ type: 'warning', message: '请打开手机定位开关，并允许网页定位，再使用此功能' })
      return
    case 'LONG_TIME_NOT_UPDATE':
      showConfirmDialog({ title: '警告', message: '请勿使用模拟定位等作弊软件，本次行为已被记录，如果你确实在项目现场，可继续操作，未来公司会二次排查确认，确认要继续么？' })
      return
  }

  if (!mockField2.value) {
    if (checkResult.pathMoved()) {
      showNotify({ type: 'warning', message: '请在原地稍等一会再拍照...' })
      return
    }
  }

  // TODO 进行具体业务操作...
  // 可使用 checkResult.longitude 和 checkResult.latitude 获取经纬度

  showNotify({ type: 'success', message: '提交成功' })
}

useAntiFakeGPS().addEventListener('statusChange', () => updatePos('statusChange'))
useAntiFakeGPS().addEventListener('positionChangeEnd', () => updatePos('positionChange'))
useAntiFakeGPS().addEventListener('positionError', () => updatePos('positionError'))
updatePos('init')
</script>
