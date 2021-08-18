<template>
  <v-app fluid v-if="!$route.meta.fullScreen" id="mainContent">
    <!-- Normal Layouts -->

    <!-- App Bar Navigation -->
    <app-bar-layout v-if="$route.path != `/`" />
    <home-app-bar v-else />

    <!-- Main Page layout -->

    <main-page-layout />

    <!-- Bottom Navigation -->
    <bottom-nav-layout />
  </v-app>

  <v-app v-else>
    <main-page-layout />
  </v-app>
</template>

<script>
import appBarLayout from "./AppBar.vue";
import bottomNavLayout from "./BottomNav.vue";
import mainPageLayout from "./MainPage.vue";
import homeAppBar from "./HomeAppBar.vue";

export default {
  name: "Layouts",
  components: { bottomNavLayout, appBarLayout, mainPageLayout, homeAppBar },
};
</script>

<style scoped>
#mainContent {
  background-color: #F6F8FD ;
}
</style>