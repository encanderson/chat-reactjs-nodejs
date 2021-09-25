const config = {
  basename: "",
  defaultPath: "/chat",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: "dark",
  i18n: "en",
  rtlLayout: false,
  jwt: {
    secret: process.env.REACT_APP_SECRET_KEY,
    timeout: "1 days",
  },
  home: "http://localhost:2000/login",
  baseUrl: "http://localhost:3000",
};

export default config;
