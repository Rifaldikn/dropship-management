<template>
  <!-- <div> -->
  <v-app-bar class="primary white--text px-0 absolute mx-auto" app dense max-width="600px">
    <v-row class="d-flex justify-center align-center" no-gutters dense>
      <v-col cols="auto">
        <v-btn icon color="white" @click="getLastRoute" to="">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex justify-center absolute">
        <v-toolbar-title class="subtitle-1 font-weight-medium"> {{$route.name}} </v-toolbar-title>
      </v-col>
      <v-col cols="auto">
        <v-btn icon small color="white" to="/">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
  <!-- </div> -->
</template>

<script>
export default {
  name: "AppBarLayout",
  methods: {
    getLastRoute() {
      this.$router.back();
    },
  },
};
</script>