import React, { useState, useEffect } from 'react';/*eslint-disable*/
import moment from 'moment';
import './buscarEspecialidade.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { apiC } from "../../conexoes/api";
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { seguirAgendamento } from '../../actions/actions';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X
import 'moment/locale/pt-br'; // Importar locale para português do Brasil
import { LteMobiledataSharp } from '@mui/icons-material';
const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale('pt-br');
const localizer = momentLocalizer(moment);
const keyIdEvento = localStorage.getItem('keyIdEvento')
const nomePacliente = localStorage.getItem('nomePacliente')

function EscolherMedico() {
    const [selectedTime, setSelectedTime] = useState(null);
    const [consulta, setConsulta] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        async function listar() {

            await apiC.post("consultarAgenda/buscarMedico", {
                "idEvento": keyIdEvento,
            })
                .then(response => {
                    console.log("response", response.data)
                    setConsulta(response.data[0])
                })
                .catch((error) => {

                });
        }
        listar()
    }, [])

    const generateTimeSlots = () => {
        const start = new Date(consulta.start);
        const end = new Date(consulta.end);
        const slots = [];
    
        while (start <= end) {
          slots.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          start.setMinutes(start.getMinutes() + 30); // Incrementa 30 minutos
        }
    
        return slots;
      };

      const handleButtonClick = (time) => {
        const selectedDate = new Date(consulta.start);
        const formattedDate = selectedDate.toLocaleDateString(); // Formato DD/MM/AAAA
        setSelectedSlot({ time, date: formattedDate });
      };




    return (
        <div className="container">
            <h2>Selecione um horario abaixo</h2>
      <p><strong>Médico:</strong> {consulta.nomeMedico}</p>
      <p><strong>CRM:</strong> {consulta.crm}</p>
      <p><strong>RQE:</strong> {consulta.rqe}</p>
      <p><strong>Especialidade:</strong> {consulta.especialidade}</p>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px',
      }}>
        {generateTimeSlots().map((time, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(time)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              flex: '0 1 auto', // Para os botões não ficarem muito largos
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            {time}
          </button>
        ))}
      </div>

      {selectedSlot && (
        <div style={{ marginTop: '20px' }}>
          <p>Horário Selecionado: {selectedSlot.time}</p>
          <p>Data Selecionada: {selectedSlot.date}</p>
          <p>Para: {nomePacliente}</p>
          <button
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#008CBA',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Confirmar agendamento
          </button>
        </div>
      )}

        </div>
    );
}


export default EscolherMedico;


