
export const ROUTES = [
  {
    url: "/api/v1/wardadmissions",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/patient",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:3002",
      changeOrigin: true,
    },
  },
  {
    url: "/api/v1/labtreatment",
    auth: true,
    proxy: {
      target: "http://127.0.0.1:3003",
      changeOrigin: true,
    },
  },
];

