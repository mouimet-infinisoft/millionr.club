import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  ChartStreaming,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const data = {
  datasets: [
    {
      label: 'Reward Balance Total',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      cubicInterpolationMode: 'monotone',
      data: [],
    },
  ],
};




const GraphAccountBalance = ({onRefresh}) => {
  const _onRefresh = (chart) => {
    const now = Date.now();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push({
        x: now,
        y: onRefresh(),
      });
    });
  };

  const options = {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
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
        title: {
          display: true,
          text: 'Wei',
        },
        min: 0,
        max: 25000
      },
    },
    interaction: {
      intersect: false,
    },
  };
  
  return (
    <Container>
      <Card>
        <Box
          bgcolor={'alternate.main'}
        >         
          <div>
            <Line options={options} data={data} />;
          </div>
        </Box>
      </Card>
    </Container>
  );
};

export default GraphAccountBalance;
