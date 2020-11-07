const { createMuiTheme, responsiveFontSizes } = require("@material-ui/core");

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: 'Spartan, sans-serif',
    fontWeightBold: '600',
    body1: {
      fontSize: 16,
      lineHeight: 1
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14
    },
    caption: {
      fontSize: 12,
      display: "inline"
    },
    overline: {
      fontSize: 12,
      textTransform: "uppercase"
    },
    subtitle1: {
      fontSize: 16
    },
    subtitle2: {
      fontSize: 14
    },
    h1: {
      fontSize: 70
    },
    h2: {
      fontSize: 57
    },
    h3: {
      fontSize: 48
    },
    h4: {
      fontSize: 32
    },
    h5: {
      fontSize: 28
    },
    h6: {
      fontSize: 24,
      lineHeight: 1
    }
  },

  palette: {
    common: {
      white: '#fff',
      black: '#2F3542',
    },
    type: 'light',
    primary: {
      main: '#2c3d63'
    },
    secondary: {
      main: '#addcca'
    },
    error: {
      main: '#ff6f5e'
    }
  },

  props: {
    MuiButtonBase: {
      disableRipple: false,
    },
  },

  overrides: {
    MuiPaper: {
      root: {
        padding: 0
      }
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1em'
      },
      button: {
        cursor: 'pointer'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#fff',
        color: '#2c3d63'
      }
    },
    MuiButton: {
      contained: {
        boxShadow: "none"
      },
      root: {
        marginRight: 15,
        width: 120
        // padding: '5px 32px'
      }
    }
  }
});

export default responsiveFontSizes(theme);