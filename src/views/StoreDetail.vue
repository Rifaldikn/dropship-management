<template>
  <v-container class="pa-5">
    <v-card class="px-5 py-5 my-5 rounded-lg" flat>
      <v-form :readonly="isEdited">
        <v-row>
          <v-col cols="auto" class="px-0 pb-0">
            <v-card-text class="py-0 primary--text font-weight-bold subtitle-1">
              {{ getForm.name }}
            </v-card-text>
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="2" class="pb-0">
            <v-btn
              v-if="isEdited"
              color="primary"
              class="text-capitalize font-weight-medium"
              @click="editedButton"
              icon
              >Edit</v-btn
            >
            <v-btn
              v-else-if="
                $route.name !== 'Add New Customer' &&
                $route.name !== 'Add New Supplier'
              "
              color="primary"
              class="text-capitalize font-weight-medium"
              @click="editedButton"
              icon
              ><v-icon> mdi-close </v-icon></v-btn
            >
          </v-col>

          <!-- </v-col> -->
          <v-col
            class="py-1"
            v-for="(itemForm, key) in getForm.data"
            :key="itemForm.label"
            :cols="itemForm.cols ? itemForm.cols : 12"
          >
            <v-card-actions class="body-2 pl-0">
              {{ itemForm.label }}
            </v-card-actions>

            <!-- Radio Button for Platform Info -->
            <v-radio-group
              class="mt-0"
              v-model="itemForm.value"
              v-if="itemForm.type == 'radio'"
              :rules="[rules.required]"
              hide-details="auto"
              dense
            >
              <v-radio
                class="caption"
                v-for="item in itemForm.items"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>

            <v-textarea
              v-else-if="itemForm.type == 'textarea'"
              name="input-7-1"
              background-color="#F7F7FC"
              v-model="itemForm.value"
              color="accent"
              rows="2"
              row-height="2"
              :rules="[rules.required]"
              no-resize
              filled
              hide-details="auto"
              dense
              solo
              single-line
              flat
              outlined
            ></v-textarea>

            <v-text-field
              v-else-if="key != 'products'"
              class="grey--text text--darken-2"
              background-color="#F7F7FC"
              v-model="itemForm.value"
              color="accent"
              :rules="[rules.required]"
              filled
              hide-details="auto"
              dense
              solo
              single-line
              flat
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col v-if="$route.name == 'Supplier Detail'">
            <v-btn
              color="primary"
              dark
              class="text-capitalize caption"
              block
              @click="bottomSheetToggle = !bottomSheetToggle"
            >
              {{ getProducts.length }} Products...
            </v-btn>
            <v-bottom-sheet
              v-model="bottomSheetToggle"
              scrollable
              fullscreen
              v-if="isEdited"
            >
              <v-sheet color="#F9F8F7" class="px-5">
                <v-col class="text-center">
                  <v-btn
                    icon
                    fab
                    text
                    small
                    color="white"
                    class="mx-4 primary"
                    @click="getSupplierProducts"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
                <product-list
                  :productList="getProducts"
                  v-if="$route.name == 'Supplier Detail'"
                />
              </v-sheet>
            </v-bottom-sheet>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-row class="d-flex justify-end pa-3" v-if="isSaveButton">
      <v-col cols="auto">
        <v-btn
          color="primary"
          class="rounded-lg text-capitalize elevation-5 d-flex justify-end"
          @click="saveButtonAction"
          >save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productList from "./components/ProductList.vue";

export default {
  name: "StoreDetail",
  components: { productList },
  data() {
    return {
      bottomSheetToggle: false,
      isEdited: false,
      isSaveButton: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
      customer: {
        name: "Customer Information",
        data: {
          customerName: {
            label: "Name",
            value: "",
          },
          address: {
            label: "Address",
            value: "",
          },
          phoneNumber: {
            label: "Phone Number",
            value: "",
          },
        },
      },
      supplier: {
        name: "Supplier Information",
        data: {
          name: {
            label: "Name",
            value: "",
          },

          location: {
            label: "Location",
            value: "",
          },
          link: {
            label: "Supplier Link",
            value: "",
          },
          description: {
            label: "Store Description",
            value: "",
            type: "textarea",
          },
          storePlatform: {
            label: "Supplier Platform",
            value: "",
            type: "radio",
            items: ["Shopee", "Tokopedia", "Bukalapak"],
          },
        },
      },
    };
  },
  computed: {
    getForm() {
      return this.$route.name.includes("Customer")
        ? this.customer
        : this.supplier;
    },
    getProducts() {
      return this.$store.getters.getProductsBySupplierId(
        this.$route.params.supplier_id
      );
    },
  },
  methods: {
    getSupplierProducts() {
      this.bottomSheetToggle = !this.bottomSheetToggle;
    },
    getCustomerOrders() {
      this.bottomSheetToggle = !this.bottomSheetToggle;
    },
    editedButton() {
      this.isSaveButton = !this.isSaveButton;
      this.isEdited = !this.isEdited;
    },
    getFormValue() {
      const routerName = this.$route.name;
      const dataId = this.$route.params;
      // console.log(dataId);

      if (routerName == "Supplier Detail" || routerName == "Customer Detail") {
        switch (routerName) {
          case "Supplier Detail": {
            const selectedSupplier = this.$store.getters.getSupplierById(
              dataId.supplier_id
            );

            let supplierData = this.supplier.data;

            supplierData.name.value = selectedSupplier.name;
            supplierData.location.value = selectedSupplier.location;
            supplierData.description.value = selectedSupplier.description;
            supplierData.storePlatform.value = selectedSupplier.platform;
            supplierData.link.value = selectedSupplier.link;
            supplierData.products = selectedSupplier.products;
            break;
          }

          case "Customer Detail": {
            const selectedCustomer = this.$store.getters.getCustomerById(
              dataId.customer_id
            );

            let customerData = this.customer.data;

            customerData.customerName.value = selectedCustomer.name;
            customerData.phoneNumber.value = selectedCustomer.phone;
            customerData.address.value = selectedCustomer.address;

            break;
          }

          default:
            break;
        }
      }
    },
    getEdited() {
      const routerName = this.$route.name;
      if (routerName == "Supplier Detail" || routerName == "Customer Detail") {
        this.isEdited = true;
        this.isSaveButton = false;
      } else {
        this.isEdited = false;
      }
    },
    saveButtonAction() {
      const routerName = this.$route.name;

      if (routerName.includes("Supplier")) {
        this.saveSupplierData();
      } else {
        this.saveCustomerData();
      }
    },
    saveCustomerData() {
      const routerName = this.$route.name;
      const dataId = this.$route.params.customer_id;
      let customerForm = this.customer.data;

      const customerData = {
        name: customerForm.customerName.value,
        phone: customerForm.phoneNumber.value,
        address: customerForm.address.value,
      };

      if (
        customerData.name ||
        customerData.address ||
        customerData.phoneNumber
      ) {
        if (routerName == "Customer Detail") {
          this.$store.dispatch("updateCustomerById", {
            customerId: dataId,
            updatedData: customerData,
          });
          this.$router.push("/store");
        } else {
          this.$store.dispatch("addCustomer", customerData).then(() => {
            this.$router.push("/store");
          });
        }
      }
    },
    saveSupplierData() {
      const routerName = this.$route.name;
      const dataId = this.$route.params;
      let supplierForm = this.supplier.data;

      const supplierData = {
        name: supplierForm.name.value,
        location: supplierForm.location.value,
        link: supplierForm.link.value,
        platform: supplierForm.storePlatform.value,
        description: supplierForm.description.value,
      };

      if (supplierData.name || supplierData.location || supplierData.link) {
        if (routerName == "Supplier Detail") {
          this.$store.dispatch("updateSupplierById", {
            supplierId: dataId.supplier_id,
            updatedData: supplierData,
          });
          this.$router.push("/store");
        } else {
          this.$store.dispatch("addSupplier", supplierData).then(() => {
            this.$router.push("/store");
          });
        }
      }
    },
  },
  created() {
    this.getEdited();
    this.getFormValue();
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>