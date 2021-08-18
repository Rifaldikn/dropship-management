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
    email: "rifaldikn@gmail.com",
    id: "dawjfiwakdokak",
    name: "Calica Store",
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
      // products: {
      //   label: "Products",
      //   value: 0,
      //   path: "/products",
      // },
      // customers: {
      //   label: "Customers",
      //   value: 0,
      //   path: "/store",
      // },
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
