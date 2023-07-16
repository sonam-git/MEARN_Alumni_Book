import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";

//Displaying user avatar //variable for uploaded file of user
export function Profile() {
  return (
    <Sheet>
      Holy sheet!
      <Avatar
        alt="A beautiful flower of pink color within a class bubble casing"
        src={flowerImage}
      />
    </Sheet>
  );
}

export default Profile;
