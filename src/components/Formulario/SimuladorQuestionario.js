import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './formulario.css'; // Importando seu CSS
import { ptBR } from 'date-fns/locale';

const SimuladorQuestionComponent = ({ questions }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedResposta, setSelectedResposta] = useState('');
    const [selectedOptionSel, setSelectedOptionSel] = useState([]);
    const [selectedRespostas, setSelectedRespostas] = useState(Array(questions.length).fill(''));
    const [height, setHeight] = useState([170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170]); // Altura inicial em cm
    const [peso, setPeso] = useState([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]);
    const [startDate, setStartDate] = useState([]);
    const [startDateH, setStartDateH] = useState([]);
    const [error, setError] = useState('');
    const [cpf, setCpf] = useState([]);
    const [rg, setRg] = useState([]);

    const handleChangeRg = (index, event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length <= 9) {
            const formattedRg = formatRG(value);
            const newRespostas = [...rg]; // Cria uma cópia do estado atual
            newRespostas[index] = formattedRg; // Atualiza a resposta para o índice correspondente
            setRg(newRespostas);
        }
    };

    const formatRG = (value) => {
        let formatted = '';
        if (value.length > 0) {
            formatted += value.slice(0, 2); // Primeiro bloco: 00
        }
        if (value.length > 2) {
            formatted += '.' + value.slice(2, 5); // Segundo bloco: 000
        }
        if (value.length > 5) {
            formatted += '.' + value.slice(5, 8); // Terceiro bloco: 000
        }
        if (value.length > 8) {
            formatted += '-' + value.slice(8, 9); // Dígito verificador: 0
        }
        return formatted;
    };



    const handleChangeCpf = (index, dado) => {
        const { value } = dado;
        // Remove tudo que não é número
        const onlyNumbers = value.replace(/\D/g, '');

        // Formata o CPF: 000.000.000-00
        const formattedCpf = onlyNumbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');

        const newRespostas = [...cpf]; // Cria uma cópia do estado atual
        newRespostas[index] = formattedCpf; // Atualiza a resposta para o índice correspondente
        setCpf(newRespostas);
    };

    const validateCPF = (cpf) => {
        // Aqui você pode adicionar a lógica para validar o CPF
        // Abaixo um exemplo simplificado de validação
        return cpf.length === 14; // Considerando o formato XXX.XXX.XXX-XX
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateCPF(cpf)) {
            alert('CPF válido: ' + cpf);
        } else {
            alert('CPF inválido!');
        }
    };

    const handleChangeD = (index, date) => {
        if (date) {
            const newRespostas = [...startDate]; // Cria uma cópia do estado atual
            newRespostas[index] = date; // Atualiza a resposta para o índice correspondente
            setStartDate(newRespostas);
            setError(''); // Limpa o erro se a data é válida
        }
    };
    const handleChangeDH = (index, date) => {
        if (date) {
            const newRespostas = [...startDateH]; // Cria uma cópia do estado atual
            newRespostas[index] = date; // Atualiza a resposta para o índice correspondente
            setStartDateH(newRespostas);
            setError(''); // Limpa o erro se a data é válida
        }
    };
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const parsedDate = new Date(inputValue);

        if (!isNaN(parsedDate.getTime())) {
            setStartDate(parsedDate);
            setError('');
        } else {
            setError('Data inválida, por favor insira no formato DD/MM/AAAA');
        }
    };


    const handleHeightChange = (index, value) => {
        const newRespostas = [...height]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setHeight(newRespostas);
    };

    const handlePesoChange = (index, value) => {
        const newRespostas = [...peso]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setPeso(newRespostas);
    };

    const handleResposta = (index, value) => {
        const newRespostas = [...selectedRespostas]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setSelectedRespostas(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    console.log("selectedRespostas", selectedRespostas)


    const handleChangeRa = (index, value) => {
        const newRespostas = [...selectedOption]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setSelectedOption(newRespostas); // Atualiza o estado com a nova array de respostas
    };


    const handleChangeS = (index, value) => {
        const newRespostas = [...selectedOptionSel]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setSelectedOptionSel(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    const handleChangeC = (event) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value]
        );
    };

    return (
        <div>
            {console.log("lllllll", questions)}
            {questions.map((question, indexQ) => {
                const { id, title, text, options, type } = question;

                return (
                    <div key={id} style={{ marginBottom: '20px' }}>

                        {/* Exibe o título da pergunta */}
                        {type !== 'altura' && type !== 'peso' && type !== 'cpf' && type !== 'rg' && (
                            <h3>{title}</h3>
                        )}
                        {type === 'altura' && (
                            <h3>{"Altura"}</h3>
                        )}
                        {type === 'peso' && (
                            <h3>{"Peso"}</h3>
                        )}
                        {type === 'cpf' && (
                            <h3>{"CPF"}</h3>
                        )}
                        {type === 'rg' && (
                            <h3>{"RG"}</h3>
                        )}
                        {/* Exibe o texto da pergunta */}
                        {/* <p>{text}</p> */}
                        {/* Renderiza opções com base no tipo */}
                        {type === 'dataHora' && (
                            <div className="date-picker-container" key={"dddd"}>

                                <label htmlFor={`date-picker-${indexQ}`} className="height-label-data" key={indexQ}>
                                    {text}
                                    <DatePicker
                                        showTimeSelect
                                        selected={startDateH[indexQ]}
                                        onChange={event => handleChangeDH(indexQ, event)}
                                        onInputChange={handleInputChange}
                                        dateFormat="Pp"
                                        placeholderText="Selecione ou digite uma data"
                                        locale={ptBR}
                                        className="date-picker-input"
                                    // popperClassName="custom-datepicker"
                                    />
                                    {error && <span className="error-message">{error}</span>}
                                </label>


                            </div>
                        )}
                        {type === 'data' && (
                            <div className="date-picker-container" key={"ddd"}>

                                <label htmlFor={`date-picker-${indexQ}`} className="height-label-data" key={indexQ}>
                                    {text}
                                    <DatePicker
                                        selected={startDate[indexQ]}
                                        onChange={event => handleChangeD(indexQ, event)}
                                        onInputChange={handleInputChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Selecione ou digite uma data"
                                        locale={ptBR}
                                        className="date-picker-input"
                                    // popperClassName="custom-datepicker"
                                    />
                                    {error && <span className="error-message">{error}</span>}
                                </label>


                            </div>
                        )}
                        {type === 'altura' && (
                            <div className="height-input-container" key={"dd"}>

                                <label htmlFor="height" className="height-label" key={"dd"}>
                                    {text}
                                    <input
                                        type="range"
                                        id="height"
                                        min="50"
                                        max="250"
                                        value={height[indexQ]}
                                        onChange={event => handleHeightChange(indexQ, event.target.value)}
                                        className="height-range"
                                        key={"dd"}
                                    />
                                    <div className="height-display" key={"dd"}>{height[indexQ]} cm</div>
                                </label>


                            </div>
                        )}
                        {type === 'peso' && (
                            <div className="height-input-container" key={"pp"}>

                                <label htmlFor="height" className="height-label" key={"pp"}>
                                    {text}
                                    <input
                                        type="range"
                                        id="height"
                                        min="1"
                                        max="200"
                                        value={peso[indexQ]}
                                        onChange={event => handlePesoChange(indexQ, event.target.value)}
                                        className="height-range"
                                        key={"dd"}
                                    />
                                    <div className="height-display" key={"pp"}>{peso[indexQ]} kg</div>
                                </label>


                            </div>
                        )}
                        {type === 'select' && (
                            <div className="select-container">
                                <p className="question">{text}</p>
                                <select className="custom-select" value={selectedOptionSel[indexQ]} onChange={handleChangeS}>
                                    <option value="" disabled>
                                        Selecione uma opção
                                    </option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="arrow-down">▼</div> {/* Seta adicionada aqui */}
                            </div>
                        )}
                        {type === 'text' && (
                            <div>

                                <Form.Group key={indexQ} className="form-group">
                                    <Form.Label className="form-label">{text}</Form.Label>
                                    <Form.Control
                                        className='tipresp form-control'
                                        type='text'
                                        placeholder='Digite a sua resposta'
                                        name={`desc-${indexQ}`}
                                        value={selectedRespostas[indexQ] || ''} // Acesso às respostas se estiver usando um array
                                        onChange={event => handleResposta(indexQ, event.target.value)}
                                    />
                                </Form.Group>

                                {/* {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))} */}
                            </div>
                        )}
                        {type === 'cpf' && (
                            <div key={"bb"}>

                                <form onSubmit={handleSubmit} key={indexQ} className='form-group-cpf'>
                                    <label className='label-cpf'>
                                        {text}
                                        <input
                                            type="text"
                                            value={cpf[indexQ]}
                                            onChange={event => handleChangeCpf(indexQ, event.target)}
                                            maxLength="14" // Limita o número de caracteres no formato XXX.XXX.XXX-XX
                                            placeholder="000.000.000-00"
                                            className='input-cpf'
                                        />
                                    </label>
                                </form>

                                {/* {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))} */}
                            </div>
                        )}
                        {type === 'rg' && (
                            <div key={"rr"}>

                                <form key={indexQ} className='form-group-cpf'>
                                    <label htmlFor="rg" className='label-cpf' key={indexQ}>
                                        {text}
                                        <input
                                            type="text"
                                            id="rg"
                                            value={rg[indexQ]}
                                            onChange={event => handleChangeRg(indexQ, event)}
                                            maxLength="12" // Limita o número de caracteres no formato XXX.XXX.XXX-XX
                                            placeholder="00.000.000-0"
                                            className='input-cpf'
                                        />
                                    </label>
                                </form>

                                {/* {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))} */}
                            </div>
                        )}
                        {type === 'radio' && (
                            <div className="radio-group">
                                <p className="question">{text}</p>
                                <div className="options-container">
                                    {options.map((option, index) => (
                                        <label key={index} className="radio-label">
                                            <input
                                                type="radio"
                                                name={title}
                                                value={option}
                                                checked={selectedOption[indexQ] === option}
                                                onChange={event => handleChangeRa(indexQ, event.target.value)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {type === 'checkbox' && (
                            <div>
                                <p className="question">{text}</p>
                                {options.map((option, index) => (
                                    <label key={index} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={selectedOptions.includes(option)}
                                            onChange={handleChangeC}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

SimuladorQuestionComponent.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            text: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['select', 'radio', 'checkbox']).isRequired,
        })
    ).isRequired,
};

export default SimuladorQuestionComponent;