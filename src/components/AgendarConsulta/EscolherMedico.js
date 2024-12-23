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
import { FaTimes } from 'react-icons/fa'; // Ícone de X
import 'moment/locale/pt-br'; // Importar locale para português do Brasil
import { LteMobiledataSharp } from '@mui/icons-material';
import { Modal, Button, Form, Row, Col, Collapse } from 'react-bootstrap'

const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale('pt-br');
const localizer = momentLocalizer(moment);


function EscolherMedico() {
    const [selectedTime, setSelectedTime] = useState(null);
    const [consulta, setConsulta] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const keyIdEvento = localStorage.getItem('keyIdEvento')
    const nomePacliente = localStorage.getItem('nomePacliente')
    const idPacliente = localStorage.getItem('idPacliente')
    const keyDataEvento = localStorage.getItem('keyDataEvento')
    const keyIdEspecialidade = localStorage.getItem('keyIdEspecialidade')
    const [aviso, setAviso] = useState(false);


    useEffect(() => {
     
        if (!localStorage.hasOwnProperty("idPacliente") && !localStorage.hasOwnProperty("nomePacliente") &&
         !localStorage.hasOwnProperty("keyIdEspecialidade") && !localStorage.hasOwnProperty("keyIdEvento")) {
            window.location.href = '/agendar/consulta'
         }

    }, [])

    useEffect(() => {
        async function listar() {

            await apiC.post("consultarAgenda/buscarMedico", {
                "idEvento": keyIdEvento,
                "idMedico": 1,
                "keyDataEvento": keyDataEvento,
                "keyIdEspecialidade": keyIdEspecialidade,
            })
                .then(response => {
                    console.log("response", response.data)
                    //  apiC.post("consultarAgenda/buscarMedico", {
                    //     "keyDataEvento": keyDataEvento,
                    // })
                    //     .then(response => {
                    //         console.log("response", response.data)
                            
                    //         setConsulta(response.data[0])
                    //     })
                    //     .catch((error) => {
        
                    //     });
                    setConsulta(response.data)
                })
                .catch((error) => {

                });
        }
        listar()
    }, [])

    // const generateTimeSlots = () => {
    //     const start = new Date(consulta.start);
    //     const end = new Date(consulta.end);
    //     const slots = [];

    //     while (start <= end) {
    //         slots.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    //         start.setMinutes(start.getMinutes() + 30); // Incrementa 30 minutos
    //     }

    //     return slots;
    // };

    const handleButtonClick = (time) => {
        const selectedDate = new Date(keyDataEvento);
        const formattedDate = selectedDate.toLocaleDateString(); // Formato DD/MM/AAAA
        setSelectedSlot({ time, date: formattedDate });
    };

    function converterDataISOParaMySQL(dataISO) {
        const [day, month, year] = dataISO.split('/').map(Number);
    
        const jsDate = new Date(year, month - 1, day);
        
        console.log("jsDate", jsDate);

        return format(jsDate, 'yyyy-MM-dd');
    }


    const handleAvancar = () => {

        let date = converterDataISOParaMySQL(selectedSlot.date)

        apiC.post("consultarAgenda/inserirAgendamentoPacliente", {
            "horario": selectedSlot.time,
            "dataAgendada": date,
            "id_pacliente": idPacliente,
            "id_medico": 1,
            "especialidade": consulta[0].especialidade,
            "keyIdEspecialidade": keyIdEspecialidade,
        })
            .then(response => {

                localStorage.removeItem('keyIdEvento');
                localStorage.removeItem('nomePacliente');
                localStorage.removeItem('keyIdEvento');
                localStorage.removeItem('keyIdEspecialidade');
                localStorage.removeItem('idPacliente');
                sucess()

            })
            .catch((error) => {
                alert("erro ao agendar")
            });
    };

    async function sucess(params) {
        setAviso(true)
        setTimeout(() => {
            setAviso(false)
            window.location.href = '/agendar/consulta'; // Substitua '/outra-pagina' pela sua rota
        }, 3000);

    }
    const voltar = () => {
        window.location.href = '/agendar/consulta/dia'     
};

    return (

        <div className="container">
            < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                        <i className="fas fa-arrow-circle-left fsi"  ></i>
                        <h3 className="voltar-titulo">
                            VOLTAR
                        </h3>
                    </Button>
            {aviso && consulta.length > 0 &&
                <Modal.Body>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <h2 style={{ flex: 1, textAlign: 'center' }}>
                                <i className="fa fa-check-circle" aria-hidden="true" style={{ fontSize: '52px', color: 'green' }}></i>
                            </h2>

                        </div>
                        <h2 style={{ flex: 1, textAlign: 'center' }}>
                            Disponibilidade alterada com Sucesso!
                        </h2>
                    </Form>
                </Modal.Body>
            }
            {!aviso && consulta.length > 0 &&
                <h2>Selecione um horario abaixo</h2>
            }
           
            {!aviso && consulta.length > 0 &&
                <p><strong>Médico:</strong> {consulta[0].nomeMedico}</p>
            }
            {!aviso && consulta.length > 0 &&
                <p><strong>CRM:</strong> {consulta[0].crm}</p>
            }
            {!aviso && consulta.length > 0 &&
                <p><strong>RQE:</strong> {consulta[0].rqe}</p>
            }
            {!aviso && consulta.length > 0 &&
                <p><strong>Especialidade:</strong> {consulta[0].especialidade}</p>
            }
            {!aviso && consulta.length > 0 &&
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginTop: '20px',
                }}>
                    
                    {consulta.map((time, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(time.slot)}
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
                            {time.slot}
                        </button>
                    ))}
                </div>
            }
            {!aviso && selectedSlot && (
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
                        onClick={handleAvancar} >
                        Confirmar agendamento
                    </button>
                </div>
            )

            }


        </div>
    );
}


export default EscolherMedico;


