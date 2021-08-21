<template>
  <div>
    <v-container class="pa-0 white">
      <v-app-bar
        color="primary"
        class="rounded-b-xl"
        height="130"
        prominent
        flat
        id="appBar"
      >
        <v-container class="pa-5">
          <v-row class="d-flex align-center">
            <v-col cols="2">
              <v-avatar color="secondary">
                <img v-if="userData.imgURL" :src="userData.imgURL" alt="John" />
              </v-avatar>
            </v-col>

            <v-col>
              <v-toolbar-title class="subtitle-1 white--text">
                {{ userData.name }}
              </v-toolbar-title>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="2">
              <v-btn icon color="white">
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeAppBar",
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>