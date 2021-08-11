<template>
  <v-main app>
    <v-container fluid class="pa-0">
      <router-view />
    </v-container>

    <notification />
  </v-main>
</template>

<script>
import notification from "./NotificationModal.vue";

export default {
  name: "MainPageLayout",
  components: { notification },
};
</script>