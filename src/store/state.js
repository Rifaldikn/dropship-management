let state = {
  app: {
    notificationModal: {
      color: "",
      message: "Please Wait...",
      img: "",
      isActive: false,
      isLoading: false,
    },
  },
  products: {
    productList: [],
  },
  home: {
    dashboardInfo: {
      totalSales: {
        label: "Total Sales",
        value: 0,
        path: "/home",
      },
      profit: {
        label: "Profit",
        value: 0,
        path: "/",
      },
      newOrders: {
        label: "New Orders",
        value: 0,
        path: "/",
      },
      products: {
        label: "Products",
        value: 0,
        path: "/",
      },
      customers: {
        label: "Customers",
        value: 0,
        path: "/",
      },
    },
  },
  order: {
    orderList: [],
  },
  profile: {},
  store: {
    supplier: {
      supplierList: [],
    },
    customers: {
      customerList: [],
    },
  },
};

export default state;
