<template>
<div>
  <div id="container-query" class="query">
    <div id="tip" class='info' style='min-width:18rem;'></div>
  </div>
  <div class="input-card" style='width:18rem;'>
    <label style='color:grey'>公交站点查询</label>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text" >站名</span></div>
      <input id='stationKeyWord' type="text" value='火车站' >
    </div>
    <input id="search" type="button" class="btn" value="查询" />
  </div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'StationQuery',
  data () {
    return {}
  },
  mounted () {
    AMapLoader.load({
      key: '930ce4106d2b67f6ad8068361445c117', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.StationSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
      let markers = []
      stationSearch()
      /* 公交站点查询 */
      function stationSearch () {
        // 移除原有marker
        map.remove(markers)
        markers = []
        const stationKeyWord = document.getElementById('stationKeyWord').value
        if (!stationKeyWord) return
        // 实例化公交站点查询类
        const station = new AMap.StationSearch({
          pageIndex: 1, // 页码
          pageSize: 60, // 单页显示结果条数
          city: '1304' // 确定搜索城市
        })
        station.search(stationKeyWord, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            stationSearchCallBack(result)
          } else {
            document.getElementById('tip').innerHTML = JSON.stringify(result)
          }
        })
      }
      /* 公交站点查询返回数据解析 */
      function stationSearchCallBack (searchResult) {
        const stationArr = searchResult.stationInfo
        const searchNum = stationArr.length
        if (searchNum > 0) {
          document.getElementById('tip').innerHTML = '查询结果：共' + searchNum + '个相关站点'
          for (let i = 0; i < searchNum; i++) {
            const marker = new AMap.Marker({
              icon: new AMap.Icon({
                image: '//a.amap.com/jsapi_demos/static/resource/img/pin.png',
                size: new AMap.Size(32, 32),
                imageSize: new AMap.Size(32, 32)
              }),
              offset: new AMap.Pixel(-16, -32),
              position: stationArr[i].location,
              map: map,
              title: stationArr[i].name
            })
            marker.info = new AMap.InfoWindow({
              content: stationArr[i].name,
              offset: new AMap.Pixel(0, -30)
            })
            marker.on('mouseover', function (e) {
              e.target.info.open(map, e.target.getPosition())
            })
            markers.push(marker)
          }
          map.setFitView()
        }
      }
      document.getElementById('search').onclick = stationSearch
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
