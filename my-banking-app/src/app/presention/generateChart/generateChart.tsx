// src\app\presention\generateChart\generateChart.tsx

import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

const generateChart = () => {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  // Extrair séries de dados selecionadas
  const selectedSeries = chartLabels.filter((label) => {
    const checkbox = document.getElementById(label) as HTMLInputElement;
    return checkbox.checked;
  });

  // Preparar dados para o gráfico
  const datasets: ChartDataset[] = selectedSeries.map((label) => {
    return {
      label: label,
      data: chartData.map((row) => row[label]),
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Personalize conforme necessário
      borderColor: 'rgba(75, 192, 192, 1)', // Personalize conforme necessário
      borderWidth: 1,
    };
  });

  // Configuração do gráfico
  const config: ChartData = {
    labels: chartData.map((row) => row[chartLabels[0]]), // Supondo que o primeiro rótulo seja o eixo X
    datasets: datasets,
  };

  // Opções do gráfico
  const options: ChartOptions = {
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
