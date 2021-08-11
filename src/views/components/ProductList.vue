<template>
  <v-container>
    <v-row class="my-0">
      <v-col
        cols="12"
        v-for="(product, index) in productList"
        :key="index"
        class="pa-0 mb-2"
      >
        <v-card
          class="rounded-lg px-0"
          outlined
          :to="'/products/' + product.id"
          v-my-touch:touchhold="confirmDelete(product)"
        >
          <!-- Store Platform -->

          <!-- Product Information -->
          <v-row
            class="px-3 d-flex align-center caption grey--text text--darken-2"
            v-if="product.supplier_name"
          >
            <v-col cols="auto" class="pt-5">
              <!-- Store Name -->
              <v-card-actions name="productDetial" class="pa-0">
                <span>{{ product.supplier_name }}</span>
                <span class="px-1"> | </span>
                <span>{{ product.supplier_location }}</span>
                <!-- <span>{{product.supplier_platform}}</span> -->
              </v-card-actions>
            </v-col>

            <v-spacer></v-spacer>
            <v-col class="pt-5 d-flex justify-end" cols="3">
              <v-img
                contain
                height="20"
                :src="'../assets/' + `${product.supplier_platform}` + '.png'"
              >
              </v-img>
            </v-col>
          </v-row>
          <v-divider class="my-1" v-if="product.supplier_name"></v-divider>
          <v-row class="px-3 py-2" no-gutters>
            <!-- Proudct Image -->
            <v-col cols="2">
              <v-row class="d-flex justify-center align-center text-center">
                <v-col cols="12">
                  <v-avatar class="rounded-lg" color="secondary" size="60">
                    <v-img
                      v-if="product.img"
                      class="rounded-lg"
                      :src="product.img"
                      :aspect-ratio="1 / 1"
                    >
                    </v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-col>
            <!-- Product Name -->
            <v-col cols="10">
              <v-card-title
                class="
                  text-capitalize
                  body-2
                  font-weight-medium
                  grey--text
                  text--darken-2
                  py-0
                "
                >{{ product.name }}
              </v-card-title>
              <!-- Product Price -->
              <v-card-text class="caption primary--text py-0">
                Rp {{ product.price | currency }}
              </v-card-text>

              <!-- Product SKU -->
              <v-row class="d-flex align-center">
                <v-col class="pr-0" cols="auto">
                  <v-card-text class="caption grey--text text--darken-1 py-0">
                    SKU: {{ product.skuId }}
                    <span class="text-uppercase">{{ product.sku_id }}</span>
                  </v-card-text>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex align-end px-0" cols="4">
                  <v-card-text
                    class="caption grey--text text-right text--darken-1 py-0"
                  >
                    Stock ({{ product.stock == "" ? 0 : product.stock }})
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <delete-modal
        :dialog="isDeleteAction"
        :deleteItem="selectedProduct"
        @cancel="cancelDelete"
        @activeDeleteItem="deleteProduct($event)"
      />

      <v-col
        v-if="productList.length == 0"
        style="
          position: fixed;
          top: 50%;
          display: flex;
          justify-content: center;
          text-align: center;
        "
      >
        <v-card-title class="grey--text">
          No Product, Please Create One
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import deleteModal from "./DeleteModal.vue";
import { mapGetters } from "vuex";

export default {
  name: "ProductList",
  components: { deleteModal },
  data() {
    return {
      isDeleteAction: false,
      selectedProduct: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["productList"]),
  },
  methods: {
    confirmDelete(product) {
      return () => {
        // your handler code here
        console.log(product);
        this.isDeleteAction = true;
        this.selectedProduct = Object.assign({}, product);
      };
    },
    cancelDelete() {
      this.isDeleteAction = false;
    },
    deleteProduct(value) {
      this.isDeleteAction = false;
      this.$store.dispatch("deleteProduct", value);
      // console.log("touched");
    },
  },
};
</script>``