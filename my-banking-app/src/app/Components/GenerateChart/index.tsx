// src\app\Components\GenerateChart\index.tsx

import { ChartData, ChartDataset, ChartOptions } from "chart.js";
// import { Chart } from "react-chartjs-2";
import { Chart } from 'chart.js';

const GenerateChart = (
  chartLabels: string[],
  chartData: any[],
  chartType: string
) => {
  // Verifique se Chart.js e ctx estão definidos
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;

  if (typeof Chart !== 'undefined' && ctx) {
    // Extrair séries de dados selecionadas
    const selectedSeries = chartLabels.filter((label: string) => {
      const checkbox = document.getElementById(label) as HTMLInputElement;
      return checkbox.checked;
    });

    // Verifique se há séries de dados selecionadas
    if (selectedSeries.length === 0) {
      console.warn("Nenhuma série de dados selecionada.");
      return;
    }

    // Preparar dados para o gráfico
    const datasets: ChartDataset[] = selectedSeries.map((label) => {
      return {
        label: label,
        data: chartData.map((row: { [x: string]: any }) => row[label]),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Personalize conforme necessário
        borderColor: "rgba(75, 192, 192, 1)", // Personalize conforme necessário
        borderWidth: 1,
      };
    });

    // Verifique se há datasets antes de atribuir à configuração do gráfico
    if (datasets.length === 0) {
      console.warn("Nenhum conjunto de dados disponível para o gráfico.");
      return;
    }

    // Configuração do gráfico
    const config: ChartData = {
      labels: chartData.map((row: { [x: string]: any }) => row[chartLabels[0]]), // Supondo que o primeiro rótulo seja o eixo X
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
    const newChart = new Chart(ctx, {
      type: chartType as "bar" | "line" | "pie",
      data: config,
      options: options,
    });

    // Assign the chart instance to window.myChart
    window.myChart = newChart;
  } else {
    console.error("Chart.js não está definido ou elemento 'myChart' não encontrado.");
  }
};

export default GenerateChart;
