import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'navy',
        },
        background: {
          default: '#ffffff', // Light mode background color
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: 'navy',
        },
        background: {
          default: 'navy', // Dark mode background color
        },
      },
    },
  },
  fontFamily: {
    // Add your custom font family here
  },
});