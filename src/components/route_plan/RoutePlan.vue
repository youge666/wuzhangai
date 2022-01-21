<template>
<div>
  <div id="container-plan" class="query"></div>
  <div id="panel"></div>
  <div class="input-card" style='width:18rem;'>
    <label style='color:grey'>无障碍公交路线规划</label>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text" >站点1</span></div>
      <input id='buildKeyWord1' type="text" placeholder='如：学校'>
    </div>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text" >站点2</span></div>
      <input id='buildKeyWord2' type="text" placeholder='如：学校'>
    </div>
    <input id="search" type="button" class="btn" value="开始规划" />
  </div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'RoutePlan',
  data () {
    return {}
  },
  mounted () {
    AMapLoader.load({
      key: '930ce4106d2b67f6ad8068361445c117', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Transfer'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: '2.0.0' // Loca 版本，缺省 1.3.2
      }
    }).then((AMap) => {
      const map = new AMap.Map('container-plan', {
        resizeEnable: true,
        center: [114.482693932, 36.6093079285], // 地图中心点
        zoom: 13 // 地图显示的缩放级别
      })
      const transferOption = {
        map: map,
        city: '邯郸市',
        nightflag: true, // 是否计算夜班车
        panel: 'panel',
        policy: AMap.TransferPolicy.LEAST_TIME // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
      }

      const transfer = new AMap.Transfer(transferOption)

      // 关键字查询
      document.getElementById('search').onclick = () => {
        map.clearMap()
        const stationKeyWord1 = document.getElementById('buildKeyWord1').value
        const stationKeyWord2 = document.getElementById('buildKeyWord2').value
        // 根据起、终点坐标查询公交换乘路线
        transfer.search([{ keyword: stationKeyWord1, city: '邯郸市' },
          // 第一个元素city缺省时取transOptions的city属性
          { keyword: stationKeyWord2, city: '邯郸市' }], (status, result) => {
          console.log('hello')
          // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === 'complete') {
            // if (result.plans && result.plans.length) {
            //   this.$message.success('绘制公交路线完成')
            //   drawRoute(result.plans[0])
            // }
            this.$message.success('绘制公交路线完成')
            drawRoute(result.plans[0])
          } else {
            this.$message.error('公交路线数据查询失败' + result)
          }
        })
      }

      function drawRoute (route) {
        const startMarker = new AMap.Marker({
          position: route.segments[0].transit.origin,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: map,
          anchor: 'bottom-center'
        })

        const endMarker = new AMap.Marker({
          position: route.segments[route.segments.length - 1].transit.destination,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          map: map,
          anchor: 'bottom-center'
        })

        const routeLines = []
        for (let i = 0, l = route.segments.length; i < l; i++) {
          const segment = route.segments[i]
          let line = null

          // 绘制步行路线
          if (segment.transit_mode === 'WALK') {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: 'grey',
              strokeOpacity: 1.0,
              lineJoin: 'round',
              strokeStyle: 'dashed'
            })

            map.add(line)
            routeLines.push(line)
          } else if (segment.transit_mode === 'SUBWAY' || segment.transit_mode === 'BUS') {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              strokeOpacity: 1.0,
              lineJoin: 'round',
              strokeStyle: 'solid'
            })
            map.add(line)
            routeLines.push(line)
          } else {
            // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
          }
        }

        // 调整视野达到最佳显示区域
        map.setFitView([startMarker, endMarker].concat(routeLines))
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped lang="scss">
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 60px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-transfer {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.query{
  width: 100%;
  height: 877px;
}
.input-card {
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
.info {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  position: fixed;
  background-color: white;
  width: auto;
  min-width: 22rem;
  border-width: 0;
  right: 1rem;
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
  z-index: 99;
}
</style>
