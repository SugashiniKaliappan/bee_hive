
export const ROUTES = [
  {
    url: "/api/v1/wardadmissions",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:5001",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/patient",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:5002",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/labtreatment",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:5003",
      changeOrigin: true,
    },
  },
];

