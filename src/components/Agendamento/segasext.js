import React, { useEffect, useState } from 'react';

const App = () => {
  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    const startDate = new Date('2024-09-18');
    const endDate = new Date('2024-10-15');
    const weekdaysArray = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDay();
      if (day >= 1 && day <= 5) { // 1 = segunda, 5 = sexta
        weekdaysArray.push(new Date(date));
      }
    }

    setWeekdays(weekdaysArray);
  }, []);

  return (
    <div>
      <h1>Datas de Segunda a Sexta</h1>
      <ul>
        {weekdays.map((date, index) => (
          <li key={index}>{date.toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

function segasext(){
  const startDate = new Date('2024-09-18');
    const endDate = new Date('2024-10-15');
    const weekdaysArray = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDay();
      if (day >= 1 && day <= 5) { // 1 = segunda, 5 = sexta
        weekdaysArray.push(new Date(date));
      }
    }

    return weekdaysArray;
}

export default segasext;