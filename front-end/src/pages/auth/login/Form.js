import React from "react";
import { Link } from "react-router-dom";

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

// project imports
import useScriptRef from "@src/hooks/useScriptRef";
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
  const [isInitialized, setInitialized] = React.useState(false);

  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async (username, password) => {
    setInitialized(true);
    await login(username, password);
  };

  if (isInitialized) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("O username é obrigatório!"),
        password: Yup.string().max(255).required("Digite sua senha!"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await handleSignIn(values.username, values.password);

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
            error={Boolean(touched.username && errors.username)}
            className={classes.loginInput}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-username">
              Nome do usuário
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              fullWidth
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              name="username"
            />
            {touched.username && errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-username--register"
              >
                {" "}
                {errors.username}{" "}
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
