<<<<<<< HEAD
import React , {useState} from 'react';
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
import DarkModePicture from '../assets/images/darkmode-pic.webp';
import LightModePicture from '../assets/images/lightmode-pic.jpg';
import Logo from '../assets/images/AB_Logo.png';
import Login from './Login';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';




// allows toggling between light and dark modes. 
const ColorSchemeToggle = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
=======
import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModePicture from "../assets/images/darkmode-pic.webp";
import LightModePicture from "../assets/images/lightmode-pic.jpg";
import Logo from "../assets/images/AB_Logo.png";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";


// allows toggling between light and dark modes.
const ColorSchemeToggle = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
<<<<<<< HEAD
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
=======
    return <IconButton size="sm" variant="plain" color="neutral" disabled />
    ;
  }
  return (
    <div style={{ position: 'fixed', top: '100px', right: '10px' }}>
    <Grid container spacing={1} alignItems="center">
      <Grid item>
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
<<<<<<< HEAD
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
=======
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
        }
        onClick?.(event);
      }}
    >
<<<<<<< HEAD
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
=======
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
    </Grid>
    <Grid item>
    <Link to="/"><IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              style={{
                padding: '10px'
              }}
            >
              <HomeIcon 
              style={{
                marginRight: '5px'
              }}
              />
              Home
            </IconButton></Link>
    </Grid>
    </Grid>
    </div>
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
  );
};

// sign up functional component
<<<<<<< HEAD
 export const Signup = () => {
//  state variable
    const [showLogin, setShowLogin] = useState(false);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          firstname: formState.firstname,
          lastname: formState.lastname,
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

// to control whether to show the login component or not
    const handleShowLogin = (event) => {
      event.preventDefault();
      setShowLogin(true);
    }
  // returns login component
    if (showLogin) {
      return <Login />;
    }
  
// return signup component
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
=======
export const Signup = () => {
  //  state variable
  const [formState, setFormState] = useState({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  image: null, 
 });
  const [addUser] = useMutation(ADD_USER);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        firstname: formState.firstname,
        lastname: formState.lastname,
        username: formState.username,
        email: formState.email,
        password: formState.password,
        image: formState.image,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // return signup component
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "1000px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "1150px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
<<<<<<< HEAD
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
=======
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
          },
        })}
      >
        <Box
          sx={{
<<<<<<< HEAD
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
=======
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
<<<<<<< HEAD
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
          {/* Logo */}
          <img src={Logo} alt="Logo" width={250} height={150} />
=======
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <img src={Logo} alt="Logo" width={250} height={150} />
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
<<<<<<< HEAD
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
=======
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
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
<<<<<<< HEAD
            <form
             onSubmit={handleFormSubmit}
            >
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input 
                placeholder="First"
                name="firstname"
                type="firstname"
                id="firstname"
                onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input 
                placeholder="First"
                name="lastname"
                type="lastname"
                id="lastname"
                onChange={handleChange}
                 />
              </FormControl>
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input 
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                onChange={handleChange}
=======
            <form onSubmit={handleFormSubmit}>
            <div style={{ display: 'flex', columnGap: 3}}>
  <FormControl required >
    <FormLabel>First Name</FormLabel>
    <Input
      placeholder="First"
      name="firstname"
      type="firstname"
      id="firstname"
      onChange={handleChange}
    />
  </FormControl>
  <FormControl required>
    <FormLabel>Last Name</FormLabel>
    <Input
      placeholder="Last"
      name="lastname"
      type="lastname"
      id="lastname"
      onChange={handleChange}
    />
  </FormControl>
</div>
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleChange}
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
<<<<<<< HEAD
                <Input placeholder="Email"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input 
                placeholder="Password"
                name="password"
                type="password"
                id="fpassword"
                onChange={handleChange}/>
              </FormControl>
              {/* <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" name="image" accept="image/*"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }} />
              </FormControl> */}
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
=======
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="fpassword"
                  onChange={handleChange}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFormState((prevState) => ({
                      ...prevState,
                      image: file,
                    }));
                  }}
                />
              </FormControl> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
              </Box>
              <Button type="submit" fullWidth>
                Sign Up
              </Button>
<<<<<<< HEAD
=======
              <Link to="/login"><Button fullWidth>← Go to Login</Button></Link>
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
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
<<<<<<< HEAD
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
=======
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          // Set the left value to "unset"
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), right var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "right center", // Update the background position
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LightModePicture})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${DarkModePicture})`,
          },
        })}
      />
    </CssVarsProvider>
  );
};
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
// export signup
export default Signup;