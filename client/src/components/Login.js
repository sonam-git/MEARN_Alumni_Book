import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import headerImage from '../images/light-coding-background.jpg';

const useStyles = makeStyles((theme) => ({
    loginPage: {
      margin: 'auto',
      marginTop: '14rem', 
    },
  }));

export const Login = () => {
    const classes = useStyles();
  return (
    <CssVarsProvider>
      <main className={classes.loginPage} >
        <Sheet
          sx={{
            width: 400,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 8, // padding top & bottom
            px: 15, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            borderRadius: 'sm',
            boxShadow: 'md',
            borderWidth: '5px',
            borderColor: '#d7d1cb',
            backgroundColor: 'transparent'
            
          }}
          variant="outlined"
          
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              // html input attribute
              sx={{ borderColor: '#d7d1cb',  borderWidth: '3px', outline: 'none' }}
              name="Username"
              type="Username"
              placeholder="username"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              sx={{ 
                borderColor: '#d7d1cb',  
                borderWidth: '3px',
                outline: 'none',
                '&:focus': {
                    outline: 'none', // Remove outline on focus
                },
             }}
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>

          <Button sx={{ mt: 1, backgroundColor:'#d7d1cb', color: 'black',  /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

export default Login;