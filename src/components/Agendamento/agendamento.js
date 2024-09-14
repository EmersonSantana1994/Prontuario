import React, { useState, useEffect } from 'react';/*eslint-disable*/
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './components/Components-Calendario-css.css';
import { apiC } from "../../conexoes/api";
import eventosPadrao from './components/eventosPadrao';
import EventModal from './components/ModalEvent/EventModal.jsx';
import Adicionar from './components/adicionar/adicionar.jsx';
import CustomTollbar from './components/CustomCalendar/CustomTollbar.jsx';
import FiltroAtividades from './components/filtro/FiltroAtividades.jsx';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);


function Calendario() {
    console.log("eventosPadrao", eventosPadrao)
    const idConsultorio = useSelector(state => state.reduxH.consultorio);
    // const [eventos, setEventos] = useState(eventosPadrao);
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, SeteventoSelecionado] = useState(null);
    // const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    let contador = 0
    let itensVar = []
    let array = []

    useEffect(() => {
console.log("pqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
     async function getAgendamento() {
        const novoEventoPadrao = []
         await apiC.post("agenda/buscartudo", {  
            "id_consultorio": idConsultorio,
             "id_medico": 1  
            }).then(response => {

                if (response.status === 200) {
console.log("responseeee", response.data)

for (let i = 0; i <  response.data.length; i++) {


    if (contador == i) {
        let k = i
        for (let j = 0; j < response.data.length; j++) {
            itensVar[k] = response.data[j]
            k++
        }
    }
    array = JSON.parse(JSON.stringify(itensVar))
    
    array.forEach(obj => {
        obj.start = new Date(obj.start);
        obj.end = new Date(obj.end);
      });
}

console.log("fffffffffff",array )
setEventos(array)
setEventosFiltrados(array)

                }
            })
            .catch((error) => {

                alert("erro ao adicionar data", error)
                console.log("error", error)

            });
        
     }   
     getAgendamento()
    }, [])

    function converterDataISOParaMySQL(dataISO) {
        const data = parseISO(dataISO);
        return format(data, 'yyyy-MM-dd HH:mm:ss');
    }

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    const moverEventos = (data) => {
        const { start, end } = data;
        const updatedEvents = eventos.map((event) => {
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            return event;
        });
        setEventos(updatedEvents);
    };

    const handleEventClick = (evento) => {
        SeteventoSelecionado(evento);
    };

    const handleEventClose = () => {
        SeteventoSelecionado(null);
    };



    const handleEventDelete = (eventId) => {
        //Logica do banco
        const updatedEvents = eventos.filter((event) => event.id !== eventId)
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        //Logica do banco
        const updatedEvents = eventos.map((event) => {
            if (event.id === updatedEvent.id) {
                return updatedEvent;
            }
            return event;
        });
        setEventos(updatedEvents);
        SeteventoSelecionado(null);
    }

    const handleSelecionarAtividades = (atividadesSelecionadas) => {
        setEventosFiltrados(atividadesSelecionadas);
    }
    const handleAdicionar = (novoEvento) => {
        console.log("novoEvento do hadler", novoEvento)
        console.log("eventos do hadler", eventos)
        const start = converterDataISOParaMySQL(novoEvento.start);
        const end = converterDataISOParaMySQL(novoEvento.end);

        apiC.post("agenda/reservarAgendaMedica", {
            "title": novoEvento.title,
            "start": start,
            "end": end,
            "desc": novoEvento.desc,
            "color": novoEvento.color,
            "tipo": novoEvento.tipo,
            "id_consultorio": idConsultorio,
            "id_medico": 1
        })
            .then(response => {

                if (response.status === 200) {
                    alert("agendado")
                    setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
                }
            })
            .catch((error) => {
                if(error.response.data){
                    alert(error.response.data)
                }
                alert("não foi possível agendar")

            });
        //Logica do banco
        
    };


    return (
        <div className='tela ' >
            <div className='toolbar p-4' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Adicionar onAdicionar={handleAdicionar} />
                {console.log("eventos", eventos)}
                <FiltroAtividades atividades={eventos} onSelecionarAtividades={handleSelecionarAtividades} />
            </div>
            <div className='calendario'>
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView='month'
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    // components={{
                    //     toolbar: CustomTollbar,
                    // }}
                    className='calendar'
                />
            </div>
            {eventoSelecionado && (
                <EventModal evento={eventoSelecionado} onClose={handleEventClose} onDelete={handleEventDelete} onUpdate={handleEventUpdate}></EventModal>
            )}
        </div>
    );
}


export default Calendario;