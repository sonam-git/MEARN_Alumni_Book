import * as React from 'react';
import Typography from '@mui/joy/Typography';
import ExploreIcon from '@mui/icons-material/Explore';
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { useQuery, gql } from '@apollo/client';
import { Divider } from '@mui/material';

// Makes the first letter of firstname and lastname to always be capital 
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const PostList = () => {
  // Define the GET_POSTS query to retrieve posts from all users
  const GET_POSTS = gql`
    query GetPosts {
      posts {
        _id
        postAuthor
        postText
        createdAt
        # Add other fields as needed, e.g., comments and likes
      }
    }
  `;

  // Fetch the posts using useQuery
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Create a copy of the posts array and then sort the copy by createdAt field (newest to oldest)
const posts = [...data.posts].sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));

  return (
    <div>
      <Typography 
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
        startDecorator={<ExploreIcon/>}
      >
        Recent Post
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
       {posts &&
          posts.map((post) => (
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
                <Box sx={{ flex: 1 , fontWeight: 'bold'}}>
                  <Typography >{capitalizeFirstLetter(post.postAuthor)}</Typography>
                </Box>
                {/* Display the post date */}
                <Typography variant="body2">{new Date(parseInt(post.createdAt)).toLocaleDateString()}</Typography>
              </Box>
              <Divider/>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Display the post text */}
                <Typography>-- {post.postText}</Typography>
              </Box>
            </Card>
          ))}
      </Box>
    </div>
  );
}

export default PostList;