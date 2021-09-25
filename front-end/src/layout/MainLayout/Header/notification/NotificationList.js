import React from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

// style constant
const useStyles = makeStyles((theme) => ({
  navContainer: {
    width: "250px",
    maxWidth: "330px",
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px",
    },
  },
  listAction: {
    top: "22px",
  },
  actionColor: {
    color: theme.palette.grey[500],
  },

  listItem: {
    padding: 0,
  },
  listDivider: {
    marginTop: 0,
    marginBottom: 0,
  },
  listChipError: {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.orange.light,
    height: "24px",
    padding: "0 6px",
    marginRight: "5px",
  },
  paddingBottom: {
    paddingBottom: "16px",
  },
  itemAction: {
    cursor: "pointer",
    padding: "16px",
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.dark.main
          : theme.palette.primary.light,
    },
  },
}));

//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const NotificationList = ({ handleClose }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const history = useHistory();

  const notifications = [];

  return (
    <List className={classes.navContainer}>
      {notifications.length > 0 ? (
        notifications.map((item, index) => (
          <div key={index} className={classes.itemAction}>
            <ListItem alignItems="center" className={classes.listItem}>
              <Grid container spacing={1}>
                <ListItem button>
                  <Grid item xs={12} sm={12}>
                    <ListItemAvatar>
                      <Avatar
                        alt={item.name}
                        src={`data:image/png;base64,${item.avatar}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">{item.name}</Typography>
                      }
                    />
                  </Grid>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={12}>
                <ListItemSecondaryAction className={classes.listAction}>
                  <ListItem button>
                    <Grid container justifyContent="flex-end">
                      <Grid item xs={12}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          className={classes.actionColor}
                        >
                          {item.day} - {item.hour}h
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </ListItemSecondaryAction>
              </Grid>
            </ListItem>
          </div>
        ))
      ) : (
        <div>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <Chip
                  label="Sem novas mensagens!"
                  className={classes.listChipError}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </List>
  );
};

export default NotificationList;
