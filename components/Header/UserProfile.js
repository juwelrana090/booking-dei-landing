import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import { useRouter } from "next/router";
import cookie from "js-cookie";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useStyles from './header-style';
import link from '~/public/text/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { baseUrl } from '~/config/appConfig';

let themeType = 'light';
if (typeof Storage !== 'undefined') {
  themeType = localStorage.getItem('luxiTheme') || 'light';
}


function UserProfile(props) {

  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;

  const [Loading, setLoading] = useState(true);
  const [ctn, setCtn] = useState(null);
  const { classes, cx } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation('common');
  const [user, setUser] = useState();

  const curLang = '/' + i18n.language;


  const getUser = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const getMe = await fetch(`${baseUrl}/api/user/me`, requestOptions);
      const result = await getMe.json();
      if (result.status == true) {
        setUser(result.user);
      } else {
        setUser();
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let c_user = cookies?.user;
    if (c_user) {
      getUser();
    }
  }, [cookies?.user]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("user");
    router.push("/login");
  };

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { invert } = props;

  console.log('user', user)

  return (
    <div className={classes.setting}>
      {
        user ? <>
          <IconButton
            aria-describedby={id}
            aria-label="User Profile"
            onClick={handleClick}
            className={
              cx(
                classes.icon,
                invert && classes.invert
              )
            }
            size="large"
          >
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>

          <Menu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </> : <>
          <Button href={curLang + link.saas.login} className={classes.textBtn}>
            {t('saas-landing.header_login')}
          </Button>
          <Button href={curLang + link.saas.register} variant="contained" color="secondary" className={classes.button}>
            {t('saas-landing.header_register')}
          </Button>
        </>
      }

    </div>
  );
}

UserProfile.propTypes = {
  toggleDark: PropTypes.func.isRequired,
  toggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

UserProfile.defaultProps = {
  invert: false
};

export default UserProfile;
