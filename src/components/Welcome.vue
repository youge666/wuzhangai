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
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 877px;
}

</style>
