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
import { useSelector, useDispatch } from 'react-redux';
import { seguirAgendamento } from '../../actions/actions';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X
import 'moment/locale/pt-br'; // Importar locale para português do Brasil
import { LteMobiledataSharp } from '@mui/icons-material';
const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale('pt-br');
const localizer = momentLocalizer(moment);



function Calendario() {
    const despacho = useDispatch();
    console.log("eventosPadrao", eventosPadrao)
    const idConsultorio = useSelector(state => state.reduxH.consultorio);
    // const [eventos, setEventos] = useState(eventosPadrao);
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, SeteventoSelecionado] = useState(null);
    // const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [isModalOpenSucesso, setIsModalOpenSucesso] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let contador = 0
    let itensVar = []
    let array = []

    useEffect(() => {

        async function getAgendamento() {
            const novoEventoPadrao = []
            await apiC.post("agenda/buscartudo", {
                "id_consultorio": idConsultorio,
                "id_medico": 1
            }).then(response => {

                if (response.status === 200) {
                    console.log("responseeee", response.data)

                    for (let i = 0; i < response.data.length; i++) {


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

                    console.log("fffffffffff", array)
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
        const jsDate = new Date(dataISO);
return format(jsDate, 'yyyy-MM-dd HH:mm:ss');
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
    const messages = {
        today: 'Hoje',
        previous: 'Anterior',
        next: 'Próximo',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        noEventsInRange: 'Nenhum evento neste intervalo',
        // showMore: (total) => `+ Mais ${total} ${total === 1 ? 'evento' : 'eventos'}`,
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
       console.log("como assimmmmmmmmmmmmm", novoEvento)
        if(novoEvento.repetir){
            
            let startArray = []
            let endArray = []
            for (let j = 0; j < novoEvento.start.length; j++) {
                startArray.push(converterDataISOParaMySQL(novoEvento.start[j])) 
                endArray.push(converterDataISOParaMySQL(novoEvento.end[j])) 
            }
            apiC.post("agenda/repetir", {
                "title": novoEvento.title,
                "start": startArray,
                "end": endArray,
                "desc": novoEvento.desc,
                "color": novoEvento.color,
                "tipo": novoEvento.tipo,
                "id_consultorio": idConsultorio,
                "id_medico": 1,
                "tamanho": novoEvento.start.length,
                "comeco": novoEvento.comeco,
                "fim": novoEvento.fim,
            })
                .then(response => {
    
                    if (response.status === 200) {
                        setIsModalOpenSucesso(true)
                        setEventos([...eventos, { ...novoEvento, id: eventos.length + startArray.length }]);
                        
                    }
                })
                .catch((error) => {
                    if (error.response.data) {
                        if(error.response.data == '112'){
                            setIsModalOpen(true)
                        }
                        
                      
                        
                    }
    
                });

        }else{

            const start = converterDataISOParaMySQL(novoEvento.start);
            const end = converterDataISOParaMySQL(novoEvento.end);
    
            apiC.post("agenda/reservarAgendaMedica", {
                "title": novoEvento.especialidade,
                "start": start,
                "end": end,
                "desc": novoEvento.desc,
                "color": novoEvento.color,
                "tipo": novoEvento.tipo,
                "id_consultorio": idConsultorio,
                "id_medico": 1,
                "repetir":6
            })
                .then(response => {
    
                    if (response.status === 200) {
                        setIsModalOpenSucesso(true)
                        setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
                    }
                })
                .catch((error) => {
                    if (error.response.data) {
                        if(error.response.data == '112'){
                            setIsModalOpen(true)
                        }
                        
                      
                        
                    }
    
                });
        }





    };

    console.log("yyyyyyyyy22",isModalOpenSucesso )
    // Função para abrir o modal
    const openModal = () => setIsModalOpen(true);

    // Função para fechar o modal
    const closeModal = () => setIsModalOpen(false);

    const closeModalSucesso = () => setIsModalOpenSucesso(false);
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
                    messages={messages}
                    className='calendar'

                />
            </div>
            {eventoSelecionado && (
                <EventModal evento={eventoSelecionado} onClose={handleEventClose} onDelete={handleEventDelete} onUpdate={handleEventUpdate}></EventModal>
            )}
           
            {isModalOpen &&
                  <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Mensagem de Aviso"
                  style={{
                    overlay: {
                      backgroundColor: 'rgb(0 0 0 / 17%)',
                    },
                    content: {
                      color: 'black',
                      padding: '20px',
                      borderRadius: '10px',
                      maxWidth: '500px',
                      margin: 'auto',
                      position: 'relative',
                    },
                  }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '435px' }}>
                    <FaTimes
                      onClick={closeModal}
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <h2 style={{ flex: 1, textAlign: 'center' }}>
                    <i class="fa fa-times-circle" aria-hidden="true" style={{ fontSize:'52px', color: 'red' }}></i>
                    </h2>
                    
                  </div>
                  <h2 style={{ flex: 1, textAlign: 'center' }}>
                    Não foi possível enviar
                    </h2>
                  <p style={{ textAlign: 'center' }}>
                    A data e hora selecionadas já estão registradas na agenda.
                  </p>
                </Modal>
            }
            {isModalOpenSucesso &&
                console.log("foiiiiii simmmmmm", isModalOpenSucesso)
            }

           
            {isModalOpenSucesso &&
            
                  <Modal
                  isOpen={isModalOpenSucesso}
                  onRequestClose={closeModalSucesso}
                  contentLabel="Mensagem de Aviso"
                  style={{
                    overlay: {
                      backgroundColor: 'rgb(0 0 0 / 17%)',
                    },
                    content: {
                      color: 'black',
                      padding: '20px',
                      borderRadius: '10px',
                      maxWidth: '500px',
                      margin: 'auto',
                      position: 'relative',
                    },
                  }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '435px' }}>
                    <FaTimes
                      onClick={closeModalSucesso}
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <h2 style={{ flex: 1, textAlign: 'center' }}>
                    <i class="fa fa-check-circle" aria-hidden="true" style={{ fontSize:'52px', color: 'green' }}></i>
                    </h2>
                    
                  </div>
                  <h2 style={{ flex: 1, textAlign: 'center' }}>
                  Disponibilidade adicionada com Sucesso!
                    </h2>
                 
                </Modal>
            }
        </div>
        
    );
}


export default Calendario;


{/* <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModalSucesso}
                  contentLabel="Mensagem de Aviso"
                  style={{
                    overlay: {
                      backgroundColor: 'rgb(0 0 0 / 17%)',
                    },
                    content: {
                      color: 'black',
                      padding: '20px',
                      borderRadius: '10px',
                      maxWidth: '500px',
                      margin: 'auto',
                      position: 'relative',
                    },
                  }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '435px' }}>
                    <FaTimes
                      onClick={closeModalSucesso}
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <h2 style={{ flex: 1, textAlign: 'center' }}>
                    <i class="fa fa fa-check-circle" aria-hidden="true" style={{ fontSize:'52px', color: 'green' }}></i>
                    </h2>
                  </div>
                  <h2 style={{ flex: 1, textAlign: 'center' }}>
                    Agendado com sucesso
                    </h2>
                </Modal> */}