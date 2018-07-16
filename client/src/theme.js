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
  },
  card: {
      maxWidth: 345,
    },
  media: {
      height: '0',
      paddingTop: '56.25%', // 16:9
      marginTop: '30'
    },
});

export default theme

// font-family: 'Aldrich', sans-serif;

// 'Courier', 'Helvetica', 
