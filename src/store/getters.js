const getters = {
  notificationModal: (state) => state.app.notificationModal,
  dashboardData: (state) => state.home.dashboardInfo,
  allCustomers: (state) => state.store.customers.customerList,
  allProducts: (state) => state.products.productList,
  allSuppliers: (state) => state.store.supplier.supplierList,
  allOrders: (state) => state.order.orderList,

  getSupplierById: (_, getters) => (id) => {
    let supplierList = getters.allSuppliers;

    let selectedSupplier = supplierList.find((supplier) => supplier.id == id);

    return selectedSupplier;
  },
  getOrderById: (_, getters) => (id) => {
    let orderList = getters.allOrders;

    let selectedOrder = orderList.find((order) => order.id == id);

    return selectedOrder;
  },

  getProductById: (_, getters) => (id) => {
    let products = getters.allProducts;

    let selectedProduct = products.find((product) => product.id == id);

    return selectedProduct;
  },
  getProductsBySupplierId: (_, getters) => (id) => {
    let products = getters.allProducts;

    let selectedProduct = products.filter(
      (product) => product.supplier_id == id
    );

    return selectedProduct;
  },
  getCustomerById: (_, getters) => (id) => {
    let customerList = getters.allCustomers;

    let selectedCustomer = customerList.find((customer) => customer.id == id);

    return selectedCustomer;
  },
  productList: (state, getters) => {
    let productList = getters.allProducts;
    let supplierList = getters.allSuppliers;

    let newProductList = [];

    if (productList.length > 0 && supplierList.length > 0) {
      productList.forEach((product) => {
        let selectedSupplier = supplierList.find(
          (supplier) => supplier.id == product.supplier_id
        );

        // console.log(selectedSupplier);

        newProductList.push(
          Object.assign(
            {
              supplier_name: selectedSupplier.name,
              supplier_location: selectedSupplier.location,
              supplier_platform: selectedSupplier.platform,
            },
            { ...product }
          )
        );
      });
    }

    return newProductList;
  },
};

export default getters;
