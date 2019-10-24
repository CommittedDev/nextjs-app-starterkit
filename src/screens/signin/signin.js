import React from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from 'src/redux/auth/auth.actions';
import Loader, { LoaderTypes } from 'src/components/Loader';
import Error, { ErrorTypes } from 'src/components/Error';
import Copyright from 'src/components/Copyright';
import { withTranslation } from 'src/i18n';
import { useRouter } from 'next/router';
import useStyles from './styles';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function SignIn({ actions, t }) {
  const classes = useStyles();
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const onSubmit = (values, e) => {
    e.preventDefault();
    const actionPayload = {
      ...values,
      nextRoute: router.query.next || '/',
    };
    actions.login(actionPayload);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signinScreenTitle')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('signinEmailAddress')}
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('signinPassword')}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={errors.password}
            helperText={errors.password && errors.password.message}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t('signinRememberMe')}
          />
          <Error errorType={ErrorTypes.LOGIN} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t('signinButton')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password">
                <a><Typography component="span" variant="body2">{t('signinForgotPassword')}</Typography></a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                <a><Typography component="span" variant="body2">{t('signinDontHaveAnAccountSignUp')}</Typography></a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Loader fullScreen loaderType={LoaderTypes.LOGIN} />
    </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ login }, dispatch),
  };
}

const Extend = withTranslation('signin')(SignIn);

SignIn.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Extend);
