import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

import IconButton from "@mui/joy/IconButton";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";

// Icons import
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Makes the first letter of firstname and lastname to always be capital 
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Connect = ({ users, handlePersonIconClick, loggedInUser }) => {

  const filteredUsers = users ? users.filter((user) => user._id !== loggedInUser._id) : [];
  return (
    <div>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
        startDecorator={<ViewCompactAltIcon />}
      >
        Connect With Alumnis
      </Typography>
      <hr style={{ marginBottom: "20px" }}></hr>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        {/* Profiles Individual cards */}
        {filteredUsers &&
          filteredUsers.map((user) => (
            user && user._id !== loggedInUser._id && (
            <Card
              variant="outlined"
              sx={{
                "--Card-radius": (theme) => theme.vars.radius.sm,
                boxShadow: "none",
              }}
              key={users._id}
            >
              <CardOverflow
                sx={{
                  borderBottom: ".5px solid",
                  borderColor: "neutral.outlinedBorder",
                }}
              >
                <AspectRatio ratio="16/13" color="primary">
                  <img src={user.image} alt="User Avatar" 
                  style={{ width: '100%', height: '275px'}}
                  />
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>
                  {capitalizeFirstLetter(user.firstname)} {capitalizeFirstLetter(user.lastname)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={() => handlePersonIconClick(user)}
                >
                  <PersonAddIcon />
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={() => handlePersonIconClick(user)}
                >
                  <PersonIcon />
                </IconButton>
                </Box>
            </Card>
            ) 
          ))}
      </Box>
    </div>
  );
};

export default Connect;
