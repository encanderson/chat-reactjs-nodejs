import React from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@material-ui/core";
import {
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

// project imports
import AuthWrapper1 from "@src/pages/auth/AuthWrapper1";
import AuthCardWrapper from "@src/pages/auth/AuthCardWrapper";
import JWTCodeVerification from "./Form";
import useAuth from "@src/hooks/useAuth";

//===========================|| AUTH3 - CODE VERIFICATION ||===========================//

const CodeVerification = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { verify } = useAuth();

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
            <Grid item></Grid>
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
                  {/* <Grid item sx={{ mb: 3 }}>
                                        <RouterLink to="#">
                                            <img alt="Auth method" src={theme.palette.mode === 'dark' ? logoDark : logo} width="100" />
                                        </RouterLink>
                                    </Grid> */}
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
                            Insira o Código de Verificação
                          </Typography>
                          <Typography variant="subtitle1" fontSize="1rem">
                            Enviado por Email.
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="0.875rem"
                            textAlign={matchDownSM ? "center" : ""}
                          >
                            O código foi enviado para {verify.email}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <JWTCodeVerification />
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
                        to="#"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                        textAlign={matchDownSM ? "center" : ""}
                      >
                        Não recebeu um email? Verifique a caixa de Spam, ou
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      component={RouterLink}
                      to="/recuperar-senha"
                      variant="outlined"
                      color="secondary"
                    >
                      Reinviar Código
                    </Button>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default CodeVerification;
