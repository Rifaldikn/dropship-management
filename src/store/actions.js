import firebase from "firebase/app";

import {
  storage,
  productsCollection,
  suppliersCollection,
  customersCollection,
  ordersCollection,
} from "../plugins/firebase.js";

import { nanoid } from "nanoid";
import moment from "moment";

const actions = {
  /**
   *
   * Order Actions
   *
   */

  async addNewOrder({ commit }, orderForm) {
    let orderId = orderForm.id;

    const date = moment().format("MMMM Do YYYY, h:mm:ss a");

    let orderData = {
      customer: {
        id: orderForm.customer.value.id,
        name: orderForm.customer.value.name,
      },
      createdAt: date,
      updatedAt: date,
      products: orderForm.products.value,
      totalPrice: orderForm.totalPrice,
      status: "To Order",
    };
    console.log(orderId);
    if (!orderId) orderId = nanoid(7);

    await ordersCollection
      .doc(orderId)
      .set(orderData)
      .then(() => {});

    await customersCollection
      .doc(orderData.customerId)
      .update({
        orderItems: firebase.firestore.FieldValue.arrayUnion(orderId),
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    commit("SET_Notification", {
      message: "Order is successfully Saved",
      isActive: true,
      img: "success",
    });

    setTimeout(() => {
      commit("SET_Notification", {
        isActive: false,
      });
    }, 2000);
  },

  async fetchOrdersProduct({ commit }) {
    await ordersCollection.get().then((querySnapshot) => {
      const orderList = [];

      querySnapshot.forEach((doc) => {
        const order = doc.data();

        order.id = doc.id;
        orderList.push(order);
      });
      commit("SET_Orders", orderList);
    });
  },

  /**
   *
   * Product Actions
   *
   */

  async addProduct({ dispatch }, { productData, imgData }) {
    if (imgData) {
      let isUploaded;

      isUploaded = await dispatch("uploadImageBlob", imgData);

      // console.log(isUploaded);
      if (isUploaded) {
        productData.img = isUploaded;
      } else {
        productData.img = "";
      }
    }

    await productsCollection
      .add(productData)
      .then(async (docRef) => {
        // console.log(docRef.id);
        await dispatch("addProductToSupplier", {
          supplierId: productData.supplier_id,
          productId: docRef.id,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async updateProductById(_, { productId, updatedData }) {
    await productsCollection
      .doc(productId)
      .set(updatedData, { merge: true })
      .then(() => {});
  },

  async fetchProductListItems({ commit }) {
    await productsCollection.get().then((querySnapshot) => {
      const productList = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();

        product.id = doc.id;
        productList.push(product);
      });
      commit("SET_products", productList);
    });
  },

  async deleteProduct({ commit }, deletedProduct) {
    await productsCollection
      .doc(deletedProduct.id)
      .delete()
      .then(() => {
        commit("SET_Notification", {
          message: "Product is successfully Deleted",
          isActive: true,
          isLoading: false,
          img: "success",
        });

        suppliersCollection.doc(deletedProduct.supplier_id).update({
          products: firebase.firestore.FieldValue.arrayRemove(
            deletedProduct.id
          ),
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },

  uploadImageBlob(_, imgData) {
    return new Promise((resolve, reject) => {
      // Create the file metadata
      var metadata = {
        contentType: "image/jpg,jpeg,png",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storage
        .ref()
        .child("productImages/" + imgData.name)
        .put(imgData, metadata);

      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => {
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   *
   * Store Actions
   *
   */

  async addSupplier(_, supplierData) {
    supplierData.products = [];
    await suppliersCollection
      .add(supplierData)
      .then((docRef) => {
        console.log("GET_products", "Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async addCustomer(_, customerData) {
    customerData.orders = [];

    await customersCollection
      .add(customerData)
      .then((docRef) => {
        console.log("GET_products", "Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async updateCustomerById(_, { customerId, updatedData }) {
    await customersCollection
      .doc(customerId)
      .set(updatedData, { merge: true })
      .then(() => {});
  },

  async deleteCustomer({ commit }, deletedCustomer) {
    await customersCollection
      .doc(deletedCustomer.id)
      .delete()
      .then(() => {
        commit("SET_Notification", {
          message: "Customer is successfully Deleted",
          isActive: true,
          isLoading: false,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },

  async fetchCustomerList({ commit }) {
    await customersCollection.get().then((querySnapshot) => {
      const customerList = [];

      querySnapshot.forEach((doc) => {
        const customer = doc.data();

        customer.id = doc.id;
        customerList.push(customer);
      });
      commit("SET_Customers", customerList);
    });
  },

  async updateSupplierById(_, { supplierId, updatedData }) {
    // console.log(supplierId);
    // console.log("updated data", updatedData);
    await suppliersCollection
      .doc(supplierId)
      .set(updatedData, { merge: true })
      .then(() => {});
  },

  async fetchSupplierList({ commit }) {
    await suppliersCollection.get().then((querySnapshot) => {
      const supplierList = [];

      querySnapshot.forEach((doc) => {
        const supplier = doc.data();
        supplier.id = doc.id;
        supplierList.push(supplier);
      });

      commit("SET_Suppliers", supplierList);
    });
  },

  async deleteSupplier({ commit }, deletedSupplier) {
    await suppliersCollection
      .doc(deletedSupplier.id)
      .delete()
      .then(() => {
        commit("SET_Notification", {
          message: "Customer is successfully Deleted",
          isActive: true,
          isLoading: false,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },

  async addProductToSupplier(_, payload) {
    await suppliersCollection.doc(payload.supplierId).update({
      products: firebase.firestore.FieldValue.arrayUnion(payload.productId),
    });
  },
};

export default actions;
