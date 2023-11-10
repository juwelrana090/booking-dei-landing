import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import ParallaxMedium from '../Parallax/Medium';
import illustration from '~/public/images/saas/faq.png';
import Title from '../Title';
import useStyles from './faq-style';

const faqData = [
  {
    q: 'How do I add a new guest or employee to the system?',
    a: 'For guests, as you create a new booking, their details are automatically recorded in the guest look-up page. To add a new employee to the system, simply click on the "New Employee" button and enter their details in the pop-up.'
  },
  {
    q: 'How can I add a transaction?',
    a: 'To add an income transaction, click New Transaction when creating or editing a booking. For expenses, use New Expense on the Transactions page. Once confirmed, the transactions are automatically stored in the Transactions page and can be edited or deleted as needed.',
  },
  {
    q: 'Can I edit a room booking?',
    a: 'Absolutely! You can edit any room booking by clicking the “Edit Booking” button on the booking details page.'
  },
  {
    q: 'How do I check room availability?',
    a: 'To check room availability, visit the Home page and view the room layout grid. All rooms are color-coded by status, with available rooms marked in white, making it easy to check their availability.'
  },
  {
    q: 'How can I check KPIs and financial reports?',
    a: 'Stay tuned! Were currently working on bringing you valuable financial insights and analytics, coming soon in the future.'
  },
];

function Faq() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const [expanded, setExpanded] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation('common');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Title align={isMobile ? 'center' : 'left'}>
              <strong>
                FAQ
              </strong>
            </Title>
            <Typography className={cx(text.subtitle2)} align={isMobile ? 'center' : 'left'} component="p">
              {t('saas-landing.faq_subtitle')}
            </Typography>
            {!isMobile && (
              <div className={classes.illustration}>
                <ParallaxMedium />
                <img src={illustration} alt="illustration" />
              </div>
            )}
          </Grid>
          <Grid item md={6}>
            <div className={classes.accordion}>
              {faqData.map((item, index) => (
                <div className={classes.item} key={index.toString()}>
                  <Accordion
                    classes={{
                      root: classes.paper
                    }}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      classes={{
                        content: classes.content,
                        expanded: classes.expanded,
                      }}
                    >
                      <Typography className={classes.heading}>{item.q}</Typography>
                      <ExpandMoreIcon className={classes.icon} />
                    </AccordionSummary>
                    <AccordionDetails
                      classes={{
                        root: classes.detail,
                      }}
                    >
                      <Typography>
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Faq;
