<template>
<div>
  <div id="viewer-container" class="container"></div>
</div>
</template>

<script>
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
window.CESIUM_BASE_URL = '/'
export default {
  name: 'Welcome',
  data () {
    return {}
  },
  mounted () {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZGVmYTkyNi04ODc0LTQyYWItYjIzNS0xNjU5MjgzZDQzZTIiLCJpZCI6NzE5MzIsImlhdCI6MTYzNTYwNDU4OX0.09QefgFSlhDGJl6dlhvoOP5DUlYXBFgCSWvYvUS3CoI'
    const viewer = new Cesium.Viewer('viewer-container', {
      infoBox: false,
      selectionIndicator: false,
      navigation: false,
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      fullscreenButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      shouldAnimate: true,
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
      })
    })
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.scene.globe.depthTestAgainstTerrain = false

    var position = Cesium.Cartesian3.fromDegrees(114.482693932, 36.6093079285, 10000)

    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(114.482693932, 36.6093079285, 10000), // 定位坐标点，建议使用谷歌地球坐标位置无偏差
      duration: 1 // 定位的时间间隔
    })

    setTimeout(function () {
      flyExtent()
    }, 1000)

    function flyExtent () {
      // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
      var pitch = Cesium.Math.toRadians(-90)
      // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
      var angle = 360 / 100
      // 给定相机距离点多少距离飞行，这里取值为5000m
      var distance = 45000
      var startTime = Cesium.JulianDate.fromDate(new Date())

      // var stopTime = Cesium.JulianDate.addSeconds(startTime, 5, new Cesium.JulianDate())

      viewer.clock.startTime = startTime.clone() // 开始时间
      // viewer.clock.stopTime = stopTime.clone() // 结速时间
      viewer.clock.currentTime = startTime.clone() // 当前时间
      viewer.clock.clockRange = Cesium.ClockRange.CLAMPED // 行为方式
      viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK // 时钟设置为当前系统时间; 忽略所有其他设置。
      // 相机的当前heading
      var initialHeading = viewer.camera.heading
      var Exection = function TimeExecution () {
        // 当前已经过去的时间，单位s
        var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime)
        var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading
        viewer.scene.camera.setView({
          destination: position, // 点的坐标
          orientation: {
            heading: heading,
            pitch: pitch
          }
        })
        viewer.scene.camera.moveBackward(distance)
        if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
          viewer.clock.onTick.removeEventListener(Exection)
        }
      }
      viewer.clock.onTick.addEventListener(Exection)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 877px;
}

</style>
