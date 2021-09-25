import React from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Grid, Button } from "@material-ui/core";

// project imports
import { gridSpacing } from "@src/store/constant";

// assets
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import InstagramIcon from "@material-ui/icons/Instagram";

// import logoDark from "@src/assets/images/logo-white.svg";

// style constant
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "35px 0",
    color: "#fff",
    background: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  footerLink: {
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none !important",
    opacity: "0.8",
    "& svg": {
      fontsize: "18px",
      marginRight: "8px",
    },
    "&:hover": {
      opacity: "1",
    },
  },
  footerSub: {
    padding: "20px 0",
    color: "#fff",
    background: theme.palette.secondary.dark,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));
//==============================|| LANDING - FOOTER PAGE ||==============================//

const FooterPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.footer}>
        <Container>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              {/* <img src={logoDark} alt="OriSistem" width="100" /> */}
              <Button color="inherit" component={RouterLink} to="/contato">
                Contato
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/politica-de-privacidade"
              >
                Política de Privacidade
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/termos-de-uso"
              >
                Termos de Uso
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                alignItems="center"
                spacing={2}
                sx={{
                  justifyContent: "flex-end",
                  [theme.breakpoints.down("sm")]: { justifyContent: "center" },
                }}
              >
                {/* TODO - Social Media */}
                {/* <Grid item>
                  <Link href="" target="_blank" className={classes.footerLink}>
                    <InstagramIcon />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="" target="_blank" className={classes.footerLink}>
                    <FacebookIcon />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="" target="_blank" className={classes.footerLink}>
                    <TwitterIcon />
                  </Link>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FooterPage;
