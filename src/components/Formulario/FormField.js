import React from 'react';
import PropTypes from 'prop-types';

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
            <input
                type="text"
                value={question.title}
                onChange={handleTitleChange}
                placeholder="Título da Pergunta"
            />
            {question.type !== 'text' && (
                <input
                    type="text"
                    value={question.text}
                    onChange={handleTextChange}
                    placeholder="Pergunta"
                />
            )}

            <select value={question.type} onChange={handleTypeChange}>
                <option value="text">Texto</option>
                <option value="select">Select</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
            </select>
            {question.type !== 'text' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type={question.type === 'radio' ? 'radio' : 'checkbox'}
                                name={`question-${question.id}`} // Nome único para agrupar os radio buttons
                                value={option}
                            />
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Opção ${index + 1}`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                    ))}
                    <button onClick={addOption}>Adicionar Opção</button>
                    <button onClick={removeLastOption}>Remover Última Opção</button>
                </div>
            )}
            {question.type === 'text' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Pergunta ${index + 1}`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                    ))}
                    <button onClick={addOption}>Adicionar Pergunta</button>
                    <button onClick={removeLastOption}>Remover Última Pergunta</button>
                </div>
            )}
            <button onClick={() => onDelete(question.id)}>Deletar todas as perguntas deste título</button>
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
