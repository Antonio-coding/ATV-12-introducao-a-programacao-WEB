// src\Components\DisplayDataPreview\index.tsx

const DisplayDataPreview = (data: any[], chartLabels: (string | number)[]) => {
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
  chartLabels.forEach((label: string | number) => {
    const th = document.createElement('th');
    th.textContent = String(label);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Criar as linhas da tabela
  data.slice(0, 5).forEach((rowData) => {
    const row = document.createElement('tr');
    chartLabels.forEach((label: string | number) => {
      const td = document.createElement('td');
      td.textContent = String(rowData[label]);
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  dataPreviewDiv.appendChild(table);
};

export default DisplayDataPreview;
