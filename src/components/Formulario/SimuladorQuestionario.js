import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';

const SimuladorQuestionComponent = ({ questions }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedResposta, setSelectedResposta] = useState('');
    const [selectedOptionSel, setSelectedOptionSel] = useState('');


    const [selectedRespostas, setSelectedRespostas] = useState(Array(questions.length).fill(''));
    const [height, setHeight] = useState([170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170]); // Altura inicial em cm

    const handleHeightChange = (index, value) => {
        const newRespostas = [...height]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setHeight(newRespostas);
    };

    const handleResposta = (index, value) => {
        const newRespostas = [...selectedRespostas]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setSelectedRespostas(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChangeS = (event) => {
        setSelectedOptionSel(event.target.value);
    };

    const handleChangeC = (event) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value]
        );
    };

    return (
        <div>
            {questions.map((question) => {
                const { id, title, text, options, type } = question;

                return (
                    <div key={id} style={{ marginBottom: '20px' }}>
                        
                        {/* Exibe o título da pergunta */}
                        {type !== 'altura' && (
                        <h3>{title}</h3>
                    )}
                    {type === 'altura' && (
                        <h3>{"Altura"}</h3>
                    )}
                        {/* Exibe o texto da pergunta */}
                        <p>{text}</p>
                        {/* Renderiza opções com base no tipo */}
                        {type === 'altura' && (
                        <div className="height-input-container" key={"dd"}>
                            {options.map((option, index) => (
                                <label htmlFor="height" className="height-label" key={"dd"}>
                                {option}
                                <input
                                 type="range"
                                 id="height"
                                 min="50"
                                 max="250"
                                 value={height[index]}
                                 onChange={event => handleHeightChange(index, event.target.value)}
                                 className="height-range"
                                 key={"dd"}
                             />
                             <div className="height-display" key={"dd"}>{height[index]} cm</div>
                            </label>
                                ))}

                        </div>
                         )}
                        {type === 'select' && (
                            <div className="select-container">
                                <select className="custom-select" value={selectedOptionSel} onChange={handleChangeS}>
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
                                {options.map((option, index) => (
                                    <Form.Group key={index} className="form-group">
                                        <Form.Label className="form-label">{option}</Form.Label>
                                        <Form.Control
                                            className='tipresp form-control'
                                            type='text'
                                            placeholder='Digite a sua resposta'
                                            name={`desc-${index}`}
                                            value={selectedRespostas[index] || ''} // Acesso às respostas se estiver usando um array
                                            onChange={event => handleResposta(index, event.target.value)}
                                        />
                                    </Form.Group>
                                ))}
                                {/* {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))} */}
                            </div>
                        )}
                        {type === 'radio' && (
                            <div className="radio-group">
                                {options.map((option, index) => (
                                    <label key={index} className="radio-label">
                                        <input type="radio" name={title} value={option}
                                            checked={selectedOption === option}
                                            onChange={handleChange} />
                                        {option}

                                    </label>
                                ))}
                            </div>
                        )}
                        {type === 'checkbox' && (
                            <div>
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