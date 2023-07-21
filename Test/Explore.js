import * as React from 'react';
import Typography from '@mui/joy/Typography';
import DescriptionLayout from '../containers/DescriptionLayout';
import ExploreIcon from '@mui/icons-material/Explore';

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

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

    </div>
  );
}

export default Explore;