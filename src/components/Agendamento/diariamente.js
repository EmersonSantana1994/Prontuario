import React, { useState, useEffect } from 'react';

const DateRange = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const startDate = new Date('2024-09-18');
    const endDate = new Date('2024-10-15');
    const dateArray = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dateArray.push(new Date(date).toLocaleDateString('pt-BR'));
    }

    setDates(dateArray);
  }, []);

  return (
    <div>
      <h1>Datas de 18/09/2024 a 15/10/2024</h1>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

function segasext(){
  const startDate = new Date('2024-09-18');
  const endDate = new Date('2024-10-15');
  const dateArray = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    dateArray.push(new Date(date).toLocaleDateString('pt-BR'));
  }

  return dateArray ;
}

export default segasext;