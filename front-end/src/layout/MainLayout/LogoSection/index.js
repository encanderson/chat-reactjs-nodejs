import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@material-ui/core";

// project imports
import config from "@src/config";

// assets
import logo from "@src/assets/images/logo.svg";
import logoDark from "@src/assets/images/logo-dark.svg";

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
      <img
        src={customization.navType === "dark" ? logoDark : logo}
        alt="Berry"
        width="100"
      />
    </ButtonBase>
  );
};

export default LogoSection;
