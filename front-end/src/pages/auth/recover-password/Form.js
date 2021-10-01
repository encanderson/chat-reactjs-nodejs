import React from "react";

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

// project imports
import useScriptRef from "@src/hooks/useScriptRef";
import useAuth from "@src/hooks/useAuth";

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

  const { sendCode } = useAuth();

  async function handleSend(email) {
    await sendCode(email);
  }

  return (
    <Formik
      initialValues={{
        email: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required("Digite seu email."),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await handleSend(values.email);

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
