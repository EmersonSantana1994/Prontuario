import React, { useState } from 'react';

const DiasDaSemana = () => {
  const [diaEscolhido, setDiaEscolhido] = useState(null);

  const handleDia = (event) => {
    setDiaEscolhido(Number(event.target.value));
  };

  return (
    <div>
      <h4>Escolha um dia da semana:</h4>
      <div>
        <label className='diassemana'>
          <input
            type="radio"
            value="0"
            checked={diaEscolhido === 0}
            onChange={handleDia}
          />
          Domingo
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="1"
            checked={diaEscolhido === 1}
            onChange={handleDia}
          />
          Segunda-feira
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="2"
            checked={diaEscolhido === 2}
            onChange={handleDia}
          />
          Terça-feira
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="3"
            checked={diaEscolhido === 3}
            onChange={handleDia}
          />
          Quarta-feira
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="4"
            checked={diaEscolhido === 4}
            onChange={handleDia}
          />
          Quinta-feira
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="5"
            checked={diaEscolhido === 5}
            onChange={handleDia}
          />
          Sexta-feira
        </label>
        <label className='diassemana'>
          <input
            type="radio"
            value="6"
            checked={diaEscolhido === 6}
            onChange={handleDia}
          />
          Sábado
        </label>
      </div>
      {/* <p>Dia escolhido: {diaEscolhido !== null ? diaEscolhido : 'Nenhum escolhido'}</p> */}
    </div>
  );
};

export default DiasDaSemana;