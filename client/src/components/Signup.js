import React , {useState, useEffect} from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModePicture from '../images/darkmode-pic.webp';
import LightModePicture from '../images/lightmode-pic.jpg';
import Login from './Login';





const ColorSchemeToggle = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

 export const Signup = () => {
 
    const [showLogin, setShowLogin] = useState(false);
  
    const handleShowLogin = (event) => {
      event.preventDefault();
      setShowLogin(true);
    }
  
    if (showLogin) {
      return <Login />;
    }
  

  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
    
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '1000px', // form will stretch when viewport is below `769px`
            '--Cover-width': '40vw', // must be `vw` only
            '--Form-maxWidth': '1150px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontWeight="lg"
              startDecorator={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    background: (theme) =>
                      `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                    borderRadius: '50%',
                    boxShadow: (theme) => theme.shadow.md,
                    '--joy-shadowChannel': (theme) =>
                      theme.vars.palette.primary.mainChannel,
                  }}
                />
              }
            >
              Welcome
            </Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Sign Up Here!
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Welcome New User!
              </Typography>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                  persistent: formElements.persistent.checked,
                };
                alert(JSON.stringify(data, null, 2));
              }}
            >
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="first-name" />
              </FormControl>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="last-name" />
              </FormControl>
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input type="username" name="username" />
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" name="image" accept="image/*"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }} />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
              <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg"
              onClick={handleShowLogin}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '45px',
              }}
              >
                Already Have An Account? Click Here To Log In!
              </Link>
              </Box>
              <Button type="submit" fullWidth>
                Sign in
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © The Alumni's {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
           // Set the left value to "unset"
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition:
            'background-image var(--Transition-duration), right var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'right center', // Update the background position
          backgroundRepeat: 'no-repeat',
          backgroundImage:
          `url(${LightModePicture})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
            `url(${DarkModePicture})`,
          },
        })}
      />
      {showLogin && <Login />}
    </CssVarsProvider>
  );
}

export default Signup;