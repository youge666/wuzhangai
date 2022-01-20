<template>
<div>
  <div id="container-visual" class="query"></div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'DisableVisual',
  data () {
    return {}
  },
  mounted () {
    AMapLoader.load({
      key: '930ce4106d2b67f6ad8068361445c117', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale,AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: '2.0.0' // Loca 版本，缺省 1.3.2
      }
    }).then((AMap) => {
      var map = new AMap.Map('container-visual', {
        zoom: 13,
        showLabel: false,
        viewMode: '3D',
        center: [114.482693932, 36.6093079285],
        mapStyle: 'amap://styles/0eda498fc40c45b538f233d4a1016c6d'
      })
      console.log(map)
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped lang="scss">
.query{
  width: 100%;
  height: 877px;
}
</style>
