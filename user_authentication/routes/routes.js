
export const ROUTES = [
  {
    url: "/api/v1/wardadmissions",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:6001",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/patient",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:6002",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/labtreatment",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:6003",
      changeOrigin: true,
    },
  },
];

