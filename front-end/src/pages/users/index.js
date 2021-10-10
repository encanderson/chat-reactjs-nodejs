import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid } from "@material-ui/core";

import MainCard from "@src/components/cards/MainCard";
import Searchbar from "./Search";
import Users from "./Users";

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    left: 0,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SearchSection = () => {
  const classes = useStyles();

  const [contacts, setContacts] = React.useState([]);

  let usersResult = "";
  if (contacts) {
    usersResult = contacts.map((item, index) => {
      return (
        <Grid item xs={12} ml={"28px"} key={index}>
          <Users item={item} />
        </Grid>
      );
    });
  }

  return (
    <div className={classes.root}>
      <MainCard title="Pesquisar usuários">
        <Searchbar setContacts={setContacts} />
      </MainCard>
      <Divider />
      <Grid container direction="row" mt={"20px"} spacing={1}>
        {usersResult}
      </Grid>
    </div>
  );
};

export default SearchSection;
