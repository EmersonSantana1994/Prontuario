import React, { useEffect, useState } from 'react';

const QuartasFeiras = () => {
  const [quartas, setQuartas] = useState([]);

  useEffect(() => {
    const startDate = new Date('2024-09-18');
    const endDate = new Date('2024-12-18');
    const quartasFeiras = [];

    // Ajusta a data inicial para a próxima quarta-feira se necessário
    while (startDate.getDay() !== 3) {
      startDate.setDate(startDate.getDate() + 1);
    }

    // Loop para encontrar todas as quartas-feiras
    while (startDate <= endDate) {
      quartasFeiras.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 7); // Avança uma semana
    }

    setQuartas(quartasFeiras);
  }, []);

  return (
    <div>
      <h1>Quartas-feiras de 18/09/2024 a 18/12/2024</h1>
      <ul>
        {quartas.map((data, index) => (
          <li key={index}>{data.toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};


function semanalmente(inicio, termino, dia){
    const startDate = new Date(inicio);
    const endDate = new Date(termino);
    const day = dia;
    const quartasFeiras = [];

    // Ajusta a data inicial para a próxima quarta-feira se necessário
    while (startDate.getDay() !== day) {
      startDate.setDate(startDate.getDate() + 1);
    }

    // Loop para encontrar todas as quartas-feiras
    while (startDate <= endDate) {
      quartasFeiras.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 7); // Avança uma semana
    }

    return quartasFeiras
}

export default semanalmente;