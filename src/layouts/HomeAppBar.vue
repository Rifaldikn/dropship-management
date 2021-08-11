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
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </v-col>

            <v-col>
              <v-toolbar-title class="title white--text"
                >Calica Official
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
export default {
    name: "HomeAppBar"
}
</script>