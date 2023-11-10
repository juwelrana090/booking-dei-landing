import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import logo from '~/public/images/Booking_Dei_logo.png';
import brand from '~/public/text/brand';
import useStyles from './footer-style';
import SelectLang from '../LangSwitch/Select';

const date = new Date();
const year = date.getFullYear();
function Copyright() {
  return (
    <Typography variant="body2" display="block" align="left" color="textSecondary">
      &copy;&nbsp;
      {brand.saas.footerText}
      {year}
    </Typography>
  );
}

const footers = [
  {
    title: 'menu',
    description: ['Feature', 'FAQ'],
    link: ['#feature', '#faq'],
  },
];

function Footer(props) {
  const { classes, cx } = useStyles();
  const { invert, toggleDir } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth="lg"
      component="footer"
      className={cx(classes.footer, invert && classes.invert)}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className={classes.footerLeft}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" />
              <Copyright />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map(footer => (
              <Grid item xs={12} md={3} key={footer.title} className={classes.siteMapItem}>
                {isDesktop && (
                  <div>
                    <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => (
                        <li key={item}>
                          <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <Accordion
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>
                        {footer.title}
                      </strong>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <IconButton aria-label="FB" className={classes.margin} size="small">
              <i className="ion-logo-facebook" />
            </IconButton>
            <IconButton aria-label="TW" className={classes.margin} size="small">
              <i className="ion-logo-twitter" />
            </IconButton>
            <IconButton aria-label="IG" className={classes.margin} size="small">
              <i className="ion-logo-instagram" />
            </IconButton>
            <IconButton aria-label="LI" className={classes.margin} size="small">
              <i className="ion-logo-linkedin" />
            </IconButton>
          </div>
          <SelectLang toggleDir={toggleDir} />
        </Grid>
      </Grid>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool,
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => { },
};

export default Footer;
