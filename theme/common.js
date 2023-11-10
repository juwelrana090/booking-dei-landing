import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useTextAlign = makeStyles({ uniqId: 'textalign' })({
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  }
});

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useFloat = makeStyles({ uniqId: 'float' })({
  floatLeft: {
    float: 'left'
  },
  floatRight: {
    float: 'right'
  },
});

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useText = makeStyles({ uniqId: 'text' })(theme => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 52,
    lineHeight: '68px',
    [theme.breakpoints.down('lg')]: {
      fontSize: 38,
      lineHeight: '60px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
      lineHeight: '44px'
    },
  },
  title2: {
    fontSize: 36,
    lineHeight: '56px',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down('lg')]: {
      fontSize: 32,
      lineHeight: '48px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '36px',
    }
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightMedium,
    paddingRight: 10,
    fontSize: 28,
    lineHeight: '36px',
    [theme.breakpoints.down('lg')]: {
      fontSize: 24,
      lineHeight: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '28px',
    },
  },
  subtitle2: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 21,
    lineHeight: '33px',
    [theme.breakpoints.down('lg')]: {
      fontSize: 20,
      lineHeight: '32px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  paragraph: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    lineHeight: '24px'
  },
  caption: {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    lineHeight: '24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '22px',
    },
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useHidden = makeStyles({ uniqId: 'hidden' })(theme => ({
  lgDown: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mdDown: {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  smDown: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  xsDown: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  lgUp: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  mdUp: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  smUp: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));
