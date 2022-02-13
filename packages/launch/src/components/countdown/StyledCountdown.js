import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Container from 'components/Container';
import useCountdown from './useCountdown';

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width="48"
    height="48"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#f8f8f8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6"
        stroke="#f8f8f8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>

);

const StyledCountdown = ({ end, title }) => {
  const theme = useTheme();
  const { formatedCountdown } = useCountdown({ end });

  return (
    <Container>
      <Card sx={{ p: { xs: 2, md: 4 } }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems={'flex-start'}>
            <ListItemIcon>
              <Avatar
                variant={'rounded'}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  padding: '5px'
                }}
              >
                {icon}
              </Avatar>
            </ListItemIcon>
            <Box marginY={0.5}>
              <Typography color={'text.secondary'}>{title}</Typography>
              <Typography
                variant={'h5'}
                color={'text.primary'}
                fontWeight={700}
                display={'flex'}
                alignItems={'flex-end'}
              >
                {formatedCountdown}
              </Typography>
            </Box>
          </ListItem>
        </List>
        {/* <Box
          sx={{
            m: { xs: -2, md: -4 },
            marginTop: '16px !important',
            paddingX: { xs: 2, md: 4 },
            paddingY: 2,
          }}
          bgcolor={'alternate.main'}
        >
          <Link color={'primary'} href="#" underline={'none'}>
            View more
          </Link>
        </Box> */}
      </Card>
    </Container>
  );
};

export default StyledCountdown;
