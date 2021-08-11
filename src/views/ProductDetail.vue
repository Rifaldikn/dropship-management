<template>
  <v-container>
    <!-- Image Input -->
    <v-container>
      <v-row class="">
        <v-col cols="12" class="ma-0 pa-0">
          <v-card
            outlined
            width="100px"
            class="rounded-lg mx-auto"
            @click="$refs.imageInput.click()"
            :ripple="true"
          >
            <!-- <v-avatar > -->
            <v-img
              height="100px"
              position="center center"
              class="rounded-lg"
              v-if="img1"
              :src="img1"
              alt="alt"
            >
            </v-img>
            <!-- </v-avatar> -->
            <v-avatar
              v-else
              height="100px"
              width="100px"
              tile
              class="d-flex justify-center rounded-lg"
            >
              <v-icon> mdi-camera </v-icon>
            </v-avatar>
            <input
              type="file"
              id="imageInput"
              ref="imageInput"
              accept="image/*"
              style="display: none"
              @change="previewImage"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-card
      class="px-5 py-5 my-3 rounded-lg"
      outlined
      v-for="(form, index) in productForm"
      :key="index"
    >
      <v-row>
        <v-col cols="auto" class="px-0 pb-0">
          <v-card-text class="py-0 primary--text font-weight-bold subtitle-1">
            {{ form.label }}
          </v-card-text>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="pb-0">
          <v-btn
            v-if="isEdited && form.label == 'Product Information'"
            color="primary"
            class="text-capitalize font-weight-medium"
            @click="editedButton"
            icon
            >Edit</v-btn
          >
          <v-btn
            v-else-if="
              $route.name == 'Product Detail' &&
              form.label == 'Product Information'
            "
            color="primary"
            class="text-capitalize font-weight-medium"
            @click="editedButton"
            icon
            ><v-icon> mdi-close </v-icon></v-btn
          >
        </v-col>
        <v-col
          class="py-1"
          v-for="(itemForm, key) in form.data"
          :key="key"
          :cols="itemForm.cols ? itemForm.cols : 12"
        >
          <v-card-actions class="body-2 pl-0">
            {{ itemForm.label }}
          </v-card-actions>
          <v-form :readonly="isEdited">
            <v-currency-field
              v-if="itemForm.type == 'number'"
              v-model="itemForm.value"
              :prefix="itemForm.prefix"
              :suffix="itemForm.suffix"
              color="accent"
              background-color="#F7F7FC"
              :rules="[rules.required]"
              hide-details="auto"
              filled
              dense
              solo
              single-line
              flat
              outlined
            />

            <v-combobox
              v-else-if="itemForm.type == 'combobox'"
              class="elevation-0"
              color="accent"
              :items="supplierList"
              item-text="name"
              item-value="id"
              v-model="itemForm.value"
              hide-details="auto"
              auto-select-first
              background-color="#F7F7FC"
              filled
              dense
              solo
              single-line
              flat
              outlined
            >
            </v-combobox>

            <v-text-field
              class="grey--text text--darken-2"
              background-color="#F7F7FC"
              v-model.trim="itemForm.value"
              color="accent"
              v-else
              filled
              :rules="[rules.required]"
              hide-details="auto"
              dense
              solo
              single-line
              flat
              outlined
            >
            </v-text-field>

            <v-btn
              v-if="
                itemForm.name == 'Product Link' &&
                $route.name == 'Product Detail'
              "
              color="primary"
              small
              class="text-capitalize elevation-0 rounded-lg"
            >
              Copy Link
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="d-flex justify-end pa-3" v-if="isSaveButton">
      <v-col cols="auto">
        <v-btn
          color="primary"
          class="rounded-lg text-capitalize elevation-5 d-flex justify-end"
          @click="saveProduct"
          >save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "AddProduct",
  data() {
    return {
      isEdited: false,
      isSaveButton: true,
      caption: "",
      supplierList: [],
      img1: "",
      imageData: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
      productData: {
        imageLink: "",
      },
      productForm: {
        productInformation: {
          label: "Product Information",
          data: {
            productName: {
              label: "Name",
              value: "",
            },
            price: {
              label: "Sell Price",
              value: 0,
              prefix: "Rp ",
              type: "number",
            },
            sku_id: {
              label: "SKU",
              value: "",
            },
            weight: {
              label: "Weigth",
              value: "",
              suffix: "gr",
              type: "number",
              cols: "6",
            },
            stock: {
              label: "Stock",
              value: "",
              type: "number",
              cols: "6",
            },
          },
        },

        supplierInformation: {
          label: "Supplier Information",
          data: {
            store: {
              label: "Name",
              value: "",
              type: "combobox",
            },
            price: {
              label: "Supplier Price",
              type: "number",
              value: 0,
              prefix: "Rp",
            },
            link: {
              label: "Product Link",
              value: "",
            },
          },
        },
      },
    };
  },
  computed: {},

  methods: {
    getEdited() {
      const routerName = this.$route.name;
      if (routerName == "Product Detail") {
        this.isEdited = true;
        this.isSaveButton = false;
      } else {
        this.isEdited = false;
      }
    },
    editedButton() {
      this.isSaveButton = !this.isSaveButton;
      this.isEdited = !this.isEdited;
    },
    saveButtonAction() {
      const routerName = this.$route.name;

      if (routerName.includes("Supplier")) {
        this.saveSupplierData();
      }
    },
    getFormValue() {
      const routerName = this.$route.name;

      if (routerName == "Product Detail") {
        const dataId = this.$route.params;

        const selectedProducts = this.$store.getters.getProductById(
          dataId.product_id
        );

        let productData = this.productForm.productInformation.data;
        let supplierData = this.productForm.supplierInformation.data;

        productData.productName.value = selectedProducts.name;
        productData.price.value = selectedProducts.price;
        productData.sku_id.value = selectedProducts.skuId;
        productData.weight.value = selectedProducts.weight;
        productData.stock.value = selectedProducts.stock;

        const selectedSupplier = this.$store.getters.getSupplierById;
        supplierData.store.value = selectedSupplier(
          selectedProducts.supplier_id
        ).name;
        supplierData.price.value = selectedProducts.supplier_price;
        supplierData.link.value = selectedProducts.productLink;

        this.img1 = selectedProducts.img;
      }
    },
    fetchSupplierList() {
      this.supplierList = this.$store.getters.allSuppliers;
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];

      this.img1 = URL.createObjectURL(this.imageData);
    },
    handleFileUpload() {
      this.$refs.imageInput.click();
    },
    saveProduct() {
      const routerName = this.$route.name;
      const dataId = this.$route.params;

      const { productName, sku_id, price, weight, stock } =
        this.productForm.productInformation.data;

      const {
        store,
        price: supplierPrice,
        link,
      } = this.productForm.supplierInformation.data;

      let newProduct = {
        name: productName.value,
        skuId: sku_id.value,
        price: price.value,
        weight: weight.value,
        stock: stock.value,
        productLink: link.value,
        supplier_price: supplierPrice.value,
      };

      if (routerName == "Product Detail") {
        if (store.value.id) {
          newProduct.supplier_id = store.value.id;
        }

        this.$store.dispatch("updateProductById", {
          productId: dataId.product_id,
          updatedData: newProduct,
        });
        this.$router.push("/products");
      } else {
        newProduct.supplier_id = store.value.id;

        this.$store
          .dispatch("addProduct", {
            productData: newProduct,
            imgData: this.imageData,
          })
          .then(() => {
            this.$router.push("/products");
          });
      }
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>