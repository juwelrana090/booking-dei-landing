import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';

import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from '~/config/appConfig'

function ForgetPassword() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();
  const { t, i18n } = useTranslation('common');
  const curLang = '/' + i18n.language;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [values, setValues] = useState({
    email: '',
  });


  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: values.email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const forgetPassword = await fetch(`${baseUrl}/api/user/forget-password`, requestOptions);
      const result = await forgetPassword.json();

      if (result.status == true) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/en");
        }, 3000);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFrame title={`Can't remember password`} subtitle={`Forget your password`}>
      <ToastContainer />
      <div>
        <div className={classes.head}>
          <Title align={isMobile ? 'center' : 'left'}>
            Forget Password
          </Title>
          <Button size="small" className={classes.buttonLink} href={curLang + routeLink.saas.login}>
            <Icon className={cx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('register_already')}
          </Button>
        </div>
        <div className={classes.separator}>
          <Typography>
            Forget Password
          </Typography>
        </div>
        <ValidatorForm
          onError={errors => console.log(errors)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('login_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth type="submit" color="secondary" size="large" disabled={loading} loading={loading}>
              {t('continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}

export default ForgetPassword;
