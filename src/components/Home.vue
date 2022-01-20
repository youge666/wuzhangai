<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>无障碍公交路线规划系统</span>
      </div>
      <div>
        <el-button type="success" @click="homePage">首页</el-button>
        <el-button type="info" @click="logout">退出</el-button>
      </div>

    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          active-text-color="#409EFF">
<!--          一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
<!--            一级菜单的模板区域-->
            <template slot="title">
<!--              图标-->
              <i :class="iconsObj[item.id]"></i>
<!--              文本-->
              <span>{{item.authName}}</span>
            </template>
<!--            二级菜单-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
<!--              二级菜单的模板区域-->
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 左侧菜单数据
      menuList: [
        {
          authName: '公交路线',
          id: 1,
          children: [
            {
              authName: '路线查询',
              id: 11,
              path: 'route_query'
            },
            {
              authName: '站点查询',
              id: 12,
              path: 'station_query'
            },
            {
              authName: '路线监测',
              id: 13,
              path: 'route_detection'
            }
          ]
        },
        {
          authName: '残疾人士分布',
          id: 2,
          children: [
            {
              authName: '残疾人士分布可视化',
              id: 21,
              path: 'disable_visual'
            },
            {
              authName: '居民活动范围',
              id: 22,
              path: 'disable_area'
            }
          ]
        },
        {
          authName: '基础设施分布',
          id: 3,
          children: [
            {
              authName: '基础设施查询',
              id: 31,
              path: 'build_query'
            },
            {
              authName: '基础设施热点分布',
              id: 32,
              path: 'infrastructure_distribution'
            },
            {
              authName: '基础设施影响范围',
              id: 33,
              path: 'infrastructure_impact'
            }
          ]
        },
        {
          authName: '路线规划',
          id: 4,
          children: [
            {
              authName: '路线规划',
              id: 41,
              path: 'route_plan'
            },
            {
              authName: '路线可行性分析',
              id: 42,
              path: 'route_feasibility'
            }
          ]
        }
      ],
      // 一级菜单图标
      iconsObj: {
        1: 'iconfont icon-user',
        2: 'iconfont icon-tijikongjian',
        3: 'iconfont icon-shangpin',
        4: 'iconfont icon-danju',
        5: 'iconfont icon-baobiao'
      },
      // 是否折叠菜单，默认不折叠
      isCollapse: false
    }
  },
  methods: {
    homePage () {
      this.$router.push('/home')
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮实现菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d4a;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  height: 100%;
  background-color: #eaedf1;
  padding: 0;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
