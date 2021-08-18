<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-card
          class="pa-3 my-3 elevation-0 rounded-lg"
          v-for="(supplier, index) in allSuppliers"
          :key="index"
          :to="'/store/suppliers/' + supplier.id"
          v-my-touch:touchhold="confirmDelete(supplier)"
        >
          <v-row class="d-flex justify-center align-center text-capitalize">
            <v-col cols="7" class="d-flex align-start">
              <v-row>
                <v-col>
                  <v-card-text
                    class="subtitle-1 font-weight-medium pa-0 primary--text"
                  >
                    {{ supplier.name }}
                  </v-card-text>
                  <v-card-text
                    class="subtitle-2 pa-0 grey--text text--darken-2"
                  >
                    {{ supplier.description }}
                  </v-card-text>
                  <v-card-text class="caption pa-0 grey--text">
                    {{ supplier.location }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-row class="d-flex align-center justify-center mx-auto">
                <v-col class="pb-0">
                  <v-img
                    height="30px"
                    contain
                    :src="getPlatformImg(supplier.platform)"
                  ></v-img>
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-chip
                    class="text-center"
                    color="primary"
                    small
                    label
                    outlined
                    text-color="primary"
                  >
                    {{ supplier.products.length }} Porducts
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
        v-if="allSuppliers.length == 0"
        style="position: fixed; top: 50%"
      >
        <v-card-title class="grey--text">
          No Supplier, Please Create One
        </v-card-title>
      </v-col>
      <delete-modal
        :dialog="isDeleteAction"
        :deleteItem="selectedSupplier"
        @cancel="cancelDelete"
        @activeDeleteItem="deleteSupplier($event)"
      />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deleteModal from "./DeleteModal.vue";

export default {
  name: "SupplierList",
  components: { deleteModal },
  data() {
    return {
      isDeleteAction: false,
      dialog: false,
      selectedSupplier: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["allSuppliers"]),
  },
  methods: {
    getPlatformImg(platform) {
      return require(`../../assets/${platform}.png`);
    },
    confirmDelete(supplier) {
      return () => {
        // your handler code here
        console.log(supplier);
        this.isDeleteAction = true;
        this.selectedSupplier = Object.assign({}, supplier);
      };
    },
    cancelDelete() {
      this.isDeleteAction = false;
    },
    deleteSupplier(value) {
      console.log(value);
      this.isDeleteAction = false;
      this.$store.dispatch("deleteSupplier", value);
    },
  },
};
</script>