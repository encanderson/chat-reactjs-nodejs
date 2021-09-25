import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, ButtonBase } from "@material-ui/core";

// project imports
// import LogoSection from "../logo";
import ProfileSection from "./profile";
import NotificationSection from "./notification";

// assets
import { IconMenu2 } from "@tabler/icons";

// style constant
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: "all .2s ease-in-out",
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.secondary.light,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.secondary.dark,
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.primary.dark
          : theme.palette.secondary.dark,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.secondary.light,
    },
  },
  boxContainer: {
    width: "228px",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
  },
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* logo & toggler button */}
      <div className={classes.boxContainer}>
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          {/* <LogoSection /> */}
          OriHome
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            className={classes.headerAvatar}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </div>

      <div className={classes.grow} />
      <div className={classes.grow} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />

      {/* mobile header */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {/* <MobileSection /> */}
      </Box>
    </React.Fragment>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
