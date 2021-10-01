import React from "react";
// import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@material-ui/core";
import { Grid, Stack, Typography, useMediaQuery } from "@material-ui/core";

// project imports
import AuthWrapper1 from "@src/pages/auth/AuthWrapper1";
import AuthCardWrapper from "@src/pages/auth/AuthCardWrapper";
import JWTResetPassword from "./Form";

//============================|| AUTH3 - RESET PASSWORD ||============================//

const ResetPassword = () => {
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
                  <Grid item sx={{ mb: 3 }}>
                    {/* <RouterLink to="#">
                      <img
                        alt="Auth method"
                        src={theme.palette.mode === "dark" ? logoDark : logo}
                        width="100"
                      />
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
                            Reset Password
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : ""}
                          >
                            Por favor, escolha uma nova sencha
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <JWTResetPassword />
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

export default ResetPassword;
