import React, {  useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from "@mui/icons-material/Home";
// import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModePicture from '../assets/images/darkmode-pic.webp';
import LightModePicture from '../assets/images/lightmode-pic.jpg';
import Logo from '../assets/images/AB_Logo.png';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";


import { useUser } from '../utils/UserProvider';


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
    <div style={{ position: "fixed", top: "15px", right: "10px" }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <IconButton
            id="toggle-mode"
            size="sm"
            variant="plain"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event) => {
              if (mode === "light") {
                setMode("dark");
              } else {
                setMode("light");
              }
              onClick?.(event);
            }}
          >
            {mode === "light" ? (
              <DarkModeRoundedIcon />
            ) : (
              <LightModeRoundedIcon />
            )}
          </IconButton>
        </Grid>
    </Grid>
    </div>
  );
};

 export const Login = () => {
  const { setUserId,user } = useUser();
  console.log(user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formState, setFormState] = useState({
      email: '',
      password: '',
      persistent: false,
    });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password , persistent: formState.persistent},
        });
        const token = mutationResponse.data.login.token;
        const userId = mutationResponse.data.login.user._id; 
        Auth.login(token);
        localStorage.setItem("userId", userId);
        setUserId({userId})
        setIsLoggedIn(true);
      } catch (e) {
        console.log(e);
      }
      // Reset the form
    setFormState({
      email: "",
      password: "",
      persistent: false,
    });
    };

    const handleChange = (event) => {
      const { name, value, checked,type } = event.target;
      const inputValue = type === 'checkbox' ? checked : value;
      setFormState({
        ...formState,
        [name]:inputValue,
      });
    };

    // if user is logged in the render dashboard 
    if (isLoggedIn) {
      return <Dashboard />;
    }


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
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "lightblue",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
  <Grid container spacing={2}>
    <Grid item xs={2}>
    <Link to="/">
  <IconButton
    size="sm"
    variant="outlined"
    color="primary"
    style={{
      padding: "10px",
      marginTop: "10px",
    }}
  >
    <HomeIcon/>
   
  </IconButton>
</Link>
    </Grid>
    <Grid item xs={8}>
              <Typography level="h4" sx={{ my: 2, mb: 3, textAlign: 'center', fontFamily: 'monospace' }}>
                Welcome Back User
              </Typography>
            </Grid>
            <Grid item xs={2}>
            <ColorSchemeToggle />
            </Grid>
    </Grid>
           
     
{/* Logo */} <img src={Logo} alt="Logo" width={350} height={250}  style={{margin: 'auto'}}/>
      
          <Box
            component="main"
            sx={{
              my: "auto",
              pb: 25,
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
              },
            }}
          >
           
            { isLoggedIn ? (
              <p>Login Success! </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
              <FormControl required>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
                <FormLabel htmlFor="pwd">Password</FormLabel>
                <Input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                  checked={formState.persistent}
                  onChange={handleChange}
                />
                {/* <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                  Forgot your password?
                </Link> */}
              </Box>

              <Button type="submit" fullWidth>
                Log In
              </Button>
              <Link to="/signup">
                <Button style={{ width: "100%" }} >← Go to Sign Up</Button>
              </Link>
            </form>
            )}

            {error ? (
                <div>
                  <p className="error-text">
                    The provided credentials are incorrect
                  </p>
                </div>
              ) : null}
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
  
}


export default Login;