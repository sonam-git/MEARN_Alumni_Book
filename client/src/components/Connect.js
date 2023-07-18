<<<<<<< HEAD
import React, {useState} from "react";
=======
import React from "react";
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
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

<<<<<<< HEAD
export const Connect = () => {
=======
const Connect = () => {
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
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
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
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
                  
                  <Typography>Example Profile 2</Typography>
                  <Typography level="body3" mt={0.5}>
                    Joined March 07, 2011
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  
                  <Typography>Example Profile 2</Typography>
                  <Typography level="body3" mt={0.5}>
                    Joined March 07, 2011
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>

            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
                />
              </CardCover>
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
                  <Typography>Example Profile 3</Typography>
                  <Typography level="body3" mt={0.5}>
                  Joined September 26, 2009
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
                
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Example Profile 3</Typography>
                  <Typography level="body3" mt={0.5}>
                  Joined September 26, 2009
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Example Profile 3</Typography>
                  <Typography level="body3" mt={0.5}>
                  Joined September 26, 2009
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                boxShadow: 'none',
              }}
            >
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Example Profile 3</Typography>
                  <Typography level="body3" mt={0.5}>
                  Joined September 26, 2009
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <PersonIcon />
                </IconButton>
              </Box>
            </Card>
            </Box>
        </div>
    );
};

export default Connect;