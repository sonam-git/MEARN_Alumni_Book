import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../assets/images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
//Displaying user avatar //variable for uploaded file of user
export function Profile() {
  return (
    <Sheet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container>
            {/* upper layer with profile pic */}
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
              {/* adding input field for name field */}
              <TextField
                item
                xs={4}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
              />
              <Avatar
                item
                xs={8}
                sx={{ display: "flex", alignItems: "center" }}
                alt="A beautiful flower of pink color within a glass bubble shapped casing"
                src={flowerImage}
              />
            </Box>
          </Container>
        </Grid>

        {/* first layer */}
        <Grid item xs={4}>
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
            <Typography sx={{ flex: 1 }}>Create Post</Typography>

            <TextField
              item
              xs={4}
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
            />
          </Box>
        </Grid>
        {/* education right box of layout */}
        <Grid item xs={8}>
          <Box>Friends</Box>
          <TextField
            id="outlined-basic"
            label="Friend List"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Sheet>
  );
}

export default Profile;
