import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Container from 'components/Container';

const mock = [
  {
    title: 'Rewards',
    subtitle:
      'We meet with your team to know more about your idea, project and goal. After that, our team sits to create an action plan and proposal for your project.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="48"
        height="48"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#A58C63"
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2c.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8c-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119c0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3c-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7c4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124c-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5c-33.8-12.2-49.5-31.9-49.5-57.3c0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2c47.3 14.4 63.2 34.4 63.2 65.1c0 39.1-29.4 62.6-72 66.4z"
        />
      </svg>
    ),
  },
  {
    title: 'No Bullshit',
    subtitle:
      'No disclaimers, no fake bots, no testimonials, no scam, no fancy talky talk. You have doubts? We totaly understand and we take it seriously. Therefore, we share everything! Our source code is open source and vefified. Want to know more? Click here. What you will find: architecture, source code, accounts number, payouts and documentation. Still curious? info@infini-soft.com, we will take time to discuss.',
    icon: (
      <svg
        width="31"
        height="44"
        viewBox="0 0 31 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.307434 28.0679C0.307434 32.0001 1.54472 35.4577 4.0193 38.4408C6.49387 41.4238 9.66337 43.1526 13.5278 43.6272C18.1379 44.1696 22.1379 42.9492 25.5278 39.9662C28.9176 36.9831 30.6125 33.2204 30.6125 28.6781V22.1696C30.6125 21.2882 30.2396 20.3391 29.4939 19.3221C28.7481 18.3052 27.6973 17.7967 26.3413 17.7967V28.6781C26.3413 31.8645 25.1549 34.5425 22.782 36.712C20.4091 38.8814 17.5956 39.8306 14.3413 39.5594C11.5617 39.0848 9.23964 37.7459 7.37523 35.5425C5.51082 33.3391 4.57862 30.8475 4.57862 28.0679V15.4577C3.42608 15.4577 2.42608 15.8814 1.57862 16.7289C0.731163 17.5764 0.307434 18.6103 0.307434 19.8306V28.0679ZM19.8329 13.3221V21.9662H24.104V13.3221C24.104 11.8306 23.3922 11.0848 21.9685 11.0848C20.5447 11.0848 19.8329 11.8306 19.8329 13.3221ZM13.3244 2.44077V21.9662H17.5956V2.44077C17.5956 1.01704 16.8837 0.305176 15.46 0.305176C14.0362 0.305176 13.3244 1.01704 13.3244 2.44077ZM6.81591 13.3221V21.9662H11.0871V13.3221C11.0871 11.8306 10.3752 11.0848 8.9515 11.0848C7.52777 11.0848 6.81591 11.8306 6.81591 13.3221Z"
          fill="#A58C63"
        />
      </svg>
    ),
  },
  {
    title: 'Development',
    subtitle:
      'We develop your website using the best practices and standards, so you have a perfectly responsive, lightning fast, and super scalable website.',
    icon: (
      <svg
        width={42}
        height={42}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Launch & Maintenance',
    subtitle:
      'When the project is ready, we help you to launch it and push it live. After that, we meet with your team to train them on how to edit, update and scale it.',
    icon: (
      <svg
        width={42}
        height={42}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const MoreDetails = () => {
  const theme = useTheme();

  return (
    <Container>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid key={i} item xs={12} md={6}>
            <ListItem
              component="div"
              disableGutters
              sx={{
                alignItems: 'flex-start',
                padding: 0,
              }}
            >
              <ListItemAvatar>
                <Box color={theme.palette.primary.main}>{item.icon}</Box>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={item.subtitle}
                primaryTypographyProps={{
                  variant: 'h6',
                  gutterBottom: true,
                  sx: { fontWeight: 700 },
                }}
                sx={{
                  margin: 0,
                }}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MoreDetails;
