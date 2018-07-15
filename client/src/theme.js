import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lime,
  },
  typography: {
    fontFamily: ['Aldrich'],
  }
});

export default theme

// font-family: 'Aldrich', sans-serif;

// 'Courier', 'Helvetica', 
