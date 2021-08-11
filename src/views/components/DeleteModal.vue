<template>
  <v-dialog
    v-model="dialog"
    max-width="320"
    persistent
    class="rounded-lg"
    overlay-opacity="5%"
  >
    <v-card class="px-0 py-5 rounded-lg text-center">
      <v-row class="d-flex justify-center align-center" no-gutters>
        <v-col cols="2" class="pa-0">
          <v-img height="50px" contain src="../../assets/warn.png"></v-img>
        </v-col>
        <v-col cols="auto" class="pa-0">
          <v-card-title class="text-h5 primary--text">
            Are You Sure?
          </v-card-title>
        </v-col>

        <v-card-text>
          Do you want to delete
          <span class="text-capitalize font-weight-bold subtitle-2">
            {{ deleteItem.name }}</span
          >
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="error"
            class="rounded-lg text-capitalize elevation-0 mx-5 pa-3"
            medium
            @click="$emit('activeDeleteItem', deleteItem)"
          >
            Delete
          </v-btn>

          <v-btn
            color="grey"
            class="rounded-lg text-capitalize white--text elevation-0 mx-5 pa-3"
            medium
            @click="$emit('cancel')"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["deleteItem", "dialog"],
  methods: {},
};
</script>