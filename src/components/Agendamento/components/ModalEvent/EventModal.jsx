import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Collapse } from 'react-bootstrap'
import PropTypes from 'prop-types';
import './modal.css';
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { apiC } from "../../../../conexoes/api";
import { format, parseISO } from 'date-fns';
import { FaTimes } from 'react-icons/fa'; // Ícone de X

const EventModal = ({ dados, evento, onClose, onDelete, onUpdate, atualiza }) => {

    const [editedEvent, setEditedEvent] = useState({ ...evento });
    const [collapsed, setCollapsed] = useState(true);
    const [endtDate, setEndDateDate] = useState(evento.end);
    const [startDate, setStartDate] = useState(evento.start);
    const [dataMax, setDataMax] = useState(new Date())
    const [especialidade, setEspecialidade] = useState(evento.title);
    const [descricao, setDescricao] = useState(evento.desc);
    const [tipo, setTipo] = useState(evento.tipo);
    const [selectedId, setSelectedId] = useState(''); // Para armazenar o id selecionado
    const [selecao, setSelecao] = useState('Selecione uma especialidade');
    const [checkEspecialidade, setCheckEspecialidade] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [checkErro, setCheckErro] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aviso, setAviso] = useState(false);
    const [avisoFalil, setAvisoFalil] = useState(false);

    const handleDescricao = (e) => {
        setDescricao(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    }

    const handleTipo = (e) => {
        setTipo(e.target.value)
    }

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        if (startDate <= editedEvent.end) {
            setEditedEvent({ ...editedEvent, start: startDate });
        }
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        if (endDate >= editedEvent.start) {
            setEditedEvent({ ...editedEvent, end: endDate });
        }
    }
    async function handleDeleteAllEvento() {
        await apiC.post("agenda/deletarAllEvento", {
            "id_especialidade": evento.id_repetir
        }).then(response => {

            if (response.status === 200) {
                atualiza();
                onClose();
                alert("agenda toda deletada")

            }
        })
            .catch((error) => {

                alert("erro ao atualizar data", error)
                console.log("error", error)

            });
    }

    async function handleDelete() {
        await apiC.post("agenda/deletar", {
            "id": evento.id
        }).then(response => {

            if (response.status === 200) {
                atualiza();
                onClose();
                alert("agenda especifica deletada")

            }
        })
            .catch((error) => {

                alert("erro ao atualizar data", error)
                console.log("error", error)

            });
    }

    function converterDataISOParaMySQL(dataISO) {
        const jsDate = new Date(dataISO);
        return format(jsDate, 'yyyy-MM-dd HH:mm:ss');
    }


    const validateDate = (start, end) => {
        if (start && end && start > end) {
            setErrorData('A data de início não pode ser maior que a data de término.');
            setCheckErro(true)
        } else {
            setErrorData('');
            setCheckErro(false)
        }
    };

    async function handleUpdate(params) {


        const start = converterDataISOParaMySQL(startDate);
        const end = converterDataISOParaMySQL(endtDate);

        await apiC.post("agenda/atualiza", {
            "especialidade": selectedId != '' ? selectedId : evento.id_especialidade,
            "descricao": descricao,
            "startData": start,
            "endtData": end,
            "tipo": tipo,
            "id": evento.id
        }).then(response => {

            if (response.status === 200) {
                atualiza();
                setAviso(true)
                setAvisoFalil(false)
                function fechar() {
                    onClose();
                }
                setTimeout(fechar, 4000);
            }
        })
            .catch((error) => {
                setAviso(false)
                setAvisoFalil(true)
                alert("erro ao atualizar data", error)
                console.log("error", error)

            });


    }

    const adjustDate = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0, -8);
    };

    const buttonStyleSelecionado = (color) => ({
        backgroundColor: color,
        color: 'white', // Cor do texto dos botões
        padding: '10px 20px',
        margin: '5px',
        height: '35px',
        cursor: 'pointer',
        opacity: 1, // Opacidade para indicar seleção
    });

    const handleSelectChangeEspecialidade = (event) => {
        const idSelecionado = event.target.value;
        if (idSelecionado != "") {
            setSelectedId(idSelecionado)
        }

    };

    async function handleStartDataChange(data) {
        const value = data;
        setStartDate(value);
        validateDate(value, endtDate);

    }

    async function handleEndDataChange(data) {
        const value = data;
        setEndDateDate(value);
        validateDate(startDate, value);
    };

    const handleDeletarClick = () => {
        setIsModalOpen(true);
    };
    const handleDeletarAllClick = () => {
        setIsModalOpenDeletedAll(true);
    };


    return (


        <Modal show={true} onHide={onClose} className='modalEvent'>

            <FaTimes
                className='fecharModalAviso'
                onClick={() => { onClose() }}
            // style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
            />
            {/* <button onClick={() => { onClose() }} className='fecharModalAviso'>
                Voltar X
            </button> */}
            {!aviso && !avisoFalil &&
                <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} className='modalAviso'>
                    <div className='fecharModal'>

                    </div>
                    <div className='modal-pos'>

                        <p className='h2-modal-aviso'>Deseja excluir esta disponibilidade da agenda?</p>

                        <div className="buttons">
                            <button onClick={() => { handleDelete() }} className='confirm-aviso'>
                                Confirmar
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className='cancel-aviso'>Cancelar</button>
                        </div>
                    </div>
                </Modal>
            }

            {!aviso && !avisoFalil &&
                <Modal.Header>
                    <Modal.Title>{editedEvent.title}</Modal.Title>
                </Modal.Header>
            }

            {!aviso && !avisoFalil &&
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">

                            <div>
                                <Form.Label>Especialidade</Form.Label>
                                <select className='especialidade' onChange={handleSelectChangeEspecialidade} value={selectedId}>
                                    <option value="">Selecione uma especialidade</option>
                                    {dados.map((item) => (
                                        <option key={item.id_especialidade} value={item.id_especialidade}>
                                            {item.especialidade}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formDesc">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} name='desc' value={descricao} onChange={handleDescricao} className='desc' />
                        </Form.Group>

                        <Collapse in={!collapsed}>
                            <div>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group controlId="formBasicStart">
                                            <Form.Label>Início</Form.Label>
                                            {/* <Form.Control className='startend' type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange} onKeyDown={handleKeyPress}/> */}
                                            <DatePicker
                                                onChange={(date) => { handleStartDataChange(date) }}
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
                                                onChange={(date) => { handleEndDataChange(date) }}
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
                                        {errorData && <p style={{ color: 'red' }}>{errorData}</p>}
                                    </Col>
                                </Row>

                                <Form.Group controlId="formColor">
                                    <div style={{ marginTop: '20px' }}>

                                        <p>Cor:  <button disabled
                                            style={buttonStyleSelecionado(editedEvent.color)}
                                        ></button></p>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formTipo">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control type="text" name='tipo' value={tipo} onChange={handleTipo} className='tipo' />
                                </Form.Group>
                            </div>
                        </Collapse>
                    </Form>
                </Modal.Body>
            }

            {!aviso && !avisoFalil &&
                <Modal.Footer className='justify-content-between'>
                    {/* <Button variant='secondary' onClick={() => setCollapsed(!collapsed)}>
     {!collapsed ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
 </Button> */}

                    {checkErro ?
                        <Button variant='primary' disabled onClick={handleUpdate} className='buttonEditDesab'>
                            Salvar alterações
                        </Button>
                        :
                        <Button variant='primary' onClick={handleUpdate} className='buttonEdit'>
                            Salvar alterações
                        </Button>
                    }


                    {editedEvent.id_repetir != 6 ?
                        <Button variant='danger' onClick={handleDeletarClick} className='buttonDelet'>
                            Excluir só esta disponíbilidade da agenda
                        </Button>
                        :
                        <Button variant='danger' onClick={handleDeletarClick} className='buttonDelet'>
                            Excluir esta disponíbilidade da agenda
                        </Button>
                    }


                    {editedEvent.id_repetir != 6 &&
                        <Button variant='danger' onClick={handleDeletarAllClick} className='buttonDelet'>
                            Excluir todas as disponíbilidades semanalmente da agenda
                        </Button>
                    }

                </Modal.Footer>
            }

            {aviso &&
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

            {avisoFalil &&
                <Modal.Body>
                    <Form>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <h2 style={{ flex: 1, textAlign: 'center' }}>
                                <i className="fa fa-times-circle" aria-hidden="true" style={{ fontSize: '52px', color: 'red' }}></i>
                            </h2>

                        </div>
                        <h2 style={{ flex: 1, textAlign: 'center' }}>
                            Erro ao alterar, contate a equipe de suporte!
                        </h2>
                    </Form>
                </Modal.Body>
            }


        </Modal>
    )
}

EventModal.propTypes = {
    aviso: PropTypes.any.isRequired,
    dados: PropTypes.any.isRequired,
    evento: PropTypes.any.isRequired,
    onClose: PropTypes.any.isRequired,
    onDelete: PropTypes.any.isRequired,
    atualiza: PropTypes.any.isRequired,
    onUpdate: PropTypes.any.isRequired // ou o tipo adequado, dependendo do que 'atividades' deve ser
};

export default EventModal;