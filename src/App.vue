<template>
  <div>
    <!-- <v-main> -->
    <router-view />

    <!-- </v-main> -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style >
body {
  max-width: 600px !important;
  margin: 0 auto;
}

.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}

* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
