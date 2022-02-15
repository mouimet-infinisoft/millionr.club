import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import Container from 'components/Container';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {useVipMembersBalance} from './useVipMemberAccount';
import {useAccountBalance} from './useAccountBalance';
ChartJS.register(
  ChartStreaming,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


const data = {
  datasets: [
    {
      type: 'line',
      label: 'Total Reward Amount',
      borderColor: 'rgba(36, 255, 0, 0.9)',
      backgroundColor: 'rgba(36, 255, 0, 0.5)',
      yAxisID: 'y',
    },
    {
      type: 'bar',
      label: 'VIP Member left',
      backgroundColor: 'rgba(0, 0, 255, 0.9)',
      yAxisID: 'y1',
    },
  ],
};

const GraphAccountBalanceMilie = ({ onRefresh }) => {
  const {balance:vipBalance} = useVipMembersBalance();
  const {balance:vipAccountBalance} = useAccountBalance({account:"0x29fD477b2981dDBa3Cda89a633289E54C197BcB9"});

  const _onRefresh = (chart) => {
    const now = Date.now();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push({
        x: now,
        y: dataset.yAxisID === 'y' ? vipBalance : vipAccountBalance[0],
        y1: dataset.yAxisID === 'y1' ? vipBalance : vipAccountBalance[0],
      });
    });
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        pointStyle: 'rectRounded',
      },

      line: {
        cubicInterpolationMode: 'montone',
        borderJoinStyle: 'bevel',
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuart',
        from: 1,
        to: 0,
        loop: true,
      },
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'MillionR',
        color: 'rgb(255, 99, 132)',
      },
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: _onRefresh,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        max:200,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 200
      },
    },
  };

  return (
    <Container>
      <Card>
        <Box bgcolor={'alternate.main'}>
          <div>
            <Line options={options} data={data} />
          </div>
        </Box>
      </Card>
    </Container>
  );
};

export default GraphAccountBalanceMilie;
