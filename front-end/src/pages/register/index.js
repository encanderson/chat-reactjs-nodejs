import React from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@material-ui/core";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

// project imports
import AuthWrapper1 from "@src/pages/auth/AuthWrapper1";
import AuthCardWrapper from "@src/pages/auth/AuthCardWrapper";
import JWTRegister from "./Form";
// import AuthFooter from "@src/components/cards/AuthFooter";

// assets
// import logo from '@src/assets/images/logo.svg';
// import logoDark from '@src/assets/images/logo-dark.svg';

//===============================|| AUTH3 - REGISTER ||===============================//

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AuthWrapper1>
      <Grid
        container
        justifyContent={matchDownSM ? "center" : "space-between"}
        alignItems="flex-start"
      >
        <Grid item xs={12} sx={{ minHeight: "100vh", height: "100%" }}>
          <Grid
            sx={{
              minHeight: "100vh",
              height: "100%",
              p: matchDownSM ? 0 : "0 80px",
            }}
            container
            direction="column"
            alignItems={matchDownSM ? "center" : "flex-start"}
            spacing={matchDownSM ? 3 : 6}
            justifyContent={matchDownSM ? "center" : "space-between"}
          >
            <Grid item xs={12}></Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    {/* <RouterLink to="#">
                                            <img alt="Auth method" src={theme.palette.mode === 'dark' ? logoDark : logo} width="100" />
                                        </RouterLink> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Registre-se
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : ""}
                          >
                            E faça parte da nossa Comunidade
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <JWTRegister />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        component={RouterLink}
                        to="/login"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Já tem uma conta?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
            {/* <AuthFooter /> */}
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
