<template>
<div>
  <div id="container-query" class="query">
  </div>
  <div class="input-card1" style='width:18rem;'>
    <label style='color:grey'>公交线路查询</label>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text" >线路名称</span></div>
      <input id='BusLineName' type="text" value='65' >
    </div>
    <input id="search" type="button" class="btn" value="查询" />
  </div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'RouteQuery',
  data () {
    return {}
  },
  mounted () {
    AMapLoader.load({
      key: '930ce4106d2b67f6ad8068361445c117', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.LineSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: '2.0.0' // Loca 版本，缺省 1.3.2
      }
    }).then((AMap) => {
      const map = new AMap.Map('container-query', {
        resizeEnable: true,
        center: [114.482693932, 36.6093079285], // 地图中心点
        zoom: 13 // 地图显示的缩放级别
      })
      let linesearch

      /* 公交线路查询 */
      function lineSearch () {
        const busLineName = document.getElementById('BusLineName').value
        if (!busLineName) return
        // 实例化公交线路查询类，只取回一条路线
        if (!linesearch) {
          linesearch = new AMap.LineSearch({
            pageIndex: 1,
            city: '邯郸',
            pageSize: 1,
            extensions: 'all'
          })
        }
        // 搜索“536”相关公交线路
        linesearch.search(busLineName, function (status, result) {
          map.clearMap()
          if (status === 'complete' && result.info === 'OK') {
            lineSearchCallback(result)
          } else {
            alert(result)
          }
        })
      }
      /* 公交路线查询服务返回数据解析概况 */
      function lineSearchCallback (data) {
        const lineArr = data.lineInfo
        const lineNum = data.lineInfo.length
        if (lineNum === 0) {
        } else {
          for (let i = 0; i < lineNum; i++) {
            const pathArr = lineArr[i].path
            const stops = lineArr[i].via_stops
            const startPot = stops[0].location
            const endPot = stops[stops.length - 1].location
            if (i === 0) // 作为示例，只绘制一条线路
            // eslint-disable-next-line brace-style
            { drawbusLine(startPot, endPot, pathArr) }
          }
        }
      }
      /* 绘制路线 */
      function drawbusLine (startPot, endPot, BusArr) {
        // 绘制起点，终点
        // eslint-disable-next-line no-new
        new AMap.Marker({
          map: map,
          position: startPot, // 基点位置
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          zIndex: 10,
          anchor: 'bottom-center'
        })
        // eslint-disable-next-line no-new
        new AMap.Marker({
          map: map,
          position: endPot, // 基点位置
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          zIndex: 10,
          anchor: 'bottom-center'
        })
        // 绘制乘车的路线
        const busPolyline = new AMap.Polyline({
          map: map,
          path: BusArr,
          strokeColor: '#0e329c', // 线颜色
          strokeOpacity: 0.8, // 线透明度
          isOutline: true,
          outlineColor: 'white',
          strokeWeight: 8// 线宽
        })
        // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
        // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
        map.setFitView(busPolyline, true, [60, 200, 60, 60])
      }
      lineSearch()
      document.getElementById('search').onclick = lineSearch
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
.input-card1 {
  position: absolute;
  z-index: 99;
  top: 60px;
  left: 202px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  width: 22rem;
  border-width: 0;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.75rem 1.25rem;
}
.btn {
  margin-left: 0;
  font-size: 1rem;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid #25A5F7;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  background-color: transparent;
  background-image: none;
  color: #25A5F7;
  padding: 0.25rem 0.5rem;
  line-height: 1.5;
  border-radius: 1rem;
  -webkit-appearance: button;
  cursor: pointer;
}
label {
  cursor: default;
  margin-left: 0;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 0.4rem;
}
.input-item {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  .input-item-prepend {
    margin-right: -1px;
    .input-item-text {
      width: 6rem;
      padding: 0.4rem 0.7rem;
      display: inline-block;
      text-justify: distribute-all-lines;
      text-align-last: justify;
      -moz-text-align-last: justify;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      text-align: center;
      white-space: nowrap;
      background-color: #e9ecef;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
  }
  input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    text-transform: none;
    display: inline-block;
    padding: 0.5rem 0.75rem;
    color: #495057;
    vertical-align: middle;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #fff;
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
  }
}
.btn:hover {
  background-color: #25A5F7;
  color: #fff;
}

</style>
