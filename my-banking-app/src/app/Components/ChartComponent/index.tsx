// Crie um novo componente ChartComponent.tsx
import React from 'react';
import { Chart } from 'react-chartjs-2';

interface ChartComponentProps {
  chartLabels: string[];
  chartType: 'bar' | 'line' | 'pie';
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartLabels, chartType }) => {
  return <Chart data={{ labels: chartLabels, datasets: [] }} type={chartType} />;
};

export default ChartComponent;
