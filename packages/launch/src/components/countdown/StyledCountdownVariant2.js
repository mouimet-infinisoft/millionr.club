import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import useCountdown from './useCountdown';

const StyledCountdownVariant2 = ({ end, title, membershipAvailable }) => {
  const theme = useTheme();
  const { formatedCountdown } = useCountdown({ end });

  return (
    <Container >
      <Card >
        <Box
        bgcolor={'alternate.main'}
          sx={{
            p: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Box>
            <Typography gutterBottom>{title}</Typography>
            <Typography
              variant={'h4'}
              color={'primary'}
              fontWeight={700}
              display={'flex'}
              alignItems={'flex-end'}
              lineHeight={1}
            >
              {formatedCountdown}
              <Typography
                component={'span'}
                variant={'subtitle2'}
                color={'text.secondary'}
                marginLeft={1}
              >
                remaining
              </Typography>
            </Typography>
          </Box>
          <Typography
            component={'span'}
            variant={'caption'}
            fontWeight={700}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: 1,
              bgcolor: alpha(
                true
                  ? theme.palette.warning.light
                  : theme.palette.success.light,
                0.1,
              ),
              color: true
                ? theme.palette.warning.dark
                : theme.palette.success.dark,
              paddingX: 1,
              paddingY: 0.5,
              borderRadius: 4,
            }}
          >
            <Box
              component={'svg'}
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              marginRight={0.5}
            >
              {true ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              )}
            </Box>
            {membershipAvailable} left
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default StyledCountdownVariant2;
