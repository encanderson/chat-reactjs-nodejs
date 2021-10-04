import React from "react";
// import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, TextField } from "@material-ui/core";
// import CheckIcon from "@material-ui/icons/Check";

import { gridSpacing } from "@src/store/constant";
// import { searchUsers } from "@src/api/chat";
// import { SNACKBAR_OPEN } from "@src/store/actions";

// assets
import { IconSearch } from "@tabler/icons";

// style constant
const useStyles = makeStyles((theme) => ({
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.secondary.light,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
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
  grid: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const SearchBar = ({ setContacts }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");
  const handleSearch = async () => {
    console.log(search);
    // const response = await searchUsers({
    //   city: city,
    //   search: search,
    // });
    // if (response.status) {
    //   setContacts(response.data);
    //   setCity(null);
    // } else {
    //   setContacts([]);
    //   dispatch({
    //     type: SNACKBAR_OPEN,
    //     open: true,
    //     message: response.message,
    //     variant: "alert",
    //     anchorOrigin: { vertical: "top", horizontal: "center" },
    //     alertSeverity: "error",
    //     close: true,
    //   });
    // }
  };

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        spacing={gridSpacing}
        className={classes.grid}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nome do usuário"
            autoComplete="nope"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<IconSearch />}
            onClick={handleSearch}
          >
            Pesquisar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchBar;
