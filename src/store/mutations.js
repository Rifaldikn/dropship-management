import _ from "lodash";

const mutations = {
  SET_products(state, payload) {
    state.products.productList.push(payload);
  },

  SET_ProductToSupplier(state, payload) {
    let selectedSupplier = state.store.supplier.supplierList.findIndex(
      (supplier) => supplier.id == payload.supplierId
    );

    console.log(selectedSupplier);

    if (selectedSupplier) {
      state.store.supplier.supplierList[selectedSupplier].push(
        payload.productId
      );
    }
  },

  UPDATE_Product(state, payload) {
    let products = state.products.productList;

    let selectedProduct = products.findIndex(
      (product) => product.id == payload.productId
    );

    if (selectedProduct) {
      console.log("Updated Product : ", payload.productData);
      console.log("Selected Product", products[selectedProduct]);

      // using lodash to update and merge nested update
      const updatedData = (products[selectedProduct] = _.merge(
        products[selectedProduct],
        payload.productData
      ));

      products[selectedProduct] = updatedData;

      console.log("Updated Product - SET_Product", updatedData);
    }
  },

  SET_OrderToCustomer(state, payload) {
    let cutomers = state.store.customers.customerList;
    let selectedCustomer = cutomers.findIndex(
      (product) => product.id == payload.productId
    );
    if (selectedCustomer) {
      cutomers[selectedCustomer].orderItems.push(payload.orderId);
    }
  },

  SET_Suppliers(state, payload) {
    state.store.supplier.supplierList.push(payload);
  },

  UPDATE_Supplier(state, payload) {
    let suppliers = state.store.supplier.supplierList;

    let selectedSupplier = suppliers.findIndex(
      (supplier) => supplier.id == payload.supplierId
    );

    if (selectedSupplier) {
      Object.assign(suppliers[selectedSupplier], payload.supplierData);
    }
  },

  SET_Orders(state, payload) {
    state.order.orderList.push(payload);
  },

  UPDATE_Order(state, payload) {
    let orders = state.order.orderList;

    let selectedOrder = orders.findIndex(
      (order) => order.id == payload.orderId
    );
    console.log("Selected Order - UPDATE_Order", selectedOrder);
    console.log("Update Data - UPDATE_Order", payload.productData);

    if (selectedOrder) {
      const updatedOrder = _.merge(orders[selectedOrder], payload.orderData);

      orders[selectedOrder] = updatedOrder;

      console.log("Updated Order - SET_Order", updatedOrder);
    }
  },

  SET_DashboardData(state) {
    // state.home.dashboardInfo.products.value = state.products.productList.length;
    state.home.dashboardInfo.totalSales.value = state.order.orderList.length;
    // state.home.dashboardInfo.newOrders = this.
    // state.home.dashboardInfo.customers.value = state.store.customers.customerList.length;
  },

  SET_SalesData(state, payload) {
    state.sales.orderList = payload;
  },

  SET_Customers(state, payload) {
    state.store.customers.customerList.push(payload);
  },

  UPDATE_Customer(state, payload) {
    let customers = state.store.customers.customerList;

    let selectedCustomer = customers.findIndex(
      (customer) => customer.id == payload.customerId
    );

    if (selectedCustomer) {
      Object.assign(customers[selectedCustomer], payload.customerData);
    }
  },

  SET_Notification(state, payload) {
    Object.assign(state.app.notificationModal, payload);
  },

  SET_User(state, payload) {
    state.user = payload;
  },
};

export default mutations;
