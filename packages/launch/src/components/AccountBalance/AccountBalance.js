import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CountUp } from 'use-count-up';

const AccountBalance = ({ balance, title, variation, unit, decimalPlaces }) => {
  const theme = useTheme();
  const isNegative = variation < 0;
  const onComplete = () => {
    return { shouldRepeat: true, delay: 2 };
  };

  return (
    <Card>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box>
          <Typography gutterBottom textAlign={'left'}>
            {title}
          </Typography>
          <Typography
            variant={'h4'}
            color={'primary'}
            fontWeight={700}
            display={'flex'}
            alignItems={'flex-end'}
            lineHeight={1}
          >
            <CountUp
              isCounting
              decimalPlaces={decimalPlaces}
              end={Number(balance)}
              duration={1}
              onComplete={onComplete}
            />
            <Typography
              component={'span'}
              variant={'subtitle2'}
              color={'text.secondary'}
              marginLeft={1}
            >
              {unit}
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
              isNegative
                ? theme.palette.warning.light
                : theme.palette.success.light,
              0.1,
            ),
            color: isNegative
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
            {isNegative ? (
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
          {variation} {unit}
        </Typography>
      </Box>
    </Card>
  );
};

export default AccountBalance;
