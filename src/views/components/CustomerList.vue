<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-card
          v-for="customer in allCustomers"
          :key="customer.id"
          class="pa-3 elevation-0 mb-2 rounded-lg"
          outlined
          :to="'/store/customers/' + customer.id"
          :ripple="true"
          v-my-touch:touchhold="confirmDelete(customer)"
        >
          <v-row
            class="px-2 flex-no-wrap justify-space-between text-capitalize"
          >
            <v-col cols="7" class="d-flex align-start">
              <v-row>
                <v-col>
                  <v-card-text
                    class="subtitle-1 font-weight-medium pa-0 primary--text"
                  >
                    {{ customer.name }}
                  </v-card-text>
                  <v-card-text class="subtitle-2 pa-0 grey--text">
                    08123456789
                  </v-card-text>
                  <v-card-text class="caption pa-0 grey--text">
                    {{ customer.address }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="my-auto">
              <v-row class="d-flex justify-center align-center">
                <!-- <v-card-text class="caption pa-0 grey--text text-center">
                Status
              </v-card-text> -->
                <v-chip
                  class="text-center my-1 caption font-weight-medium"
                  color="primary"
                  small
                  label
                  outlined
                  text-color="primary"
                >
                  {{ customer.orders.length || 0 }} Orders
                </v-chip>
                <v-chip
                  class="text-center"
                  color="blue"
                  small
                  label
                  text-color="white"
                >
                  Shipping
                </v-chip>
                <v-card-text class="caption pa-0 grey--text text-center">
                  21/9/2020
                </v-card-text>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
        v-if="allCustomers.length == 0"
        style="position: fixed; top: 50%"
      >
        <v-card-title class="grey--text">
          No Customer, Please Create One
        </v-card-title>
      </v-col>
      <delete-modal
        :dialog="isDeleteAction"
        :deleteItem="selectedCustomer"
        @cancel="cancelDelete"
        @activeDeleteItem="deleteCustomer($event)"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import deleteModal from "./DeleteModal.vue";

export default {
  name: "CustomerList",
  components: { deleteModal },
  data() {
    return {
      isDeleteAction: false,
      dialog: false,
      selectedCustomer: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["allCustomers"]),
  },
  methods: {
    confirmDelete(customer) {
      return () => {
        // your handler code here
        console.log(customer);
        this.isDeleteAction = true;
        this.selectedCustomer = Object.assign({}, customer);
      };
    },
    cancelDelete() {
      this.isDeleteAction = false;
    },
    deleteCustomer(value) {
      console.log(value);
      this.isDeleteAction = false;
      this.$store.dispatch("deleteCustomer", value);
    },
  },
};
</script>