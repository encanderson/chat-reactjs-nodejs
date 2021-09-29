import React, { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
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
import { strengthColor, strengthIndicator } from "@src/utils/password-strength";
import { userRegister } from "@src/api/auth";
import { SNACKBAR_OPEN } from "@src/store/actions";

// assets
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// style constant
const useStyles = makeStyles((theme) => ({
  signDivider: {
    flexGrow: 1,
  },
  loginInput: {
    ...theme.typography.customInput,
  },
}));

//===========================|| JWT - REGISTER ||===========================//

const JWTRegister = ({ ...others }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = React.useState(false);
  const [checkdTerms, setCheckedTerms] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState("");

  const registerSubmit = async (values) => {
    const data = {
      consents: {
        privacy: checkedPrivacy,
        terms: checkdTerms,
      },
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      username: values.username,
    };
    if (checkdTerms && checkedPrivacy) {
      const response = await userRegister(data);
      if (response.status) {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: response.message,
          variant: "alert",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          alertSeverity: "success",
          close: false,
        });
        setTimeout(() => history.push("/login"), 0);
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: response.message,
          variant: "alert",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          alertSeverity: "warning",
          close: false,
        });
      }
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message:
          "É preciso observar nossa Polítca de Privacidade e Termos de Uso",
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "warning",
        close: false,
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        {/* <Grid item xs={12}></Grid> */}
        <Grid>
          <Divider className={classes.signDivider} orientation="horizontal" />
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box mb={2}>
            <Typography variant="subtitle1">Preencha seus dados</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          username: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("O email deve ser válido")
            .max(255)
            .required("Email é obrigatório"),
          username: Yup.string().required("Escolha seu nome de usuário."),
          firstName: Yup.string()
            .max(20)
            .required("Digite o seu primeiro nome"),
          lastName: Yup.string().max(20).required("Digite o seu último nome"),
          password: Yup.string().max(255).required("Senha é obrigatória"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            registerSubmit(values);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  className={classes.loginInput}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-firstName-register">
                    Primeiro Nome
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-firstName-register"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-name--register"
                    >
                      {" "}
                      {errors.firstName}{" "}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  className={classes.loginInput}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-lastName-register">
                    Último Nome
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lastName-register"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-lastName--register"
                    >
                      {" "}
                      {errors.lastName}{" "}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              className={classes.loginInput}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {" "}
                  {errors.email}{" "}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              className={classes.loginInput}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-register"
                type="username"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {touched.username && errors.username && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--username"
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
              <InputLabel htmlFor="outlined-adornment-password-register">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {" "}
                  {errors.password}{" "}
                </FormHelperText>
              )}
            </FormControl>
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box mb={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        width={85}
                        height={8}
                        borderRadius={7}
                        backgroundColor={level.color}
                      ></Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedPrivacy}
                      onChange={(event) =>
                        setCheckedPrivacy(event.target.checked)
                      }
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Concordo com os &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={RouterLink}
                        target="_blank"
                        to="/politica-de-privacidade"
                      >
                        Política de Privacidade.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkdTerms}
                      onChange={(event) =>
                        setCheckedTerms(event.target.checked)
                      }
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Concordo com os &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={RouterLink}
                        to="/termos-de-uso"
                        target="_blank"
                      >
                        Termos de Uso.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box mt={2}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Registrar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default JWTRegister;
