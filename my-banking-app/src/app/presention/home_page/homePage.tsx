// src\app\presentation\HomePage.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Papa from 'papaparse';

const Chart = dynamic(() => import('react-chartjs-2'), { ssr: false });

const HomePage: React.FC = () => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const parseCSV = (data: string) => {
    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setChartData(results.data);
        setChartLabels(Object.keys(results.data[0]));
      },
    });
  };

  const displayDataPreview = (data: any[]) => {
    const dataPreviewDiv = document.getElementById('dataPreview');

    if (!dataPreviewDiv) {
      console.error("Element with id 'dataPreview' not found.");
      return;
    }

    dataPreviewDiv.innerHTML = '<h3>Prévia dos Dados:</h3>';

    // Criar uma tabela para exibir a prévia dos dados
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Criar o cabeçalho da tabela
    const headerRow = document.createElement('tr');
    chartLabels.forEach((label) => {
      const th = document.createElement('th');
      th.textContent = label;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Criar as linhas da tabela
    data.slice(0, 5).forEach((rowData) => {
      const row = document.createElement('tr');
      chartLabels.forEach((label) => {
        const td = document.createElement('td');
        td.textContent = rowData[label];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    dataPreviewDiv.appendChild(table);
  };

  const generateChart = () => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    // Extrair séries de dados selecionadas
    const selectedSeries = chartLabels.filter((label) => {
      const checkbox = document.getElementById(label) as HTMLInputElement;
      return checkbox.checked;
    });

    // Preparar dados para o gráfico
    const datasets = selectedSeries.map((label) => {
      return {
        label: label,
        data: chartData.map((row) => row[label]),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Personalize conforme necessário
        borderColor: 'rgba(75, 192, 192, 1)', // Personalize conforme necessário
        borderWidth: 1,
      };
    });

    // Configuração do gráfico
    const config = {
      labels: chartData.map((row) => row[chartLabels[0]]), // Supondo que o primeiro rótulo seja o eixo X
      datasets: datasets,
    };

    // Opções do gráfico
    const options = {
      // Adicione opções de personalização do gráfico aqui
    };

    // Destruir a instância do gráfico anterior, se existir
    if (window.myChart) {
      window.myChart.destroy();
    }

    // Criar nova instância do gráfico
    window.myChart = new Chart(ctx, {
      type: chartType,
      data: config,
      options: options,
    });
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

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4">Sistema Bancário</h1>
      <input type="file" id="csvFileInput" accept=".csv" onChange={handleFileChange} className="mb-4" />
      <div id="dataPreview">{/* Call displayDataPreview here */}</div>
      <div>
        <label htmlFor="chartType">Tipo de Gráfico:</label>
        <select id="chartType" value={chartType} onChange={(e) => setChartType(e.target.value as any)}>
          <option value="bar">Barras</option>
          <option value="line">Linhas</option>
          <option value="pie">Pizza</option>
        </select>
      </div>
      <div>{/* Add other chart options here */}</div>
      <button onClick={generateChart} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Gerar Gráfico
      </button>
      <div className="mt-4">
        <Chart data={{ labels: chartLabels, datasets: [] }} type={chartType} />
      </div>
    </div>
  );
};

export default HomePage;
