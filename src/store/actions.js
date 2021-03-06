import firebase from "firebase/app";

import {
  storage,
  productsCollection,
  suppliersCollection,
  customersCollection,
  ordersCollection,
  salesCollenction,
  usersCollenction,
} from "../plugins/firebase.js";

import { nanoid } from "nanoid";

const actions = {
  /**
   *
   * User Actions
   *
   */

  async registerUser({ commit }, userAccount) {
    console.group("userAccount- registerUser", userAccount);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userAccount.email, userAccount.password)
      .then((userCredential) => {
        console.log(userCredential);

        let user = {
          id: userCredential.user.uid,
          name: userAccount.name,
          email: userAccount.email,
        };

        usersCollenction
          .doc(user.id)
          .set(user)
          .catch((error) => {
            console.error("Error updating document: ", error);
          });

        commit("SET_User", user);

        commit("SET_Notification", {
          message: "Account Created",
          isActive: true,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 5000);
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        commit("SET_Notification", {
          message: errorMessage,
          isActive: true,
          img: "error",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 5000);
      });
  },

  async signInuser({ dispatch }, { email, password }) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userId = userCredential.user.uid;
        console.log("userId - signInuser", userId);
        dispatch("fetchUserData", userId);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({
          errorCode,
          errorMessage,
        });
      });

    this.$store.dispatch("fetchCustomerList");
    this.$store.dispatch("fetchSupplierList");
    this.$store.dispatch("fetchOrdersProduct");
    this.$store.dispatch("fetchProductListItems");
    this.$store.dispatch("fetchSalesData");
  },

  async fetchUserData({ commit }, userId) {
    await usersCollenction
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          commit("SET_User", doc.data());

          console.log("Document data:", doc.data());
        }
      });
  },

  async addUserProfilePicture({ dispatch, commit }, { userId, imgData }) {
    console.log("addUserProfilePicture - imgData", imgData);

    if (imgData) {
      let isUploaded = await dispatch("uploadImageBlob", imgData);

      console.log("addUserProfilePicture - isUploaded", isUploaded);

      if (isUploaded) {
        dispatch("updateUserData", {
          userId,
          userData: {
            imgURL: isUploaded,
          },
        });

        commit("SET_User", { imgURL: isUploaded });

        commit("SET_Notification", {
          message: "Image Uploaded",
          isActive: true,
          isLoading: false,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      } else {
        commit("SET_User", { imgURL: "" });
      }
    }
  },

  async updateUserData({ commit }, { userId, userData }) {
    console.log("updateUserData - userId", userId);

    console.log("updateUserData - userData", userData);

    await usersCollenction.doc(userId).set(userData, { merge: true });

    commit("SET_User", userData);

    commit("SET_Notification", {
      message: "Store link is successfully Added",
      isActive: true,
      isLoading: false,
      img: "success",
    });

    setTimeout(() => {
      commit("SET_Notification", {
        isActive: false,
      });
    }, 2000);
  },

  /**
   *
   * Sales Actions
   *
   */
  async fetchSalesData({ commit }) {
    await salesCollenction.get().then((doc) => {
      commit("SET_SalesData", doc.data);
    });
  },

  /**
   *
   * Home Actions
   *
   */
  async fetchDashboard({ commit }) {
    await commit("SET_DashboardData");
  },

  /**
   *
   * Order Actions
   *
   */

  async confirmCompleted({ commit, getters }, payload) {
    const date = firebase.firestore.FieldValue.serverTimestamp();

    await ordersCollection
      .doc(payload.orderId)
      .set(
        {
          updatedAt: date,
          status: "Done",
          statusDetails: { done: { date: date, done: true } },
        },
        { merge: true }
      )
      .then(() => {
        commit("UPDATE_Order", {
          orderId: payload.orderId,
          orderData: {
            updatedAt: Date.now(),
            status: "Done",
            statusDetails: { done: { date: Date.now(), done: true } },
          },
        });
        commit("SET_Notification", {
          message: "Order is Updated to Completed",
          isActive: true,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    const userId = getters.userData;

    console.log("Payload - confirmCompleted ACTION", payload);
    console.log("user Id", userId);

    await salesCollenction.doc(userId.id).set({
      updatedAt: date,
      totalSales: payload.completedSales.totalProductCount,
      totalProfit: payload.completedSales.totalProfit,
      recentOrder: payload.orderDetail,
    });
  },

  async confirmToOrder({ commit }, orderId) {
    const date = firebase.firestore.FieldValue.serverTimestamp();

    await ordersCollection
      .doc(orderId)
      .set(
        {
          updatedAt: date,
          status: "Packing",
          statusDetails: { packing: { date: date, done: true } },
        },
        { merge: true }
      )
      .then(() => {
        commit("UPDATE_Order", {
          orderId,
          orderData: {
            updatedAt: Date.now(),
            status: "Packing",
            statusDetails: { packing: { date: Date.now(), done: true } },
          },
        });
        commit("SET_Notification", {
          message: "Order is Updated to Packing",
          isActive: true,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  },

  async inputOrderDeliveryInformation({ dispatch, commit }, payload) {
    const date = firebase.firestore.FieldValue.serverTimestamp();

    await ordersCollection
      .doc(payload.orderId)
      .set(
        {
          delivery: payload.delivery,
          status: "Shipping",
          updatedAt: date,
          statusDetails: { shipping: { date: date, done: true } },
        },
        { merge: true }
      )
      .then(() => {
        dispatch("confirmOrderShipped", payload.orderId);
        commit("UPDATE_Order", {
          orderId: payload.orderId,
          orderData: {
            updatedAt: Date.now(),
            status: "Shipping",
            statusDetails: { shipping: { date: Date.now(), done: true } },
            delivery: payload.delivery,
          },
        });
        commit("SET_Notification", {
          message: "Order is Updated to Shipping",
          isActive: true,
          img: "success",
        });

        setTimeout(() => {
          commit("SET_Notification", {
            isActive: false,
          });
        }, 2000);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  },

  async addNewOrder({ commit, getters }, orderForm) {
    let orderId = orderForm.id;
    const userId = getters.userData.id;

    const date = firebase.firestore.Timestamp.fromDate(new Date());

    let orderData = {
      userId,
      customer: {
        id: orderForm.customer.value.id,
        name: orderForm.customer.value.name,
        address: orderForm.customer.value.address,
        phone: orderForm.customer.value.phone,
      },
      delivery: {
        courierDelivery: "",
        awb: "",
      },
      statusDetails: {
        toOrder: {
          label: "To Order",
          date: date,
          done: true,
        },

        packing: {
          label: "Packing",
          date: "",
          done: false,
        },
        shipping: {
          label: "Shipping",
          date: "",
          done: false,
        },
        done: {
          label: "Done",
          date: "",
          done: false,
        },
      },
      createdAt: date,
      updatedAt: date,
      products: orderForm.products.value,
      totalPrice: orderForm.totalPrice,
      totalCost: orderForm.totalCost,
      status: "To Order",
    };

    if (!orderId) orderId = nanoid(7);

    // Save new order to firestore
    await ordersCollection
      .doc(orderId)
      .set(orderData)
      .then((docRef) => {
        orderData.id = docRef.id;

        commit("SET_Orders", orderId);
      });

    // Update customer order list
    await customersCollection
      .doc(orderData.customer.id)
      .update({
        orderItems: firebase.firestore.FieldValue.arrayUnion(orderId),
      })
      .then(() => {
        commit("SET_OrderToCustomer", orderId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    // Add new order to vuex state

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

  async fetchOrdersProduct({ commit, getters }) {
    const userId = getters.userData.id;

    await ordersCollection
      .where("userId", "==", userId)
      .get()

      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const order = doc.data();

          order.id = doc.id;
          commit("SET_Orders", order);
        });
      });
  },

  /**
   *
   * Product Actions
   *
   */

  async addProduct({ dispatch, commit, getters }, { productData, imgData }) {
    const userId = getters.userData.id;

    productData.userId = userId;

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
      .then((docRef) => {
        dispatch("addProductToSupplier", {
          supplierId: productData.supplier_id,
          productId: docRef.id,
        });

        productData.id = docRef.id;
        commit("SET_products", productData);

        commit("SET_Notification", {
          message: "Product is Successfully Added",
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
        console.error("Error adding document: ", error);
      });
  },

  async updateProductById({ commit }, { productId, updatedData }) {
    await productsCollection
      .doc(productId)
      .set(updatedData, { merge: true })
      .then(() => {
        commit("UPDATE_Product", {
          productId,
          productData: updatedData,
        });
      });
  },

  async fetchProductListItems({ commit, getters }) {
    const userId = getters.userData.id;

    await productsCollection
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const product = doc.data();

          product.id = doc.id;
          commit("SET_products", product);
        });
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

  async addSupplier({ commit, getters }, supplierData) {
    const userId = getters.userData.id;

    supplierData.products = [];
    supplierData.userId = userId;

    await suppliersCollection
      .add(supplierData)
      .then((docRef) => {
        supplierData.id = docRef.id;
        console.log("docRef.id - addSupplier", docRef.id);
        commit("SET_Suppliers", supplierData);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async addCustomer({ commit, getters }, customerData) {
    customerData.orderItems = [];

    const userId = getters.userData.id;

    customerData.userId = userId;

    await customersCollection
      .add(customerData)
      .then((docRef) => {
        console.log("GET_products", "Document written with ID: ", docRef.id);
        customerData.id = docRef.id;
        commit("SET_Customers", customerData);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },

  async updateCustomerById({ commit }, { customerId, updatedData }) {
    await customersCollection
      .doc(customerId)
      .set(updatedData, { merge: true })
      .then(() => {
        commit("UPDATE_Customer", { customerId, updatedData });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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

  async fetchCustomerList({ commit, getters }) {
    const userId = getters.userData.id;
    await customersCollection
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const customer = doc.data();

          customer.id = doc.id;
          commit("SET_Customers", customer);
        });
      });
  },

  async updateSupplierById({ commit }, { supplierId, updatedData }) {
    await suppliersCollection
      .doc(supplierId)
      .set(updatedData, { merge: true })
      .then(() => {
        commit("UPDATE_Supplier", { updatedData, supplierId });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },

  async fetchSupplierList({ commit, getters }) {
    const userId = getters.userData.id;

    await suppliersCollection
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const supplier = doc.data();
          supplier.id = doc.id;

          commit("SET_Suppliers", supplier);
        });
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

  async addProductToSupplier({ commit }, payload) {
    const supplierId = payload.supplierId;
    const productId = payload.productId;

    await suppliersCollection
      .doc(supplierId)
      .update({
        products: firebase.firestore.FieldValue.arrayUnion(productId),
      })
      .then(() => {
        commit("SET_ProductToSupplier", { supplierId, productId });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  },
};

export default actions;
