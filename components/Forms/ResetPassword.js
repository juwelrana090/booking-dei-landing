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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import axios from 'axios';
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from '~/config/appConfig'
import { string } from 'prop-types';


function ResetPassword() {

  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();
  const { t, i18n } = useTranslation('common');
  const curLang = '/' + i18n.language;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [values, setValues] = useState({
    user_id: "",
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
  });


  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = event => {
    setCheck(event.target.checked);
  };

  const handleTokenValid = async () => {
    try {
      const tokenCheck = await fetch(`${baseUrl}/api/user/token-verify?token=${token}`);
      const result = await tokenCheck.json();

      console.log('tokenCheck', result);

      if (result.status == true) {
        setTokenValid(true);
        setValues({ ...values, user_id: result.user_id });
      } else {
        setTokenValid(false);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    handleTokenValid();
  }, [token])

  const handleSubmit = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: values.user_id,
      password: values.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const resetPassword = await fetch(`${baseUrl}/api/user/reset-password`, requestOptions);
      const result = await resetPassword.json();

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
    <AuthFrame title={`Set your new password`} subtitle={`Reset your password`}>
      <ToastContainer />
      <div>
        <div className={classes.head}>
          <Title align={isMobile ? 'center' : 'left'}>
            Reset Password
          </Title>
          <Button size="small" className={classes.buttonLink} href={curLang + routeLink.saas.login}>
            <Icon className={cx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('register_already')}
          </Button>
        </div>

        {
          token == undefined ?
            <Box sx={{ display: 'block', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
              <Typography sx={{ textAlign: 'center', color: 'red', fontSize: '22px' }}>
                Oops!!! This link not valid
              </Typography>
            </Box> :
            <>
              {
                loadingPage ?
                  <Box sx={{ display: 'block', textAlign: 'center', alignItems: 'center', justifyContent: 'center', }}>
                    <CircularProgress />
                    <Typography>
                      checking
                    </Typography>
                  </Box> : <>
                    {
                      tokenValid ? <>
                        <div className={classes.separator}>
                          <Typography>
                            Reset Password
                          </Typography>
                        </div>
                        <ValidatorForm
                          onError={errors => console.log(errors)}
                          onSubmit={handleSubmit}
                        >
                          <Grid container spacing={3}>
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
                            <Button variant="contained" fullWidth type="submit" color="secondary" size="large" disabled={loading} loading={loading}>
                              {t('continue')}
                            </Button>
                          </div>
                        </ValidatorForm>
                      </> :
                        <Box sx={{ display: 'block', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
                          <Typography sx={{ textAlign: 'center', color: 'red', fontSize: '22px' }}>
                            Sorry, this token has expired!!!
                          </Typography>
                        </Box>
                    }
                  </>
              }</>
        }
      </div>
    </AuthFrame>
  );
}

export default ResetPassword;
