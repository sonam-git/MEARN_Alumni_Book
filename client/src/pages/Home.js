import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { useMediaQuery } from "@mui/material";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { formLabelClasses } from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModePicture from "../assets/images/darkmode-pic.webp";
import LightModePicture from "../assets/images/lightmode-pic.jpg";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Hero from "../assets/images/AB_Logo2.png";
import HeroDark from "../assets/images/AB_Dark_logo.png";


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
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export const Home = () => {
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
        // home page content theme
        // styling for the opacity image
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
          backgroundColor: "lightblue",             // "rgba(255 255 255 / 0.6)"
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
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              
            }}
          >
            {/* Logo */}
            {/* <img src={Logo} alt="Logo" width={250} height={150} /> */}
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
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
              },
            }}
          >
            {/* Hero image display */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <HeroImage  />
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Link to="/login">
                  <Button style={{ width: "100%" }}>← Login</Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to="/signup">
                  <Button style={{ width: "100%" }}>← Sign Up</Button>
                </Link>
              </Grid>
            </Grid>
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

// Function to Display Hero image/ Logo depending on the light or dark mode
const HeroImage = () => {
  const { mode } = useColorScheme();
  // Define different sizes for the hero image based on screen width
  const heroImageSizes = {
    xs: { width: "100%", height: "auto", maxWidth: "300px", maxHeight: "200px" },
    sm: { width: "100%", height: "auto", maxWidth: "400px", maxHeight: "250px" },
    md: { width: "100%", height: "auto", maxWidth: "600px", maxHeight: "375px" },
    lg: { width: "100%", height: "auto", maxWidth: "800px", maxHeight: "500px" },
    xl: { width: "100%", height: "auto", maxWidth: "1000px", maxHeight: "625px" },
  };

  // Get the current screen width using useMediaQuery
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isXLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  const getHeroImageSize = () => {
    // Choose the appropriate hero image size based on screen width
    if (isSmallScreen) return heroImageSizes.xs;
    if (isMediumScreen) return heroImageSizes.sm;
    if (isLargeScreen) return heroImageSizes.md;
    if (isXLargeScreen) return heroImageSizes.lg;
    return heroImageSizes.xl;
  };

  const heroImageSize = getHeroImageSize();

  return (
    <>
      {mode === "light" ? (
        <img
          src={HeroDark}
          alt="Alumni Book Logo"
          style={{
            ...heroImageSize,
          }}
        />
      ) : (
        <img
          src={Hero}
          alt="Alumni Book Logo"
          style={{
            ...heroImageSize,
          }}
        />
      )}
      <Typography
        variant="h1"
        component="h1"
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: mode === "light" ? "black" : "white",
        }}
      >
        Welcome to Alumni Book
      </Typography>
    </>
  );
};

export default Home;