import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import useStyles from './advertisement-style';
import Title from '../Title';

function Contact() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const { t } = useTranslation('common');

  useEffect(() => {
    ValidatorForm.addValidationRule('isTruthy', value => value);
  });

  return (
    <div className={classes.root}>
      <div className={classes.pageWrap}>
        <Container maxWidth="lg">
          <Paper className={cx(classes.advertisementBox, 'fragment-fadeUp')}>
            <div className={classes.advertisementWrap}>
              <Title align="center">
                {t('saas-landing.advertisement_title')}
              </Title>
              <Typography display="block" component="h6" className={text.subtitle2} align="center">
                {t('saas-landing.advertisement_desc1')}
              </Typography>
              <div className={classes.contactBtn}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="/login"
                >
                  {t("saas-landing.connect_us")}
                </Button>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Contact;
