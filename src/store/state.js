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
  user: {
    email: "",
    id: "",
    name: "",
    location: "",
    storeLink: "",
    imgURL: "",
  },
  products: {
    productList: [],
  },
  home: {
    dashboardInfo: {
      totalSales: {
        label: "Total Sales",
        value: 0,
        path: "/",
      },
      profit: {
        label: "Profit",
        value: 0,
        path: "/orders",
      },
      newOrders: {
        label: "New Orders",
        value: 0,
        path: "/orders",
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
  sales: {},
};

export default state;
