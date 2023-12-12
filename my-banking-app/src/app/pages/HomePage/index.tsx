// src/app/pages/HomePage/index.tsx
'use client';
import generateChart from '../../Components/GenerateChart';
import displayDataPreview from '../../Components/DisplayDataPreview';
import { Chart } from 'react-chartjs-2';
import ChartComponent from '@/app/Components/ChartComponent';
import { useState } from 'react';


const HomePage: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]); // Use 'any[]' or replace with the actual type of chartData
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const parseCSV = async (data: string) => {
    try {
      const response = await fetch('/api/csv');
      const { data: csvData } = await response.json();

      // Check if csvData is not empty before accessing its first element
      if (csvData.length > 0) {
        setChartData(csvData);
        setChartLabels(Object.keys(csvData[0]));
        displayDataPreview(csvData, Object.keys(csvData[0]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        parseCSV(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartType(event.target.value as 'bar' | 'line' | 'pie');
  };

  const handleGenerateChart = () => {
    generateChart(chartLabels, chartData, chartType);
  };

  return (
  

    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4">Sistema Bancário</h1>
      <input
        type="file"
        id="csvFileInput"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />
       <ChartComponent chartLabels={chartLabels} chartType={chartType} />
      <div id="dataPreview"></div>
      <div id="myChart" className="h-5 w-5"></div>
      <div>
        <label htmlFor="chartType" >Tipo de Gráfico:</label>
        <select
          id="chartType"
          value={chartType}
          onChange={handleChartTypeChange}
          className="text-black"
        >
          <option value="bar">Barras</option>
          <option value="line">Linhas</option>
          <option value="pie">Pizza</option>
        </select>
      </div>
      <div>
        <button
          onClick={handleGenerateChart}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Gerar Gráfico
        </button>
      </div>
      <br />
      <div className="mt-auto bg-white">
        <Chart data={{ labels: chartLabels, datasets: [] }} type={chartType} />
      </div>
    </div>

    
  );
};



export default HomePage;
