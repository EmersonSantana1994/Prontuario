import React, { useState, useEffect } from 'react';/*eslint-disable*/
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
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



function BuscaEspecialidade() {
    const [query, setQuery] = useState('');
    const [idQuery, setIdQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    let contador = 0
    let itensVar = []
    let array = []

    useEffect(() => {
     
        if (!localStorage.hasOwnProperty("idPacliente") && !localStorage.hasOwnProperty("nomePacliente")) {
            window.location.href = '/agendar/consulta'
         }

    }, [])

    const handleChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 0) { // A pesquisa começa após 3 caracteres
            const response = await apiC.post('consultarAgenda/especialidade', {
                "especialidade": value,
            }) .then(response => {
                setSuggestions(response.data)
            })
            .catch((error) => {
                alert("erro ao pesquisarar")
                setSuggestions([]);
                setSelectedSpecialty(null);
            })
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (specialty) => {
        setQuery(specialty.especialidade);
        setIdQuery(specialty.id_especialidade)
        setSelectedSpecialty(specialty);
        setSuggestions([]); // Limpa as sugestões após selecionar
    };

    const handleAdvance = () => {
        if (selectedSpecialty) {

            localStorage.setItem('keyIdEspecialidade', idQuery);
             window.location.href = '/agendar/consulta/dia'
        }
    };
    const voltar = () => {
             window.location.href = '/agendar/consulta'     
    };

    return (
        <div className="container">
             < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                        <i className="fas fa-arrow-circle-left fsi"  ></i>
                        <h3 className="voltar-titulo">
                            VOLTAR
                        </h3>
                    </Button>
            <h1 className="title">Qual especialidade você precisa?</h1>
            <input
                type="text"
                className="input-field"
                value={query}
                onChange={handleChange}
                placeholder="Digite uma especialidade médica"
            />
            <ul className="suggestions-list">
                {suggestions.map(specialidade => (
                    <li
                        key={specialidade.id_especialidade}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(specialidade)} // Ao clicar, seleciona a especialidade
                    >
                        {specialidade.especialidade}
                    </li>
                ))}
            </ul>
            {selectedSpecialty && (
                <button className="advance-button" onClick={handleAdvance}>Avançar</button>
            )}
        </div>
    );
}


export default BuscaEspecialidade;


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