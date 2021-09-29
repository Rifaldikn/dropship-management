<template>
  <v-main app>
    <v-container class="pa-0">
      <router-view />

      <notification />
    </v-container>
  </v-main>
</template>

<script>
import notification from "./NotificationModal.vue";

export default {
  name: "MainPageLayout",
  components: { notification },
};
</script>

<style scoped>
</style>