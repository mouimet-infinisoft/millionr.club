import React from 'react';
import Typed from 'react-typed';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import Countdown from '../../../../components/countdown';
import { sendTransaction, requestAccountBalance } from '../Ethereum/operations';

import Container from 'components/Container';
import {
  AccountBalance,
  GraphAccountBalance,
} from '../../../../components/AccountBalance';

const end = '2022/02/22 15:00';
const title = 'VIP Membership offer';
const membershipAvailable = 400;
const doguette = '0xe371517d0A116F42178c23c945386746ffBC6c1C';
const contractAsset = '0x925F9eB672C208d8dD33671fF37e658E03faf11F';
const contractExchange = '0xE049b6230CB6D6978f0aB61d996b40Cd70eD892a';

const Hero = () => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [balance, setBalance] = React.useState([0]);

  const onBuy = async () => {
    try {
      const result = await sendTransaction({
        to: contractExchange,
        from: window.ethereum.selectedAddress,
        value: '1000',
      });
      console.log(`result = `, result);
    } catch (error) {
      console.error(error);
    }
  };

  const onBalance = React.useCallback(async () => {
    try {
      const result = await requestAccountBalance({
        account: contractExchange,
      });
      console.log(`result = `, result);

      timerRef.current = setTimeout(() => {
        if (result !== balance[0]) {
          setBalance((prev) => [result, ...prev]);
        } else {
          setBalance((prev) => [...prev]);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const timerRef = React.useRef({});

  React.useEffect(() => {
    onBalance();

    return () => clearTimeout(timerRef.current);
  }, [onBalance, balance]);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, ${alpha(
          theme.palette.background.paper,
          0,
        )}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
        backgroundRepeat: 'repeat-x',
        position: 'relative',
      }}
    >
      <Box paddingY={{ xs: 0, sm: '4rem', md: '8rem' }}>
        <Container
          display="flex"
          flexDirection={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Box maxWidth={{ xs: 1, sm: '50%' }}>
            <Typography
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Turn your NFT
              <br />
              into{' '}
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, ${alpha(
                    theme.palette.secondary.main,
                    0.3,
                  )} 0%)`,
                }}
              >
                <Typed strings={['millions.']} typeSpeed={80} loop={true} />
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Launching Feb. 22 2022. We offer very limited VIP presale
              memberships. Are you the first millionr?
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
              marginTop={4}
            >
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMd ? false : true}
                onClick={onBuy}
              >
                Buy now
              </Button>
              <Box
                marginTop={{ xs: 2, sm: 0 }}
                marginLeft={{ sm: 2 }}
                width={{ xs: '100%', md: 'auto' }}
              >
                <Button
                  component={'a'}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={isMd ? false : true}
                  onClick={onBalance}
                >
                  More details
                </Button>
              </Box>
            </Box>
            <Countdown.StyledCountdownVariant2
              end={end}
              title={title}
              membershipAvailable={membershipAvailable}
            />
          </Box>

          <Box
            maxWidth={{ xs: 1, sm: '50%' }}
            flex="1 1 auto"
            textAlign="center"
          >
            <LazyLoadImage
              src={
                mode === 'light'
                  ? '/assets/images/millionr-vertical-light.svg'
                  : '/assets/images/millionr-vertical-dark.svg'
              }
            />

            <AccountBalance
              title="Rewards"
              balance={balance?.[0] || 0}
              previousBalance={balance?.[1] || 0}
              unit="Wei"
            />
            <GraphAccountBalance
              onRefresh={()=> balance[0]}
            />
          </Box>
        </Container>
      </Box>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        sx={{
          width: '100%',
          marginBottom: theme.spacing(-1),
        }}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
  );
};

export default Hero;
