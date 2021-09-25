import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// material-ui
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  Paper,
  Popper,
  useMediaQuery,
} from "@material-ui/core";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// assets
import { IconBell, IconBellRinging } from "@tabler/icons";

// project imports
import MainCard from "@src/components/cards/MainCard";
import NotificationList from "./NotificationList";

// style constant
const useStyles = makeStyles((theme) => ({
  ScrollHeight: {
    height: "100%",
    maxHeight: "calc(100vh - 205px)",
    overflowX: "hidden",
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: "all .2s ease-in-out",
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.secondary.light,
    // color:
    //   theme.palette.mode === "dark"
    //     ? theme.palette.warning.dark
    //     : theme.palette.secondary.dark,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.warning.dark
          : theme.palette.secondary.dark,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.secondary.light,
    },
  },
  cardContent: {
    padding: "0px !important",
    marginBottom: "20px",
  },
  divider: {
    marginTop: 0,
    marginBottom: 0,
  },
  paddingBottom: {
    paddingBottom: "16px",
  },
  box: {
    marginLeft: "16px",
    marginRight: "24px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "16px",
    },
  },
}));

//-----------------------|| NOTIFICATION ||-----------------------//

const NotificationSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const _isMounted = React.useRef(true);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.accounts.user);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setColor(theme.palette.warning.dark);
    setIcon(<IconBell stroke={1.5} size="1.3rem" />);
    // dispatch({
    //   type: CLEAR_NOTIFICATIONS,
    // });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  //-----------------------|| NOTIFICATION - STATE ||-----------------------//

  const [color, setColor] = React.useState(theme.palette.warning.dark);
  const [icon, setIcon] = React.useState(
    <IconBell stroke={1.5} size="1.3rem" />
  );

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;

    if (_isMounted.current) {
      setColor("red");
      setIcon(<IconBellRinging stroke={1.5} size="1.3rem" />);
      setTimeout(() => {}, 10);
    }
    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [dispatch, user, open]);

  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar
            style={{
              color:
                theme.palette.mode === "dark"
                  ? color
                  : theme.palette.secondary.dark,
            }}
            variant="rounded"
            className={classes.headerAvatar}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            {icon}
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <CardContent className={classes.cardContent}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <PerfectScrollbar className={classes.ScrollHeight}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item xs={12} p={0}>
                              <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12}>
                              <NotificationList handleClose={setOpen} />
                            </Grid>
                          </Grid>
                        </PerfectScrollbar>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default NotificationSection;
