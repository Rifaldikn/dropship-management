<template>
  <v-dialog
    v-model="notificationModal.isActive"
    width="auto"
    max-width="320px"
    hide-overlay
    class="rounded-lg"
    transition="scale-transition"
    close-delay="1000"
  >
    <v-card class="text-center pa-5 rounded-lg">
      <v-row no-gutters class="d-flex align-center">
        <v-col>
          <v-progress-circular
            :width="5"
            color="primary"
            indeterminate
            v-if="notificationModal.isLoading"
          ></v-progress-circular>
        </v-col>
        <v-col cols="12">
          <v-img
            v-if="notificationModal.img"
            height="50px"
            :src="getImgStatus(notificationModal.img)"
            class="pa-5"
            contain
          ></v-img>
        </v-col>
        <v-col cols="12" class="text-center d-flex justify-center">
          <v-card-title class="subtitle-1" v-if="notificationModal.message">
            {{ notificationModal.message }}
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["notificationModal"]),
  },
  methods: {
    getImgStatus(img) {
      return require(`../assets/${img}.png`);
    },
  },
};
</script>