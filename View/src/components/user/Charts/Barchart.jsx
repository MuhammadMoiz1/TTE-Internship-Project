import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import './Barchart.css';

const dataset = [
  {
    seoul: 15,
    month: 'Screen Crack',
  },
  {
    seoul: 25,
    month: 'Battery Drain',
  },
  {
    seoul: 12,
    month: 'Speaker Issue',
  },
  {
    seoul: 40,
    month: 'Camera Blurry',
  },
  {
    seoul: 30,
    month: 'Button Malfunction',
  },
  {
    seoul: 50,
    month: 'Charging Port Issue',
  },
  {
    seoul: 60,
    month: 'Overheating',
  },
  {
    seoul: 35,
    month: 'Software Bug',
  },
  {
    seoul: 20,
    month: 'Network Problem',
  },
  {
    seoul: 10,
    month: 'Microphone Fault',
  },
  
];



const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'No: of Defects',
    },
  ],
  series: [{ dataKey: 'seoul', label: 'Defects', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function Barchart() {
  const tickPlacement='middle';
  const tickLabelPlacement= 'middle';

  return (
    <div style={{ width: '100%'}}>
      
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement,
           },
        ]}
        bottomAxis={{
          tickLabelStyle: {
            angle: 45,
            textAnchor: 'start',
            fontSize: 8,
          }, 
          
        }}
        borderRadius={10}
        {...chartSetting}
      />
    </div>
  );
}
