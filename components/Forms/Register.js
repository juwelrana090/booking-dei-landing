import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import Checkbox from './Checkbox';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from '../../config/appConfig'

function Register() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t, i18n } = useTranslation('common');
  const curLang = '/' + i18n.language;

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isTruthy', value => value);
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
      name: values.name,
      email: values.email,
      password: values.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const register = await fetch(`${baseUrl}/api/user/register`, requestOptions);
      const result = await register.json();

      if (result.status == true) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/en/login");
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
    <AuthFrame title={t('register_title')} subtitle={t('register_subtitle')}>
      <ToastContainer />
      <div>
        <div className={classes.head}>
          <Title align={isMobile ? 'center' : 'left'}>{t('register')}</Title>
          <Button size="small" className={classes.buttonLink} href={curLang + routeLink.saas.login}>
            <Icon className={cx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('register_already')}
          </Button>
        </div>
        <div className={classes.separator}>
          <Typography>{t('register_or')}</Typography>
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
                label={t('register_name')}
                onChange={handleChange('name')}
                name="name"
                value={values.name}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('register_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('register_password')}
                validators={['required']}
                onChange={handleChange('password')}
                errorMessages={['This field is required']}
                name="password"
                value={values.password}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('register_confirm')}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch', 'This field is required']}
                onChange={handleChange('confirmPassword')}
                name="confirm"
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>
          <div className={classes.btnArea}>
            <FormControlLabel
              control={(
                <Checkbox
                  validators={['isTruthy']}
                  errorMessages="This field is required"
                  checked={check}
                  value={check}
                  onChange={(e) => handleCheck(e)}
                  color="primary"
                />
              )}
              label={(
                <span className={text.caption}>
                  {t('form_terms')}
                  &nbsp;
                  <a href="#">
                    {t('form_privacy')}
                  </a>
                </span>
              )}
            />
            <Button variant="contained" type="submit" color="secondary" size="large" disabled={loading} loading={loading}>
              {t('continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}

export default Register;
