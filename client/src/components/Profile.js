import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";

//Displaying user avatar //variable for uploaded file of user
export function Profile() {
  return (
    <Sheet>
      <grid>
        <Container>
          <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            Holy sheet!
            <Avatar
              sx={{ display: "flex", alignItems: "center" }}
              alt="A beautiful flower of pink color within a glass bubble shapped casing"
              src={flowerImage}
            />
          </Box>
        </Container>

        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography sx={{ flex: 1 }}>Example Profile 2</Typography>
        </Box>
      </grid>
    </Sheet>
  );
}

export default Profile;
