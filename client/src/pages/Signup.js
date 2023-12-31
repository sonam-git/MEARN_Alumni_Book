import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import CircularProgress from "@mui/joy/CircularProgress";
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
import Axios from 'axios';

// allows toggling between light and dark modes.
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

// sign up functional component
export const Signup = () => {
  //  state variable
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  image: null, 
 });

  const [addUser, {error, data}] = useMutation(ADD_USER);

  const navigate = useNavigate();
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', formState.image);
      formData.append('upload_preset', 'logging_preset'); // Replace 'YOUR_UPLOAD_PRESET_NAME' with the name of your created upload preset

      const response = await Axios.post(
      'https://api.cloudinary.com/v1_1/dnuanxqxg/image/upload',
      formData
    );

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);

      // Add the image URL to the formState
      const { data } = await addUser({
        variables: {
          firstname: formState.firstname,
          lastname: formState.lastname,
          username: formState.username,
          email: formState.email,
          password: formState.password,
          image: imageUrl, // Pass the image URL to the addUser mutation
        },
      });
  console.log(data);
      const token = data.addUser.token;
      Auth.login(token);
      navigate('/Dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false when the form submission is complete
    }
  };
  
  

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const fieldValue = event.target.files[0];
      setFormState({
        ...formState,
        [name]: fieldValue,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
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
                Welcome New User
              </Typography>
            </Grid>
            <Grid item xs={2}>
            <ColorSchemeToggle />
            </Grid>
    </Grid>
  {/* Logo */} 
  <img src={Logo} alt="Logo" width={350} height={250}  style={{margin: 'auto'}}/>
      
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
         
            {/* Signup Form */}
            { Auth.loggedIn() ? (
            <>
              <Link to='/Dashboard' >
              <Button style={{ width: "100%" }} >Login Success! Click here to continue!</Button>
                </Link>
            </>
            ) : (

            <form onSubmit={handleFormSubmit}>
           
                <FormControl required >
                  
                  <Input
                    placeholder="FirstName"
                    name="firstname"
                    type="firstname"
                    id="firstname"
                    onChange={handleChange}
                    
                  />
                </FormControl>
                <FormControl required>
                  
                  <Input
                    placeholder="LastName"
                    name="lastname"
                    type="lastname"
                    id="lastname"
                    onChange={handleChange}
                  
                  />
                </FormControl>
              
              <FormControl required>
               
                <Input
                  placeholder="UserName"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
                
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
                
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl required>
              <FormLabel >Upload Profile Photo</FormLabel>
                <Input
                  name="image"
                  type="file"
                  onChange={handleChange}
                />
              </FormControl>
           
                <Button type="submit" style={{ width: "100%" }}>
                {loading ? <CircularProgress size={"24"} /> : "Sign Up"}
                </Button>
             
                <Link to="/login"><Button style={{ width: "100%" }}>← Go to Login</Button></Link>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {'Username & Email Already Taken. Please Try Again!'}
              </div>
            )}

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
};
// export signup
export default Signup;