<template>
  <v-container>
    <v-card
      class="px-5 py-5 my-5 rounded-lg"
      outlined
      v-for="form in supplierForm"
      :key="form.name"
    >
      <v-row>
        <!-- <v-col cols="12" class="primary--text pt-0 mt-0"> -->
        <v-card-text class="py-0 primary--text font-weight-bold subtitle-1">
          {{ form.name }}
        </v-card-text>
        <!-- </v-col> -->
        <v-col
          class="py-1"
          v-for="itemForm in form.child"
          :key="itemForm.name"
          :cols="itemForm.cols ? itemForm.cols : 12"
        >
          <v-card-actions class="body-2 pl-0">
            {{ itemForm.name }}
          </v-card-actions>
          <v-text-field
            class="grey--text text--darken-2"
            background-color="#F7F7FC"
            color="accent"
            filled
            hide-details
            dense
            solo
            single-line
            flat
            outlined
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="d-flex justify-end align-center pa-3">
      <v-col cols="auto">
        <v-btn
          flat
          color="primary"
          class="rounded-lg text-capitalize elevation-5 d-flex justify-end"
          >save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Customer Form",
  data() {
    return {
      supplierForm: [
        {
          name: "Supplier Information",
          child: [
            {
              name: "Name",
              vModel: "",
            },
            {
              name: "Location",
              vModel: "",
            },
            {
              name: "Supplier Link",
              vModel: "",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>