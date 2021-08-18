<template>
  <v-container>
    <v-row class="pa-5">
      <v-card class="px-5 py-5 my-3 rounded-lg" id="mainCard" flat>
        <v-row>
          <v-col cols="auto" class="px-0 pb-0">
            <v-card-text class="py-0 primary--text font-weight-bold subtitle-1">
              Order Information
            </v-card-text>
          </v-col>
          <v-col class="py-1" cols="12">
            <v-card-actions class="body-2 pl-0"> Customer </v-card-actions>
            <v-combobox
              class="elevation-0 pb-2"
              color="accent"
              hide-details="auto"
              :items="allCustomers"
              item-text="name"
              item-value="id"
              v-model="orderForm.data.customer.value"
              auto-select-first
              background-color="#F7F7FC"
              filled
              dense
              solo
              single-line
              flat
              outlined
            >
              <template v-slot:item="{ item }">
                <v-list-item-subtitle
                  class="
                    text-capitalize
                    font-weight-medium
                    primary--text
                    subtitle-1
                  "
                >
                  {{ item.name }}
                </v-list-item-subtitle>
                <v-subheader class="text-end caption grey--text text--darken-2"
                  >({{ item.phone }})
                </v-subheader>
              </template>

              <!-- Combobox if no item -->
              <template v-slot:no-data>
                <v-list-item>
                  <v-btn
                    to="/store/customers/add"
                    block
                    class="subheading text-capitalize elevation-0 primary"
                    >Create New Customer</v-btn
                  >
                </v-list-item>
              </template>
            </v-combobox>

            <v-card-actions class="body-2 pl-0"> Order Id </v-card-actions>
            <v-text-field
              class="pb-5"
              hide-details
              dense
              solo
              flat
              outlined
              background-color="#F7F7FC"
              v-model="orderForm.id"
            >
            </v-text-field>

            <v-card-actions class="body-2 pl-0"> Products </v-card-actions>
            <!-- Product Selected -->
            <v-list-item
              class="my-3 elevation px-0"
              v-for="(product, index) in orderForm.data.products.value"
              :key="index"
            >
              <v-card flat outlined class="rounded-lg pa-1">
                <v-row no-gutters class="d-flex align-center">
                  <v-col cols="3">
                    <v-responsive :aspect-ratio="1 / 1">
                      <v-avatar
                        atar
                        color="secondary"
                        class="rounded-lg"
                        tile
                        height="100%"
                        width="100%"
                      >
                        <v-img> </v-img>
                      </v-avatar>
                    </v-responsive>
                  </v-col>
                  <v-col cols="9" class="pt-1 px-3">
                    <v-col cols="12" class="pa-0">
                      <v-list-item-subtitle class="subtitle-2"
                        >{{ product.name }}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col class="pa-0">
                      <v-list-item-subtitle class="caption primary--text">
                        Rp {{ product.price | currency }}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-row class="d-flex align-center" no-gutters>
                        <v-btn
                          x-small
                          color="secondary"
                          fab
                          tile
                          class="elevation-0 rounded-lg"
                          @click="productCountAction('minus', product.id)"
                        >
                          <v-icon color="primary">mdi-minus</v-icon>
                        </v-btn>

                        <v-col cols="3" pa-0 class="px-1">
                          <v-text-field
                            class="
                              centered-input
                              d-flex
                              justify-center
                              fonte-weigth-medium
                              primary--text
                            "
                            flat
                            counter="3"
                            hide-details
                            dense
                            solo
                            v-model="product.count"
                          ></v-text-field>
                        </v-col>

                        <v-btn
                          x-small
                          color="#F7F7FC"
                          fab
                          tile
                          class="elevation-0 rounded-lg"
                          @click="productCountAction('add', product.id)"
                        >
                          <v-icon color="primary">mdi-plus</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn
                          x-small
                          color="#F7F7FC"
                          fab
                          tile
                          class="elevation-0 rounded-lg"
                          @click="deleteProductCart(product.id)"
                        >
                          <v-icon color="primary">mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item>

            <v-btn
              block
              color="primary"
              class="text-capitalize rounded-lg elevation-0"
              @click="toggleFindProducts"
            >
              Add Product
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <v-sheet
      id="checkoutSheet"
      height="auto"
      flat
      class="px-0 py-2 rounded-lg"
      outlined
      width="94%"
    >
      <v-row>
        <v-col>
          <v-list-item-subtitle class="px-4 pt-1 grey--text text--darken-2"
            >Total Price</v-list-item-subtitle
          >
          <v-card-title
            primary-title
            class="primary--text font-weight-medium py-0"
          >
            Rp {{ getTotalOrderPrice.totalPrice | currency }}
          </v-card-title>
        </v-col>
        <v-col class="d-flex align-center justify-space-around pr-0">
          <v-btn
            color="primary"
            class="text-capitalize elevation-0 rounded-lg caption"
            @click="saveOrder"
            >Checkout ({{ getProductCount }})
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Select Product -->
    <v-bottom-sheet v-model="bottomSheetToggle" scrollable fullscreen>
      <v-sheet color="#F9F8F7" class="px-1">
        <v-col class="text-center">
          <v-btn
            icon
            fab
            text
            small
            color="white"
            class="mx-4 primary"
            @click="toggleFindProducts"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <product-order-list @selectedProduct="addProductToCart($event)" />
        </v-col>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import productOrderList from "./components/ProductOrderList.vue";

export default {
  name: "OrderForm",
  components: { productOrderList },
  data() {
    return {
      bottomSheetToggle: false,
      orderForm: {
        id: "",
        label: "Order Detail",
        data: {
          customer: {
            label: "Customer",
            value: "",
          },
          products: {
            label: "Products",
            value: [],
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["allCustomers"]),
    getTotalOrderPrice() {
      let productList = this.orderForm.data.products.value;
      let totalPrice = 0;
      let totalCost = 0;
      if (productList.length > 0) {
        totalPrice = productList
          .map((item) => item.totalPrice)
          .reduce((prev, curr) => prev + curr, 0);

        totalCost = productList
          .map((item) => item.supplier_price)
          .reduce((prev, curr) => prev + curr, 0);

        console.log(totalCost);

        return { totalPrice, totalCost };
      }
      return { totalPrice, totalCost };
    },
    getProductCount() {
      let productList = this.orderForm.data.products.value;
      return productList
        .map((item) => item.count)
        .reduce((prev, curr) => prev + curr, 0);
    },
  },
  methods: {
    saveOrder() {
      let orderData = this.orderForm.data;
      const { totalPrice, totalCost } = this.getTotalOrderPrice;

      orderData.id = this.orderForm.id;
      orderData.totalPrice = totalPrice;
      orderData.totalCost = totalCost;
      orderData.totalProductCount = this.getProductCount;

      this.$store.dispatch("addNewOrder", orderData);

      setTimeout(() => {
        this.$router.push("/orders");
      }, 1000);
    },

    productCountAction(action, productId) {
      let productCart = this.orderForm.data.products.value;
      const findProduct = productCart.findIndex((item) => item.id == productId);

      if (action == "add") {
        productCart[findProduct].count += 1;
      } else {
        switch (productCart[findProduct].count) {
          case 1:
            this.deleteProductCart(productId);
            break;

          default:
            productCart[findProduct].count -= 1;
            break;
        }
      }
      productCart[findProduct].totalPrice =
        productCart[findProduct].count * productCart[findProduct].price;
    },
    deleteProductCart(productId) {
      let productCart = this.orderForm.data.products.value;

      const findProduct = productCart.findIndex((item) => item.id == productId);

      productCart.splice(findProduct, 1);
    },
    toggleFindProducts() {
      this.bottomSheetToggle = !this.bottomSheetToggle;
    },
    addProductToCart(product) {
      let productCart = this.orderForm.data.products.value;

      let productAdded = {
        ...product,
        count: 0,
      };

      let findProduct = productCart.findIndex((item) => item.id == product.id);

      if (findProduct == -1) {
        productAdded.count = +1;
        productAdded.totalPrice = productAdded.price;
        productAdded.totalCost = productAdded.supplier_price;
        productCart.push(productAdded);
      } else {
        console.log("add more");
        productCart[findProduct].count += 1;
        productCart[findProduct].totalPrice =
          productCart[findProduct].count * productAdded.price;

        productCart[findProduct].totalCost =
          productCart[findProduct].count * productAdded.supplier_price;
      }
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}

#mainCard {
  margin-bottom: 75px !important;
}

#checkoutSheet {
  position: fixed;
  z-index: 99;
  bottom: 65px;
}

.centered-input >>> input {
  text-align: center;
}
</style>
