import React from "react";
import { useHistory } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

// project imports
import useScriptRef from "@src/hooks/useScriptRef";
import { SNACKBAR_OPEN } from "@src/store/actions";
import { sendEmailRecover } from "@src/api/auth";

// style constant
const useStyles = makeStyles((theme) => ({
  loginInput: {
    ...theme.typography.customInput,
  },
}));

//========================|| JWT - FORGOT PASSWORD ||========================//

const ForgotPassword = ({ ...others }) => {
  const classes = useStyles();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const history = useHistory();

  async function handlerSend(email) {
    const resp = await sendEmailRecover(email);
    if (resp.status) {
      history.push("/verificar-codigo");
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Verifique se seus dados estão corretos.",
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "error",
        close: false,
      });
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().min(14).max(14).required("Digite seu email."),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await handlerSend(values.email);

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
            <InputLabel htmlFor="outlined-adornment-email-register">
              Email
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              fullWidth
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {" "}
                {errors.email}{" "}
              </FormHelperText>
            )}
          </FormControl>

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
              Enviar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
