import React from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';


import IconButton from '@mui/joy/IconButton';
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt';

// Icons import
import PersonIcon from '@mui/icons-material/Person';

const Connect = ({ users, }) => {
    return(
        <div>
            <Typography 
            level="h1"
            fontWeight="xl"
            fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}
            startDecorator={<ViewCompactAltIcon/>}
            >
                Connect With Alumnis
            </Typography>
            <hr style={{ marginBottom: '20px'}}></hr>
            <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
            >

            {/* Profiles Individual cards */}
            {users && 
              users.map((users) => (
              <Card
                variant="outlined"
                sx={{
                  '--Card-radius': (theme) => theme.vars.radius.sm,
                  boxShadow: 'none',
                }}
                key={users._id}
              >
              <CardOverflow
                sx={{
                  borderBottom: '.5px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
                >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover
                  sx={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                  }}
                />
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  
                  <Typography>{users.firstname} {users.lastname}</Typography>
                  <Typography level="body3" mt={0.5}>
                    {users.email}
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>
            </Card>
              ))}
            </Box>
        </div>
    );
};

export default Connect;