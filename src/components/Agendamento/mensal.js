import React from 'react';

const ThirdFridays = () => {
  const getThirdFridays = (start, end) => {
    const result = [];
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Percorre os meses entre as datas de início e fim
    for (let month = startDate.getMonth(); month <= endDate.getMonth(); month++) {
      const year = startDate.getFullYear();
      const date = new Date(year, month, 1);
      
      // Encontra a primeira sexta-feira do mês
      while (date.getDay() !== 5) {
        date.setDate(date.getDate() + 1);
      }
      
      // Adiciona duas semanas para chegar à terceira sexta-feira
      date.setDate(date.getDate() + 14);
      
      // Verifica se a terceira sexta-feira está dentro do intervalo
      if (date >= startDate && date <= endDate) {
        result.push(date.toLocaleDateString());
      }
    }

    return result;
  };

  const thirdFridays = getThirdFridays('2024-09-18', '2024-12-18');

  return (
    <div>
      <h1>Terceiras Sextas-feiras</h1>
      <ul>
        {thirdFridays.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

function mensal(){
 
    const result = [];
    const startDate = new Date('2024-09-18');
    const endDate = new Date('2024-12-18');

    // Percorre os meses entre as datas de início e fim
    for (let month = startDate.getMonth(); month <= endDate.getMonth(); month++) {
      const year = startDate.getFullYear();
      const date = new Date(year, month, 1);
      
      // Encontra a primeira sexta-feira do mês
      while (date.getDay() !== 5) {
        date.setDate(date.getDate() + 1);
      }
      
      // Adiciona duas semanas para chegar à terceira sexta-feira
      date.setDate(date.getDate() + 14);
      
      // Verifica se a terceira sexta-feira está dentro do intervalo
      if (date >= startDate && date <= endDate) {
        result.push(date.toLocaleDateString());
      }
    }

    return result;
  }



export default mensal;