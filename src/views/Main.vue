<template>
  <div>
    <el-container>
      <el-aside width="200px auto">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <CommonTag />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
  name: "",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style lang="less">
.el-header {
  padding: 0;
}
</style>