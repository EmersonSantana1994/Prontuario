import React, { useState } from 'react';
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
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDateDate] = useState(new Date());
    const [dataMin, setDataMin] = useState(1990)
    const [dataMax, setDataMax] = useState(new Date())
    const salve = (e) => {
        setSalvar(true)
    }
    const [date, setDate] = React.useState(new Date());
    const closeModal = () => setIsModalOpen(false);

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
            })
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
            <h3>Reserve uma agenda  {nomeDoConsultorio}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicTitle'>
                    <Form.Label>Título do Evento</Form.Label>
                    <Form.Control className='tituloAgenda' type="text" placeholder="Digite o Título" name="title" value={novoEvento.title} onChange={handleChange} />
                </Form.Group>
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
                                minDate={dataMax}
                                // useWeekdaysShort={true}
                                dateFormat="Pp"
                            //minDate={new Date()}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Collapse in={expanded}>
                    <div>
                        <div>
                            <Form.Group controlId='formBasicDesc'>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control className='tipdesc' type='text' placeholder='Digite a Descrição' name='desc' value={novoEvento.desc} onChange={handleChange} onKeyDown={handleKeyPress} />
                            </Form.Group>
                        </div>
                        <Row>
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
                            <Col xs={9}>
                                <Form.Group controlId='formBasicTipo'>
                                    <Form.Label>Filtro</Form.Label>
                                    <Form.Control className='tipdesc' type='text' placeholder='Digite o tipo de filtro' name='tipo' value={novoEvento.tipo} onChange={handleChange} onKeyDown={handleKeyPress} />
                                </Form.Group>
                            </Col>
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


            </Form>
        </div>
    )
}
Adicionar.propTypes = {
    onAdicionar: PropTypes.any.isRequired // ou o tipo adequado, dependendo do que 'atividades' deve ser
};

export default Adicionar;