import * as React from "react";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import MessageIcon from "@mui/icons-material/Message";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { useQuery, gql } from "@apollo/client";
import { Divider } from "@mui/material";
import Auth from "../utils/auth";
import { Button } from "@material-ui/core";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const PostFriendsList = ({posts}) => {
  // Create a copy of the posts array and then sort the copy by createdAt field (newest to oldest)
  const sortedPosts = [...posts].sort(
    (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
  );

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
        startdecorator={<MessageIcon />}
      >
       Posts
      </Typography>
      <hr />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        {/* Posts Individual cards */}
        {sortedPosts &&
          sortedPosts.map((post) => (
            <Card
              variant="outlined"
              sx={{
                "--Card-radius": (theme) => theme.vars.radius.sm,
                boxShadow: "none",
              }}
              key={post._id} // Add unique "key" prop using the "_id" field from data
            >
              <CardOverflow
                sx={{
                  borderBottom: ".5px solid",
                  borderColor: "neutral.outlinedBorder",
                }}
              >
                {/* If there's an image field in the post object, you can display it here */}
                {/* <img src={post.image} alt="Post Image" style={{ width: '100%', height: '275px'}} /> */}
              </CardOverflow>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  size="lg"
                  src={post.image}
                  sx={{
                    "--Avatar-size": "45px",
                    border: "4px solid white",
                    marginRight: "20px",
                  }}
                />
                <Box sx={{ flex: 1, fontWeight: "bold" }}>
                  <Typography>
                    {capitalizeFirstLetter(post.postAuthor)}
                  </Typography>
                </Box>
                {/* Display the post date */}
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Display the post text */}
                <Typography>-- {post.postText}</Typography>
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">
                  {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  style={{ background: "white", size: "sm" }}
                >
                  Comment
                </Button>
              </Box>
            </Card>
          ))}
      </Box>
    </div>
  );
};

export default PostFriendsList;
