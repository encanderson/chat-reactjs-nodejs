const config = {
  basename: "",
  defaultPath: "/",
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
};

export default config;
