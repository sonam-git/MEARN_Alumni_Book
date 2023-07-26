import React from "react";
import { useTheme } from '@mui/material/styles';
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";




const SideNav = ({
    handleItemClick,
  handleShowConnect,
  handleShowPostList,
  handleShowProfile,
  selectedItem,
}) => {
    const theme = useTheme();
    return (
      <List
              size="sm"
              sx={{ 
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              [theme.breakpoints.up("md")]: {
                borderRight: '2px solid ', // Apply border when the screen is md or larger
              },
            padding: '10px' ,
        }}
            >
              <ListItem nested>
                <ListSubheader>Browse</ListSubheader>
                <List
                  aria-labelledby="nav-list-browse"
                  sx={{
                    "& .JoyListItemButton-root": { p: "8px" },
                  }}
                >
                  <ListItem sx={{}}>
                    <ListItemButton
                      onClick={() => handleItemClick("post")}
                      sx={{
                        color: selectedItem === "post" ? "#2ACAEA" : "#009DFF",
                        border: selectedItem === "post" ? "solid" : "",
                        borderRadius: selectedItem === "post" ? "10px" : "",
                        borderColor: selectedItem === "post" ? "#006EB3" : "",
                      }}
                    >
                      <ListItemDecorator>
                        <MessageIcon />
                      </ListItemDecorator>
                      <ListItemContent
                        selected={selectedItem === "post"}
                        onClick={handleShowPostList}
                      >
                        Activity Post
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => handleItemClick("connect")}
                      sx={{
                        color:
                          selectedItem === "connect" ? "#2ACAEA" : "#009DFF",
                        border: selectedItem === "connect" ? "solid" : "",
                        borderRadius: selectedItem === "connect" ? "10px" : "",
                        borderColor:
                          selectedItem === "connect" ? "#006EB3" : "",
                      }}
                    >
                      <ListItemDecorator>
                        <ViewCompactAltIcon />
                      </ListItemDecorator>
                      <ListItemContent
                        selected={selectedItem === "connect"}
                        onClick={handleShowConnect}
                      >
                        Connect With Alumnis
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => handleItemClick("profile")}
                      sx={{
                        color:
                          selectedItem === "profile" ? "#2ACAEA" : "#009DFF",
                        border: selectedItem === "profile" ? "solid" : "",
                        borderRadius: selectedItem === "profile" ? "10px" : "",
                        borderColor:
                          selectedItem === "profile" ? "#006EB3" : "",
                      }}
                    >
                      <ListItemDecorator sx={{ color: "neutral.500" }}>
                        <PersonIcon />
                      </ListItemDecorator>
                      <ListItemContent
                        selected={selectedItem === "profile"}
                        onClick={handleShowProfile}
                      >
                        Profile
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
            </List>
      );
  };
  export default SideNav;

    // <nav>
        // <Button variant= 'primary' onClick={() => handleItemClick("post")}>
        //   Activity Post
        // </Button>
        // <Button onClick={handleShowConnect}>
        //   Connect With Alumnis
        // </Button>
        // <Button onClick={handleShowPostList}>
        //   Profile
        // </Button>
        // </nav>