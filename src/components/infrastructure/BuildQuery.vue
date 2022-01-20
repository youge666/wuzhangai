<template>
<div>
  <div id="container-query" class="query"></div>
  <div id="panel"></div>
  <div class="input-card" style='width:18rem;'>
    <label style='color:grey'>基础设施查询</label>
    <div class="input-item">
      <div class="input-item-prepend"><span class="input-item-text" >名称</span></div>
      <input id='buildKeyWord' type="text" placeholder='如：学校'>
    </div>
    <input id="search" type="button" class="btn" value="查询" />
  </div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'BuildQuery',
  data () {
    return {}
  },
  mounted () {
    AMapLoader.load({
      key: '930ce4106d2b67f6ad8068361445c117', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PlaceSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: { // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: { // 是否加载 Loca， 缺省不加载
        version: '1.3.2' // Loca 版本，缺省 1.3.2
      }
    }).then((AMap) => {
      const map = new AMap.Map('container-query', {
        resizeEnable: true,
        center: [114.482693932, 36.6093079285], // 地图中心点
        zoom: 13 // 地图显示的缩放级别
      })
      var placeSearch
      AMap.plugin(['AMap.PlaceSearch'], function () {
        // 构造地点查询类
        placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '1304', // 兴趣点城市
          citylimit: true, // 是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: 'panel', // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
      })
      // 关键字查询
      document.getElementById('search').onclick = function () {
        const stationKeyWord = document.getElementById('buildKeyWord').value
        placeSearch.search(stationKeyWord)
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped lang="scss">
#panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 60px;
  right: 10px;
  width: 280px;
  z-index: 99;
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
