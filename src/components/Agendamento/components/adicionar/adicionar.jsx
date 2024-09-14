import React, { useState } from 'react';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';

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

    const salve = (e) => {
        console.log("passou1???")
        setSalvar(true)
    }

    console.log("meuuuuuuuuuuuuuuuuuu", salvar)

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
                alert('A data início deve ser anterior à dta de término');
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

    const handleColorChange = (color) => {
        setMostrarCorSelecionada(true)
        setSelectedColor(color);
    };


    return (
        <div className="adicionar p-3 rounded border border-white" style={{ backgroundColor: '#e9ecef', color: '#212529' }}>
            <h3>Adicionar Evento</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicTitle'>
                    <Form.Label>Título do Evento</Form.Label>
                    <Form.Control type="text" placeholder="Digite o Título" name="title" value={novoEvento.title} onChange={handleChange} />
                </Form.Group>
                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="formBasicStart">
                            <Form.Label>Início</Form.Label>
                            <Form.Control type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId="formBasicEnd">
                            <Form.Label>Término</Form.Label>
                            <Form.Control type="datetime-local" name="end" value={novoEvento.end} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Collapse in={expanded}>
                    <div>
                        <div>
                            <Form.Group controlId='formBasicDesc'>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type='text' placeholder='Digite a Descrição' name='desc' value={novoEvento.desc} onChange={handleChange} />
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
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control type='text' placeholder='Digite o Tipo' name='tipo' value={novoEvento.tipo} onChange={handleChange} />
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
                    onClick={salve}
                    style={{ marginTop: '10px', marginRight: '10px' }}
                    disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end}

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