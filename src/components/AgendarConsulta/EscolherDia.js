import React, { useState, useEffect } from 'react';/*eslint-disable*/
import moment from 'moment';
import './buscarEspecialidade.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
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



function EscolherDia() {
    const [query, setQuery] = useState('');
    const [idQuery, setIdQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    let contador = 0
    let itensVar = []
    let array = []
    const minhaString = localStorage.getItem('keyIdEspecialidade')
    const [idSelecionado, setIdSelecionado] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [eventos, setEventos] = useState([]);
    const hoje = new Date();
    const eventosFuturos = eventos.filter(evento => new Date(evento.start) > hoje);

    useEffect(() => {
     
        if (!localStorage.hasOwnProperty("idPacliente") && !localStorage.hasOwnProperty("nomePacliente") &&
         !localStorage.hasOwnProperty("keyIdEspecialidade")) {
            window.location.href = '/agendar/consulta'
         }

    }, [])

    useEffect(() => {
        async function listar() {

            await apiC.post("consultarAgenda/buscarDia", {
                "idEspecialidade": minhaString,
            })
                .then(response => {

                    setEventos(response.data)
                })
                .catch((error) => {

                });
        }
        listar()
    }, [])

    const formatarData = (data) => {
        const options = { day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));
    };

    const handleChange = (id, start) => {
        setIdSelecionado(id);
        setDataSelecionada(start);
    };

    const handleAvancar = () => {

            localStorage.setItem('keyIdEvento', idSelecionado);
            localStorage.setItem('keyDataEvento', dataSelecionada);
             window.location.href = '/agendar/consulta/medico'
        // Aqui você pode fazer o que precisar com o ID selecionado
    };

    const voltar = () => {
        window.location.href = '/agendar/consulta/especialidade'     
};

    return (
        <div className="container">
                    < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                        <i className="fas fa-arrow-circle-left fsi"  ></i>
                        <h3 className="voltar-titulo">
                            VOLTAR
                        </h3>
                    </Button>
            <h1 className="title">Selecione abaixo o dia</h1>
            {eventosFuturos.length > 0 ? (
                eventosFuturos.map((evento) => (
                    <div key={evento.id}>
                        <label>
                            <input
                                type="radio"
                                name="evento"
                                value={evento.id}
                                onChange={() => handleChange(evento.id, evento.start)}
                            />
                            {formatarData(evento.start)}
                        </label>
                    </div>
                ))
            ) : (
                <p>Não há eventos futuros disponíveis.</p>
            )}
            {idSelecionado &&
                <button className="advance-button" onClick={handleAvancar}>
                    Avançar
                </button>
            }

        </div>
    );
}


export default EscolherDia;


