import React from "react";

import { useTheme } from "@material-ui/styles";
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Card,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import ReCAPTCHA from "react-google-recaptcha";

import MainCard from "@src/components/cards/MainCard";

import { gridSpacing } from "@src/store/constant";

const ModalBody = React.forwardRef(
  ({ modalStyle, classes, handleClose }, ref) => {
    const theme = useTheme();

    const handleOnChange = () => {};

    return (
      <div ref={ref} tabIndex={-1}>
        <MainCard
          style={modalStyle}
          className={classes.paper}
          title={"Dados para Contato"}
          content={false}
          secondary={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        >
          <CardContent>
            <Grid item xs={12} sm={12}>
              <Card sx={{ mb: "5px" }} elevation={4}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput type="text" label="Nome" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Email Address</InputLabel>
                        <OutlinedInput type="text" label="Email" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <TextField
                          id="outlined-multiline-static1"
                          placeholder="Message"
                          multiline
                          fullWidth
                          rows={5}
                          defaultValue=""
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              item
              xs={12}
              container
              spacing={1}
              style={{ justifyContent: "space-between" }}
            >
              <Grid>
                <ReCAPTCHA
                  sitekey="6LdzqbcaAAAAALrGEZWQHIHUhzJZc8O-KSTdTTh_"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    justifyContent: "flex-end",
                  },
                }}
              >
                <Button variant="contained" color="primary">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </div>
    );
  }
);

export default ModalBody;
