import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SimuladorQuestionComponent = ({ questions }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
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
                        <h3>{title}</h3>
                        {/* Exibe o texto da pergunta */}
                        <p>{text}</p>
                        {/* Renderiza opções com base no tipo */}
                        {type === 'select' && (
                            <select>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
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