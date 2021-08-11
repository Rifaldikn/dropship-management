const mutations = {
  SET_products(state, payload) {
    state.products.productList = payload;
  },
  SET_Suppliers(state, payload) {
    state.store.supplier.supplierList = payload;
  },
  SET_Orders(state, payload) {
    state.order.orderList = payload;
  },
  SET_DashboardData(state) {
    state.home.dashboardInfo.products.value =
      state.customer.customerList.length;

    state.home.dashboardInfo.products.value = state.products.productList.length;
  },
  SET_Customers(state, payload) {
    state.store.customers.customerList = payload;
  },
  SET_Notification(state, payload) {
    Object.assign(state.app.notificationModal, payload);
  },
};

export default mutations;
