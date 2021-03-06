import _ from "lodash";

const mutations = {
  SET_products(state, payload) {
    state.products.productList = _.unionBy(
      state.products.productList,
      [payload],
      "id"
    );
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

      const updatedData = _.merge(
        products[selectedProduct],
        payload.productData
      );

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
    state.store.supplier.supplierList = _.unionBy(
      state.store.supplier.supplierList,
      [payload],
      "id"
    );
  },

  UPDATE_Supplier(state, payload) {
    let suppliers = state.store.supplier.supplierList;

    let selectedSupplier = suppliers.findIndex(
      (supplier) => supplier.id == payload.supplierId
    );
    console.log("New Supplier Data - UPDATE_Supplier", payload.updatedData);
    console.log("Selected Supplier - UPDATE_Supplier", selectedSupplier);

    if (selectedSupplier != -1) {
      const supplierData = _.merge(
        suppliers[selectedSupplier],
        payload.updatedData
      );

      console.log("Updated Supplier Data - UPDATE_Supplier", supplierData);
      suppliers[selectedSupplier] = supplierData;
    }
  },

  SET_Orders(state, payload) {
    state.order.orderList = _.unionBy(state.order.orderList, [payload], "id");
  },

  UPDATE_Order(state, payload) {
    let orders = state.order.orderList;

    let selectedOrder = orders.findIndex(
      (order) => order.id == payload.orderId
    );
    console.log("Selected Order - UPDATE_Order", selectedOrder);
    console.log("Update Data - UPDATE_Order", payload.productData);

    if (selectedOrder != -1) {
      const updatedOrder = _.merge(orders[selectedOrder], payload.orderData);

      orders[selectedOrder] = updatedOrder;

      console.log("Updated Order - SET_Order", updatedOrder);
    }
  },

  SET_DashboardData(state) {
    state.home.dashboardInfo.totalSales.value = state.order.orderList.length;
  },

  SET_SalesData(state, payload) {
    state.sales.orderList = _.unionBy(state.sales.orderList, [payload], "id");
  },

  SET_Customers(state, payload) {
    state.store.customers.customerList = _.unionBy(
      state.store.customers.customerList,
      [payload],
      "id"
    );
  },

  UPDATE_Customer(state, payload) {
    let customers = state.store.customers.customerList;

    let selectedCustomer = customers.findIndex(
      (customer) => customer.id == payload.customerId
    );

    if (selectedCustomer != -1) {
      const customerData = (customers[selectedCustomer] = _.merge(
        customers[selectedCustomer],
        payload.updatedData
      ));

      customers[selectedCustomer] = customerData;

      console.log("Updated Supplier Data - UPDATE_Supplier", customerData);
    }
  },

  SET_Notification(state, payload) {
    state.app.notificationModal = _.merge(state.app.notificationModal, payload);
  },

  SET_User(state, payload) {
    state.user = _.merge(state.user, payload);
  },
};

export default mutations;
