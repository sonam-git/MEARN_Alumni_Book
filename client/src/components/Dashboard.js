import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

// Icons import
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";

// custom
import filesTheme from "../containers/Theme";
import Menu from "../containers/Menu";
import Layout from "../containers/Layout";
import { Connect, Explore } from "../components";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [showConnect, setShowConnect] = useState(false);
  const [showExplore, setShowExplore] = useState(true);

  const [selectedItem, setSelectedItem] = useState("explore");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleShowConnect = (event) => {
    event.preventDefault();
    setShowConnect(true);
    setShowExplore(false);
  };

  const handleShowExplore = (event) => {
    event.preventDefault();
    setShowExplore(true);
    setShowConnect(false);
  };

  const handlePersonAddIconClick = (event) => {
    event.preventDefault();
    setIsSheetOpen(true);
  };

  const handleIsSheetClose = (event) => {
    event.preventDefault();
    setIsSheetOpen(false);
  };

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            md: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <ColorSchemeToggle />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Dashboard
            </Typography>
          </Box>
          <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" color="neutral">
                <Typography
                  fontWeight="lg"
                  fontSize="sm"
                  textColor="text.tertiary"
                >
                  Find
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: "500px",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              style={{
                padding: "10px",
              }}
            >
              <HomeIcon
                style={{
                  marginRight: "5px",
                }}
              />
              Home
            </IconButton>
            <Menu
              id="app-selector"
              control={
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  aria-label="Apps"
                  style={{
                    padding: "10px",
                  }}
                >
                  <ManageAccountsIcon
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  Account
                </IconButton>
              }
              menus={[
                {
                  label: "Profile",
                },
                {
                  label: "Settings",
                },
              ]}
            />
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              style={{
                padding: "10px",
              }}
            >
              <LogoutIcon
                style={{
                  marginRight: "5px",
                }}
              />
              Log Out
            </IconButton>
          </Box>
        </Layout.Header>

        {/* Side Bar Navigations */}
        <Layout.SideNav>
          <List
            size="sm"
            sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}
          >
            <ListItem nested>
              <ListSubheader>Browse</ListSubheader>
              <List
                aria-labelledby="nav-list-browse"
                sx={{
                  "& .JoyListItemButton-root": { p: "8px" },
                }}
              >
                <ListItem>
                  <ListItemButton onClick={() => handleItemClick("explore")}>
                    <ListItemDecorator>
                      <ExploreIcon />
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === "explore"}
                      onClick={handleShowExplore}
                      sx={{
                        color: selectedItem === "explore" ? "#2ACAEA" : "white",
                      }}
                    >
                      Explore
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => handleItemClick("connect")}>
                    <ListItemDecorator>
                      <ViewCompactAltIcon />
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === "connect"}
                      onClick={handleShowConnect}
                      sx={{
                        color: selectedItem === "connect" ? "#2ACAEA" : "white",
                      }}
                    >
                      Connect With Alumnis
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => handleItemClick("aboutus")}>
                    <ListItemDecorator sx={{ color: "neutral.500" }}>
                      <InfoIcon />
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === "aboutus"}
                      onClick={handleShowConnect}
                      sx={{
                        color: selectedItem === "aboutus" ? "#2ACAEA" : "white",
                      }}
                    >
                      About Us
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => handleItemClick("contact")}>
                    <ListItemDecorator sx={{ color: "neutral.500" }}>
                      <ContactSupportIcon />
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === "contact"}
                      onClick={handleShowConnect}
                      sx={{
                        color: selectedItem === "contact" ? "#2ACAEA" : "white",
                      }}
                    >
                      Contacts
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Layout.SideNav>

        {/* Main Page */}
        {/* where all the re-renders happens */}
        <Layout.Main>
          {showConnect && <Connect />}
          {showExplore && <Explore />}
        </Layout.Main>

        {/* Right Side Profile View */}

        {isSheetOpen && (
          <Sheet
            sx={{
              display: { xs: "none", sm: "initial" },
              borderLeft: "1px solid",
              borderColor: "neutral.outlinedBorder",
            }}
          >
            <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ flex: 1 }}>Example Profile 2</Typography>
              <IconButton
                variant="outlined"
                color="neutral"
                size="sm"
                onClick={handleIsSheetClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <AspectRatio ratio="21/9">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
              />
            </AspectRatio>
            <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
              <Typography level="body2" mr={1}>
                Profile Description
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                gap: 2,
                p: 2,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                "& > *:nth-child(odd)": { color: "text.secondary" },
              }}
            >
              <Typography level="body2">Age</Typography>
              <Typography level="body2" textColor="text.primary">
                27
              </Typography>

              <Typography level="body2">High School/University</Typography>
              <Typography level="body2" textColor="text.primary">
                UC Berkeley
              </Typography>

              <Typography level="body2">Occupation</Typography>
              <Typography level="body2" textColor="text.primary">
                Software Engineer
              </Typography>

              <Typography level="body2">Graduated</Typography>
              <Typography level="body2" textColor="text.primary">
                May 31, 2016
              </Typography>

              <Typography level="body2">Work</Typography>
              <Typography level="body2" textColor="text.primary">
                Krusty Krab
              </Typography>

              <Typography level="body2">Hobbies</Typography>
              <Typography level="body2" textColor="text.primary">
                Music, Sports, Games
              </Typography>

              <Typography level="body2">Joined</Typography>
              <Typography level="body2" textColor="text.primary">
                March 07, 2011
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ py: 2, px: 1 }}>
              <Button variant="plain" size="sm" startDecorator={<PersonIcon />}>
                View Full Profile
              </Button>
            </Box>
          </Sheet>
        )}
      </Layout.Root>
    </CssVarsProvider>
  );
};

export default Dashboard;
