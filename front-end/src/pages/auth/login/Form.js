import React from "react";
import { Link, useHistory } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

// project imports
import useScriptRef from "@src/hooks/useScriptRef";
import { userSignIn } from "@src/api/auth";
import { SNACKBAR_OPEN } from "@src/store/actions";
import Loader from "@src/components/Loader";
import useAuth from "@src/hooks/useAuth";

// assets
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// style constant
const useStyles = makeStyles((theme) => ({
  loginInput: {
    ...theme.typography.customInput,
  },
}));

//===============================|| JWT LOGIN ||===============================//

const LoginForm = (props, { ...others }) => {
  const classes = useStyles();
  const scriptedRef = useScriptRef();

  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const [isInitialized, setInitialized] = React.useState(false);

  const { orisistemSingIn } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async (email, password) => {
    setInitialized(true);
    const response = await userSignIn({ email: email, password: password });
    if (response.status) {
      orisistemSingIn(response);
      history.push("/redirect");
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: response.message,
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "error",
        close: false,
      });
      setInitialized(false);
      history.push("/login");
    }
  };

  if (isInitialized) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required("O email é obrigatório!"),
        password: Yup.string().max(255).required("Digite sua senha!"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await handleSignIn(values.email, values.password);

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            className={classes.loginInput}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              fullWidth
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-email--register">
                {" "}
                {errors.email}{" "}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            className={classes.loginInput}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              label="Senha"
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {" "}
                {errors.password}{" "}
              </FormHelperText>
            )}
          </FormControl>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Contnuar conectado"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component={Link}
                to="/recuperar-senha"
                color="secondary"
                sx={{ textDecoration: "none" }}
              >
                Esqueceu a senha?
              </Typography>
            </Grid>
          </Grid>

          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
