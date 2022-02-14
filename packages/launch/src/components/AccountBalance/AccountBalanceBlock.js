import React from 'react';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';

const AccountBalanceBlock = ({ children }) => {
  return (
    <Container bgcolor={'alternate.main'}>
      <Typography
        variant={'h3'}
        color={'primary'}
        fontWeight={700}
        display={'flex'}
        alignItems={'flex-end'}
        lineHeight={1}
      >
        Accounts
      </Typography>

      {children}
    </Container>
  );
};

export default AccountBalanceBlock
