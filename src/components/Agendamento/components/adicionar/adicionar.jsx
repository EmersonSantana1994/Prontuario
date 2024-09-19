import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import "./../adicionar/adicionar.css";
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import segasext from './../../segasext'
import diariamente from './../../diariamente'
import semanalmente from '../semanalmente'
import mensal from './../../mensal'
import DiasDaSemana from '../selecaoDiasdaSemana';



function Adicionar({ onAdicionar }) {
    const [salvar, setSalvar] = useState(false);
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',
        color: '',
        tipo: '',
    });
    const [selectedColor, setSelectedColor] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [mostrarCorSelecionada, setMostrarCorSelecionada] = useState(false);
    const nomeDoConsultorio = useSelector(state => state.reduxH.nomeConsultorio);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endtDate, setEndDateDate] = useState("");
    const [dataMin, setDataMin] = useState(1990)
    const [dataMax, setDataMax] = useState(new Date())
    const [startDat, setStartDat] = useState('');
    const [startTime, setStartTime] = useState('');
    const [fimTime, setFimTime] = useState('');
    const [repeat, setRepeat] = useState('selecione');
    const [endDate, setEndDate] = useState('');
    const [mostrarDiasSemana, setMostrarDiasSemana] = useState(false);
    const [showDataFixa, setShowDataFixa] = useState(false);
    const [diaEscolhido, setDiaEscolhido] = useState(null);
    const [novoEventoRepetir, setNovoEventoRepetir] = useState({
        start: [],
        desc: '',
        title: [],
        end: [],
        color: '',
        tipo: '',
        repetir:true
    });

    const [novoEventoRepetirEx, setNovoEventoRepetirEx] = useState({
        desc: '',
        title: [],
        color: '',
        tipo: '',
    });

    const handleDia = (event) => {
        setDiaEscolhido(Number(event.target.value));
    };


    const salve = (e) => {
        setSalvar(true)
    }
    const [date, setDate] = React.useState(new Date());
    const closeModal = () => setIsModalOpen(false);


    async function getSegaSext() {
        const resulSegaSext = segasext();
    }

    async function getDiariamente() {
        const resulDiariament = diariamente();
    }

    async function salvarEventRepetcao() {
       
if(repeat == "weekly"){
    const resulSemanalment = semanalmente(startDat, endDate, diaEscolhido);
    console.log("qual foi ele mesmo emersonnnnnn", resulSemanalment)

    const novaHora = startTime; // sua variável com o valor da hora
    const [horas, minutos] = novaHora.split(':').map(Number); // Divide e converte para números

    const comeco = resulSemanalment.map(data => {
        const novaData = new Date(data);

        // Define a nova hora e minutos com base na variável
        novaData.setHours(horas);
        novaData.setMinutes(minutos);

        return novaData;
    });

    const novaHoraF = fimTime; // sua variável com o valor da hora
    const [horasF, minutosF] = novaHoraF.split(':').map(Number); // Divide e converte para números

    const fim = resulSemanalment.map(data => {
        const novaDataF = new Date(data);

        // Define a nova hora e minutos com base na variável
        novaDataF.setHours(horasF);
        novaDataF.setMinutes(minutosF);

        return novaDataF;
    });

    const objetosStart = comeco.map(data => ({
        nome: "start",
        value: data,
        desc: novoEventoRepetirEx.title
      }));

      const objetosEnd = fim.map(data => ({
        nome: "end",
        value: data,
      }));
      
        const novosStarts = objetosStart.map(obj => obj.value);
        const novosTitles = objetosStart.map(obj => obj.desc);
        setNovoEventoRepetir(prev => ({
            ...prev,
            start: novosStarts,
            title: novosTitles
        }));
    
        const novosEnds = objetosEnd.map(obj => obj.value);
        setNovoEventoRepetir(prev => ({
            ...prev,
            end: novosEnds,
        }));

        adicionaArray()
}


async function adicionaArray() {
    console.log("NovoEventoRepetir", novoEventoRepetir)
    onAdicionar(novoEventoRepetir);
}
        
    }

    async function getMensal() {
        const resulMensal = mensal();
    }

    const handleChangeRepeticao = (e) => {


        if (e == 'red' || e == 'yellow' || e == 'green') {
            const cor = { name: 'color', value: e }
            const { name, value } = cor;
            setNovoEventoRepetirEx({ ...novoEventoRepetirEx, [name]: value });
        } else {
            const { name, value } = e.target;
            setNovoEventoRepetirEx({ ...novoEventoRepetirEx, [name]: value });
        }


    }


    const handleChange = (e) => {


        if (e == 'red' || e == 'yellow' || e == 'green') {
            const cor = { name: 'color', value: e }
            const { name, value } = cor;
            setNovoEvento({ ...novoEvento, [name]: value });
        } else {
            const { name, value } = e.target;
            setNovoEvento({ ...novoEvento, [name]: value });
        }


    }

    const handleChangeDateStart = (e) => {
console.log("emmmmmmmmm",e )
        const objeto = { name: 'start', value: e }
        const { name, value } = objeto;
        setNovoEvento({ ...novoEvento, [name]: value });
    }



    const handleChangeDateEnd = (e) => {
        const objeto = { name: 'end', value: e }
        const { name, value } = objeto;
        setNovoEvento({ ...novoEvento, [name]: value });
    }


    function converterDataISOParaMySQL(dataISO) {
        console.log("")
        const data = parseISO(dataISO);
        return format(data, 'yyyy-MM-dd HH:mm:ss');
    }
    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)
    }
    const buttonStyle = (color) => ({
        backgroundColor: color,
        color: '#000000', // Cor do texto dos botões
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        cursor: 'pointer',
        opacity: selectedColor === color ? 1 : 0.6, // Opacidade para indicar seleção
    });
    const buttonStyleSelecionado = (color) => ({
        backgroundColor: color,
        color: 'white', // Cor do texto dos botões
        padding: '10px 20px',
        margin: '5px',
        height: '35px',
        cursor: 'pointer',
        opacity: selectedColor === color ? 1 : 0.6, // Opacidade para indicar seleção
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        const eventDetails = {
            startDat,
            startTime,
            repeat,
            endDate: repeat !== 'none' && repeat !== 'selecione' ? endDate : null,
        };
        console.log("eventDetails", eventDetails)


        e.preventDefault();
        console.log("ssssss", salvar)
        if (salvar && novoEvento.title && novoEvento.start && novoEvento.end) {
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            if (startDate >= endDate) {
                // alert('A data início deve ser anterior à dta de término');
                setIsModalOpen(true)
                return;
            }
            console.log("novoEvento", novoEvento)
            onAdicionar(novoEvento);
            setSalvar(false)
            setNovoEvento({
                title: '',
                start: '',
                end: '',
                desc: '',
                color: '',
                tipo: '',
                repetir:false
            })
            setStartDate("")
            setEndDateDate("")
        }

    }
    console.log("")

    const handleColorChange = (color) => {
        setMostrarCorSelecionada(true)
        setSelectedColor(color);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (novoEvento.title || novoEvento.start || novoEvento.end) {
                setSalvar(true)
                handleSubmit
            }

        }
    };

    async function handleSelectChange(e) {
        const selectedValue = e.target.value;
        console.log("meuuuu ta aquiiiiiiii???????", selectedValue)
        if (selectedValue == 'weekly') {
            setMostrarDiasSemana(true)
            setShowDataFixa(false)
        } else if (selectedValue == 'none') {
            setMostrarDiasSemana(false)
            setShowDataFixa(true)
        }
        else {
            setMostrarDiasSemana(false)
            setShowDataFixa(false)
        }
    }






    return (
        <div className="adicionar p-3 rounded border border-white" style={{ backgroundColor: '#e9ecef', color: '#212529' }}>
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
                            <i className="fa fa-times-circle" aria-hidden="true" style={{ fontSize: '52px', color: 'red' }}></i>
                        </h2>

                    </div>
                    <h2 style={{ flex: 1, textAlign: 'center' }}>
                        Não foi possível enviar
                    </h2>
                    <p style={{ textAlign: 'center' }}>
                        A data início deve ser anterior à data de término.
                    </p>
                </Modal>
            }
            <h3 className='titulo'>Reserve uma disponibilidade  {nomeDoConsultorio}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div>
                        <div>
                            <label>
                                Escolha uma opção abaixo:
                                <select
                                    value={repeat}
                                    onChange={(e) => { setRepeat(e.target.value); handleSelectChange(e) }}
                                    required
                                >
                                    <option value="selecione">Selecione</option>
                                    <option value="none">Não se repete</option>
                                    <option value="days">Todos os dias da semana, Seg a Sex</option>
                                    <option value="daily">Diariamente</option>
                                    <option value="weekly" >Semanalmente</option>
                                    <option value="monthly">Mensalmente</option>
                                </select>
                            </label>
                        </div>
                        {console.log("startDat", startDat)}
                        {repeat !== 'none' && repeat !== 'selecione' && (
                        <Form.Group controlId='formBasicTitle'>
                        <Form.Label className='titulo'>Especialidade Médica</Form.Label>
                        <Form.Control className='tituloAgenda' type="text" placeholder="Digite a especialidade" name="title" value={novoEventoRepetirEx.title} onChange={handleChangeRepeticao} />
                    </Form.Group>
                     )}
                        {repeat !== 'none' && repeat !== 'selecione' && (
                            <label>
                                Data do Início:
                                <input
                                    type="date"
                                    value={startDat}
                                    onChange={(e) => setStartDat(e.target.value)}
                                    required
                                />
                            </label>
                        )}
                    </div>

                    <div>
                        {repeat !== 'none' && repeat !== 'selecione' && (
                            <label>
                                Hora do início:
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </label>
                            
                        )}
                        {repeat !== 'none' && repeat !== 'selecione' && (
                            <label>
                                Hora do término:
                                <input
                                    type="time"
                                    value={fimTime}
                                    onChange={(e) => setFimTime(e.target.value)}
                                    required
                                />
                            </label>
                            
                        )}
                    </div>
                    <div>
                        {mostrarDiasSemana &&
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
                        }

                    </div>
                    {console.log("fimmmmmmm", endDate)}
                    {repeat !== 'none' && repeat !== 'selecione' && (
                        <div>
                            <label>
                                Data de Encerramento:
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    )}
                    {repeat !== 'none' && repeat !== 'selecione' && (
                        <button type="submit" onClick={() => salvarEventRepetcao()}>Salvar Evento</button>
                    )}
                </Form.Group>
                {showDataFixa &&
                    <Form.Group controlId='formBasicTitle'>
                        <Form.Label className='titulo'>Especialidade Médica</Form.Label>
                        <Form.Control className='tituloAgenda' type="text" placeholder="Digite a especialidade" name="title" value={novoEvento.title} onChange={handleChange} />
                    </Form.Group>
                }

                {showDataFixa &&
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicStart">
                                <Form.Label>Início</Form.Label>
                                {/* <Form.Control className='startend' type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange} onKeyDown={handleKeyPress}/> */}
                                <DatePicker
                                    onChange={(date) => { setStartDate(date); handleChangeDateStart(date) }}
                                    selected={startDate}
                                    showTimeSelect
                                    className="form-field"
                                    id="birthDate"
                                    placeholderText="digite a data de início"
                                    locale={ptBR}
                                    minDate={dataMax}
                                    // useWeekdaysShort={true}
                                    dateFormat="Pp"
                                //minDate={new Date()}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicEnd">
                                <Form.Label>Término</Form.Label>
                                {/* <Form.Control className='startend' type="datetime-local" name="end" value={novoEvento.end} onChange={handleChange} onKeyDown={handleKeyPress} /> */}
                                <DatePicker
                                    onChange={(date) => { setEndDateDate(date); handleChangeDateEnd(date) }}
                                    selected={endtDate}
                                    showTimeSelect
                                    className="form-field"
                                    id="birthDate"
                                    placeholderText="digite a data término"
                                    locale={ptBR}
                                    minDate={startDate != "" ? startDate : dataMax}
                                    // useWeekdaysShort={true}
                                    dateFormat="Pp"
                                //minDate={new Date()}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                }

                <Collapse in={expanded}>
                    <div>
                        {showDataFixa &&
                            <div>
                                <Form.Group controlId='formBasicDesc'>
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control className='tipdesc' type='text' placeholder='Digite a Descrição' name='desc' value={novoEvento.desc} onChange={handleChange} onKeyDown={handleKeyPress} />
                                </Form.Group>
                            </div>
                        }

                        <Row>
                            {showDataFixa &&
                                <Col xs={3}>
                                    <Form.Group controlId='formBasicColor'>
                                        <Form.Label>Escolha uma cor</Form.Label>
                                        {/* <Form.Control type='color' name='color' value={'red'} onChange={handleChange} /> */}
                                        <div style={{ textAlign: 'center' }}>
                                            <button
                                                style={buttonStyle('red')}
                                                onClick={() => { handleChange('red'); handleColorChange('red') }}
                                            >
                                                Vermelho
                                            </button>
                                            <button
                                                style={buttonStyle('yellow')}
                                                onClick={() => { handleChange('yellow'); handleColorChange('yellow') }}
                                            >
                                                Amarelo
                                            </button>
                                            <button
                                                style={buttonStyle('green')}
                                                onClick={() => { handleChange('green'); handleColorChange('green') }}
                                            >
                                                Verde
                                            </button>
                                            {mostrarCorSelecionada &&
                                                <div style={{ marginTop: '20px' }}>

                                                    <p>Cor selecionada:  <button
                                                        style={buttonStyleSelecionado(selectedColor)}
                                                    ></button></p>
                                                </div>
                                            }

                                        </div>
                                    </Form.Group>
                                </Col>
                            }
                            {showDataFixa &&
                                <Col xs={9}>
                                    <Form.Group controlId='formBasicTipo'>
                                        <Form.Label>Filtro</Form.Label>
                                        <Form.Control className='tipdesc' type='text' placeholder='Digite o tipo de filtro' name='tipo' value={novoEvento.tipo} onChange={handleChange} onKeyDown={handleKeyPress} />
                                    </Form.Group>
                                </Col>
                            }
                            {showDataFixa &&
                                <Button
                                    variant='success'
                                    type='submit'
                                    className={!novoEvento.title || !novoEvento.start || !novoEvento.end ? 'buttDesabilitado' : 'butt'}
                                    onClick={salve}
                                    style={{ marginTop: '10px', marginRight: '10px' }}
                                    disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end}
                                    onKeyDown={handleKeyPress}
                                >
                                    Salvar
                                </Button>
                            }






                        </Row>
                    </div>
                </Collapse>
                <Button
                    variant='primary'
                    type='button'
                    onClick={handleToggleExpanded}
                    style={{ marginTop: '10px', float: 'right' }}>
                    {expanded ? <i className="bi bi-chevron-double-up"></i> : <i className="bi bi-chevron-double-down"></i>}
                </Button>




            </Form>
        </div>
    )
}
Adicionar.propTypes = {
    onAdicionar: PropTypes.any.isRequired // ou o tipo adequado, dependendo do que 'atividades' deve ser
};

export default Adicionar;