<template>
<div>
  <div id="container-visual" class="query"></div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import data from '../../assets/js/handan_bus.json'
export default {
  name: 'RouteDetection',
  data () {
    return {}
  },
  mounted () {
    console.log(data)
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
        zoom: 11.2,
        center: [114.482693932, 36.6093079285],
        // showLabel: false,
        viewMode: '3D',
        mapStyle: 'amap://styles/45c282c8648c5fe887892a89f4fac866',
        pitch: 50
      })
      // eslint-disable-next-line no-undef
      var loca = new Loca.Container({
        map
      })
      window._loca = loca

      // eslint-disable-next-line no-undef
      // const geo = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { type: 1 }, geometry: { type: 'LineString', coordinates: [[116.3648, 39.9993], [116.3651, 39.9937], [116.3691, 39.9938], [116.3699, 39.9766], [116.3699, 39.9681], [116.3635, 39.9679], [116.3558, 39.9679], [116.3531, 39.9679], [116.3531, 39.9679], [116.3527, 39.9679], [116.3531, 39.9687], [116.3535, 39.9684], [116.3535, 39.9672], [116.3531, 39.9653], [116.3536, 39.9581], [116.3461, 39.9582], [116.3351, 39.9576], [116.3359, 39.9522], [116.3375, 39.9497], [116.3417, 39.9472], [116.3445, 39.9459], [116.3507, 39.944], [116.3515, 39.943], [116.352, 39.9404], [116.348, 39.9397], [116.3454, 39.9389], [116.3456, 39.9373], [116.3426, 39.9375], [116.3404, 39.9373], [116.34, 39.9374], [116.3399, 39.9378]] } }] }
      // eslint-disable-next-line no-undef
      var geo = new Loca.GeoJSONSource({
        // data: { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { type: 1 }, geometry: { type: 'LineString', coordinates: [[116.3648, 39.9993], [116.3651, 39.9937], [116.3691, 39.9938], [116.3699, 39.9766], [116.3699, 39.9681], [116.3635, 39.9679], [116.3558, 39.9679], [116.3531, 39.9679], [116.3531, 39.9679], [116.3527, 39.9679], [116.3531, 39.9687], [116.3535, 39.9684], [116.3535, 39.9672], [116.3531, 39.9653], [116.3536, 39.9581], [116.3461, 39.9582], [116.3351, 39.9576], [116.3359, 39.9522], [116.3375, 39.9497], [116.3417, 39.9472], [116.3445, 39.9459], [116.3507, 39.944], [116.3515, 39.943], [116.352, 39.9404], [116.348, 39.9397], [116.3454, 39.9389], [116.3456, 39.9373], [116.3426, 39.9375], [116.3404, 39.9373], [116.34, 39.9374], [116.3399, 39.9378]] } }, { type: 'Feature', properties: { type: 2 }, geometry: { type: 'LineString', coordinates: [[116.3647, 39.8593], [116.364, 39.8782], [116.3592, 39.878], [116.3587, 39.8895], [116.3504, 39.8899], [116.3501, 39.8968], [116.3482, 39.8968], [116.3486, 39.8975], [116.3484, 39.9002], [116.3498, 39.9011], [116.3527, 39.9013], [116.3526, 39.9112], [116.3536, 39.9163], [116.3534, 39.9185], [116.3567, 39.9185], [116.3561, 39.9323], [116.3441, 39.9325], [116.3443, 39.9349], [116.344, 39.9375], [116.3405, 39.9373], [116.3405, 39.9376]] } }] }
        data: data
        // url: '../../assets/js/handan_bus.json'
      })
      console.log(geo)

      // eslint-disable-next-line no-undef
      var layer = new Loca.PulseLineLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22]
      })

      var headColors = ['#EFBB51', '#7F3CFF', '#4CC19B', '#0B5D74', '#E06AC4', '#223F9B', '#F15C1A', '#7A0FA6']

      console.log('geo', geo)
      layer.setSource(geo)
      layer.setStyle({
        altitude: 0,
        lineWidth: 4,
        // 脉冲头颜色
        headColor: (_, feature) => {
          return headColors[feature.properties.type - 1]
        },
        // 脉冲尾颜色
        trailColor: 'rgba(128, 128, 128, 0.5)',
        // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
        interval: 0.25,
        // 脉冲线的速度，几秒钟跑完整段路
        duration: 3000
      })
      loca.add(layer)
      loca.animate.start()

      // 图例
      // eslint-disable-next-line no-undef,no-unused-vars
      var lengend = new Loca.Legend({
        loca: loca,
        title: {
          label: '公交类型',
          fontColor: 'rgba(255,255,255,0.4)',
          fontSize: '16px'
        },
        style: {
          backgroundColor: 'rgba(255,255,255,0.1)',
          left: '20px',
          bottom: '40px',
          fontSize: '12px'
        },
        dataMap: [
          { label: 'A类型', color: headColors[7] },
          { label: 'B类型', color: headColors[6] },
          { label: 'C类型', color: headColors[5] },
          { label: 'D类型', color: headColors[4] },
          { label: 'E类型', color: headColors[3] },
          { label: 'F类型', color: headColors[2] },
          { label: 'G类型', color: headColors[1] },
          { label: 'H类型', color: headColors[0] }
        ]
      })

      loca.animate.start()
      // eslint-disable-next-line no-undef
      // var dat = new Loca.Dat()
      // dat.addLayer(layer, '公交')
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
