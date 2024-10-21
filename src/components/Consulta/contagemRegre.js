import React, { useState, useEffect } from 'react';


const Modal = () => {
  const [countdown, setCountdown] = useState(3); // Inicia o countdown em 3
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrementa o countdown
      } else {
        setModalVisible(false); // Esconde a modal quando o countdown chegar a 0
      }
    }, 1000); // Intervalo de 1 segundo

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, [countdown]);

  // CSS para estilização da modal
  const modalStyle = {
    display: modalVisible ? 'block' : 'none'
  };

  return (
    <div className="modalRegr" style={modalStyle}>
      <div className="modal-contentRegr">
        <h2>COMECE A FALAR EM</h2>
        <p>{countdown}</p>
      </div>
    </div>
  );
};

export default Modal;