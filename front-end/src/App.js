// import React from "react";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@material-ui/core/styles";
import {
  CssBaseline,
  StyledEngineProvider,
  Typography,
} from "@material-ui/core";

import theme from "@src/themes";
import NavigationScroll from "@src/layout/NavigationScroll";
import Snackbar from "@src/components/extended/Snackbar";

import { JWTProvider } from "@src/contexts/JWTContext";

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline>
          <NavigationScroll>
            <JWTProvider>
              <Typography>Hello world!</Typography>
              <Snackbar />
            </JWTProvider>
          </NavigationScroll>
        </CssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
