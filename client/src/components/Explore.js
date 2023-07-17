import * as React from 'react';
import Typography from '@mui/joy/Typography';
import DescriptionLayout from '../containers/DescriptionLayout';
import ExploreIcon from '@mui/icons-material/Explore';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';

import articleOneImage from '../assets/images/article-one.webp';
import articleTwoImage from '../assets/images/article-two.jpeg';
import articleThreeImage from '../assets/images/article-three.jpg';
import opportunitiesImage from '../assets/images/opportunities.jpg';
import successImage from '../assets/images/success.jpg';

export const Explore = () => {
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
        Explore
      </Typography>
      <hr></hr>
    <DescriptionLayout
      image={null}
      reversed={true}
      video="https://www.youtube.com/embed/ppr6ptfM4_s"
    >
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Life Long Connections
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
      One of the most valuable aspects of being part of an alumni network is the opportunity to forge lifelong connections. Alumni networks bring together individuals from diverse backgrounds, generations, and professions who share a common bond—their affiliation with the educational institution. These connections foster a sense of community, friendship, and support that lasts long after graduation. Through alumni events, reunions, and online platforms, alumni can reconnect, share experiences, and build valuable personal and professional relationships.
      </Typography>
    </DescriptionLayout>

    <DescriptionLayout
     image={opportunitiesImage}
     reversed={false}
     video="https://www.youtube.com/embed/OVf5c7NthSw"
    >
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Professional Career Networking
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
      Alumni networks offer a vast pool of professional contacts and career opportunities. Graduates who are part of an alumni community gain access to a wide range of job prospects, internships, and industry connections. Alumni often collaborate to create job placement programs, organize career fairs, and provide internship opportunities for current students. The alumni network becomes a powerful resource for career advancement, with members actively supporting and promoting each other's professional journeys.
      </Typography>

    </DescriptionLayout>
    
    <DescriptionLayout
     image={successImage}
     reversed={true}
     video="https://www.youtube.com/embed/gpE_W50OTUc"
    >
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Nurturing Growth and Empowering Success
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
      Alumni often serve as mentors and guides for current students and recent graduates. Their experiences and insights provide invaluable guidance for navigating career paths, overcoming challenges, and making informed decisions. Through mentorship programs, alumni can offer advice, share industry knowledge, and help shape the aspirations and ambitions of the next generation. The mentor-mentee relationship nurtures personal and professional growth, fostering a culture of continuous learning and development.
      </Typography>
    </DescriptionLayout>

      <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography color="primary" fontSize="lg" fontWeight="lg">
            Explore More Article
          </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
            >
            {/* Article One */}
            <Card variant="outlined">
              <CardOverflow
                sx={{
                  borderBottom: '.5px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover
                sx={{
                  backgroundImage: `url(${articleOneImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                  <a href="https://www.news-herald.com/2023/04/11/alumni-should-have-active-role-in-inspiring-current-hs-sports-programs-opinion/" target="_blank" rel="noopener noreferrer">click</a>
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Alumni should have active role in inspiring current HS sports programs | Opinion</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Chris Lillstrung
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Created: Saturday, July 15th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Article Two */}
            <Card variant="outlined">
              <CardOverflow
                sx={{
                  borderBottom: '.5px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover
                sx={{
                  backgroundImage: `url(${articleTwoImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                  <a href="https://www.jamesgmartin.center/2023/05/undoing-diversity-equity-and-inclusion-requires-alumni-effort/" target="_blank" rel="noopener noreferrer">click</a>
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Undoing “Diversity, Equity, and Inclusion” Requires Alumni Effort</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Garland Tucker
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Created: Monday, May 29th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Article Three */}
            <Card variant="outlined">
              <CardOverflow
                sx={{
                  borderBottom: '.5px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover
                sx={{
                  backgroundImage: `url(${articleThreeImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                  <a href="https://www.bu.edu/articles/2023/5-tips-for-life-after-college-a-guide-to-living-life-as-an-alumni/" target="_blank" rel="noopener noreferrer"
                 
                  > click</a>
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>5 Tips for Life After College: A Guide To Living Life As An Alumni</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Jada Warmington
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Posted: Tuesday, May 16th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Sheet>
    </div>
  );
}

export default Explore;