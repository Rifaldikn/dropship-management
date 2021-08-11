<template>
  <v-app>
    <!-- <v-container max-width="900px"> -->
    <div v-if="$route.meta != `fullScreen`">
      <!-- Normal Layouts -->

      <!-- App Bar Navigation -->
      <app-bar-layout v-if="$route.path != `/`" />
      <home-app-bar v-else />

      <!-- Main Page layout -->

      <main-page-layout />

      <!-- Bottom Navigation -->
      <bottom-nav-layout />
    </div>
    <!-- Full Screen Pages -->
    <!-- </v-container> -->
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
</style>