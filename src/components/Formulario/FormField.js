import React from 'react';
import PropTypes from 'prop-types';
import './questionario.css';

const FormField = ({ question, onChange, onDelete }) => {
    const handleTitleChange = (e) => {
        onChange(question.id, { ...question, title: e.target.value });
    };

    const handleTextChange = (e) => {
        onChange(question.id, { ...question, text: e.target.value });
    };

    const handleTypeChange = (e) => {
        onChange(question.id, { ...question, type: e.target.value, options: [] });
    };

    const handleOptionChange = (index, value) => {
        const options = [...question.options];
        options[index] = value;
        onChange(question.id, { ...question, options });
    };

    const addOption = () => {
        onChange(question.id, { ...question, options: [...question.options, ''] });
    };

    const removeLastOption = () => {
        if (question.options.length > 0) {
            const options = question.options.slice(0, -1);
            onChange(question.id, { ...question, options });
        }
    };

    return (
        <div>
            {question.type == 'altura' && (
                <input
                    type="text"
                    value={"Altura"}
                    onChange={handleTitleChange}
                    placeholder="Título da Pergunta"
                    className='tipdescQ'
                />
            )}
             {question.type !== 'altura' && (
            <input
                type="text"
                value={question.title}
                onChange={handleTitleChange}
                placeholder="Título da Pergunta"
                className='tipdescQ'
            />
        )}
            {question.type !== 'text' && question.type !== 'data' && 
            question.type !== 'altura' && question.type !== 'peso' && question.type !== 'rg' && question.type !== 'cpf' &&(
                <input
                    type="text"
                    value={question.text}
                    onChange={handleTextChange}
                    placeholder="Pergunta"
                    className='tipdescQ'
                />
            )}

            <select value={question.type} onChange={handleTypeChange} className='campoSelect'>
                <option value="" disabled>
                    Selecione um tipo de pergunta
                </option>
                <option value="text">Resposta em texto</option>
                <option value="select">Campo de seleção</option>
                <option value="radio">Escolha única</option>
                <option value="checkbox">Múltipla escolha</option>
                <option value="data">Data</option>
                <option value="dataHora">Data e hora</option>
                <option value="altura">Altura</option>
                <option value="peso">Peso</option>
                <option value="rg">RG</option>
                <option value="cpf">CPF</option>
            </select>
            {question.type !== 'text' && question.type !== 'data' && question.type !== 'altura' && question.type !== 'peso' && question.type !== 'rg' && question.type !== 'cpf' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            {question.type === 'radio' || question.type === 'checkbox' ?
                                <input
                                    type={question.type === 'radio' ? 'radio' : question.type === 'checkbox' ? 'checkbox' : ""}
                                    name={`question-${question.id}`} // Nome único para agrupar os radio buttons
                                    value={option}
                                />
                                : ""

                            }

                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Opção ${index + 1}`}
                                style={{ marginLeft: '8px' }}
                                className='tipdescQ'
                            />

                        </div>
                    ))}
                    <button onClick={addOption} className='addButt'>Adicionar Opção</button>
                    <button onClick={removeLastOption} className='remButt'>Remover Última Opção</button>
                </div>
            )}

            {question.type === 'text' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={option}
                                className='tipdescQ'
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Pergunta ${index + 1}`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                    ))}
                    <button onClick={addOption} className='addPergButt'>Adicionar Pergunta a este título</button>
                    <button onClick={removeLastOption} className='remPergButt'>Remover Última Pergunta</button>

                </div>

            )}
            {question.type === 'altura' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={option}
                                className='tipdescQ'
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Pergunta ${index + 1}`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                    ))}
                    <button onClick={addOption} className='addPergButt'>Adicionar Pergunta a este título</button>
                    <button onClick={removeLastOption} className='remPergButt'>Remover Última Pergunta</button>

                </div>

            )}
            <button onClick={() => onDelete(question.id)} className='remPergAllButt'>Deletar todas as perguntas deste título</button>
            <div className="linha"></div>
        </div>
    );
};

FormField.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default FormField;
