import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";
import { GET_USERS} from "../utils/queries";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";

// Icons import
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Auth from "../utils/auth";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Connect = ({
  users,
  handlePersonIconClick,
  loggedInUser,
}) => {
  // logged in user variable
  const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const [addFriendMutation] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: GET_USERS }], // Refetch the users after adding a friend
  });

  // Function to handle adding a friend
  const handleAddFriend = (friendId) => {
    addFriendMutation({
      variables: { userId: loggedInUserId, friendId },
    })
      .then(() => {
        console.log("Friend added successfully");
      })
      .catch((error) => {
        console.error("Failed to add friend:", error.message);
      });
  };

  const filteredUsers = users
    ? users.filter((user) => user._id !== loggedInUser._id)
    : [];
  const [shuffledUsers, setShuffledUsers] = useState([...filteredUsers]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledArray = shuffleArray([...filteredUsers]);
    setShuffledUsers(shuffledArray);
  }, []);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
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
              shuffledUsers.map((user) =>
                user && user._id !== loggedInUser._id ? (
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
                        <img
                          src={user.image}
                          alt="User Avatar"
                          style={{ width: "100%", height: "275px" }}
                        />
                      </AspectRatio>
                    </CardOverflow>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography>
                          {capitalizeFirstLetter(user.firstname)}{" "}
                          {capitalizeFirstLetter(user.lastname)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        variant="plain"
                        color="neutral"
                        onClick={() =>
                          handleAddFriend(user._id)
                        }
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
                ) : null
              )}
          </Box>
        </>
      ) : (
        <>
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
            Alumnis
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
              shuffledUsers.map(
                (user) =>
                  user &&
                  user._id !== loggedInUser._id && (
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
                          <img
                            src={user.image}
                            alt="User Avatar"
                            style={{ width: "100%", height: "275px" }}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography>
                            {capitalizeFirstLetter(user.firstname)}{" "}
                            {capitalizeFirstLetter(user.lastname)}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  )
              )}
          </Box>
        </>
      )}
    </div>
  );
};

export default Connect;
