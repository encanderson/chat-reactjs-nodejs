import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles, useTheme } from "@material-ui/styles";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";

// project imports
import { gridSpacing } from "@src/store/constant";

// assets
import { IconUserCheck } from "@tabler/icons";

// style constant
const useStyles = makeStyles((theme) => ({
  followerBlock: {
    padding: "15px 0",
    borderBottom: "1px solid",
    borderTop: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? `${theme.palette.dark.main} !important`
        : `${theme.palette.grey[100]} !important`,
  },
  profileAvatar: {
    width: "40px",
    height: "40px",
  },
}));

// ===========================|| USER CONTACT LIST ||=========================== //

const Users = ({ item }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.followerBlock}>
      <Grid container alignItems="center" spacing={gridSpacing}>
        <Grid item xs={12} sm={6} style={{ cursor: "pointer" }}>
          <Grid
            container
            alignItems="center"
            spacing={gridSpacing}
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="div">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">{item.username}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={1}
            sx={{
              justifyContent: "flex-end",
              [theme.breakpoints.down("sm")]: { justifyContent: "flex-start" },
            }}
          >
            <Grid item>
              <Tooltip placement="top" title="Message">
                <Button
                  variant="outlined"
                  sx={{ minWidth: "32px", height: "32px", p: 0 }}
                >
                  <IconUserCheck fontSize="small" />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Users.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
};

export default Users;
