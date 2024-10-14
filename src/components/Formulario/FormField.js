import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './formulario.css';
import { set } from 'date-fns';
import {arrayText } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';

const FormField = ({ question, onChange, onDelete }) => {
    const despacho = useDispatch();
    const [questionAddedText, setQuestionAddedText] = useState(false);
    const [questionAddedCpf, setQuestionAddedCpf] = useState(false);
    const [questionAddedRg, setQuestionAddedRg] = useState(false);
    const [questionAddedDataHora, setQuestionAddedDataHora] = useState(false);
    const [questionAddedData, setQuestionAddedData] = useState(false);
    const [questionAddedAltura, setQuestionAddedAltura] = useState(false);
    const [questionAddedPeso, setQuestionAddedPeso] = useState(false);
    const textArray = useSelector(state => state.reduxH.arrayText);
    const [text, setText] = useState(['']);
    const [data, setData] = useState(['']);
    const [cpf, setCpf] = useState(['']);
    const [rg, setRg] = useState(['']);
    const [dataHora, setDataHora] = useState(['']);
    const [altura, setAltura] = useState(['']);
    const [peso, setPeso] = useState(['']);
    const [valida, setValida] = useState({
        tipo: [],
    });



    const handleTitleChange = (e) => {
        onChange(question.id, { ...question, title: e.target.value });
    };

    const handleTextChange = (e) => {
        onChange(question.id, { ...question, text: e.target.value });
    };

    console.log("quessss", question)

    const handleTypeChange = (e) => {
        const typo = { name: 'tipo' }
        onChange(question.id, { ...question, type: e.target.value, options: [] });
        setValida({ ...valida, [typo.name]: e.target.value });
    };
    

    const handleOptionChange = (index, value) => {
        const options = [...question.options];
        options[index] = value;
        onChange(question.id, { ...question, options });
    };

    const addOption = (value) => {
        onChange(question.id, { ...question, options: [...question.options, ''] });
        if(value == "1"){
            setQuestionAddedText(true)
        }else if(value == "2"){
            setQuestionAddedData(true)
        }else if(value == "3"){
            setQuestionAddedCpf(true)
        }else if(value == "4"){
            setQuestionAddedRg(true)
        }else if(value == "5"){
            setQuestionAddedDataHora(true)
        }else if(value == "6"){
            setQuestionAddedAltura(true)
        }else if(value == "7"){
            setQuestionAddedPeso(true)
        }
    };

    const removeLastOption = (value) => {
       
        if (question.options.length > 0) {
            const options = question.options.slice(0, -1);
            onChange(question.id, { ...question, options });
        }
        if(value == "1"){
            setQuestionAddedText(false)
        }else if(value == "2"){
            setQuestionAddedData(false)
        }else if(value == "3"){
            setQuestionAddedCpf(false)
        }else if(value == "4"){
            setQuestionAddedRg(false)
        }else if(value == "5"){
            setQuestionAddedDataHora(false)
        }else if(value == "6"){
            setQuestionAddedAltura(false)
        }else if(value == "7"){
            setQuestionAddedPeso(false)
        }

    };

    console.log("texttttttttt", text)

    const questionTypes = [
        { value: 'text', label: 'Resposta em texto' },
        { value: 'select', label: 'Campo de seleção' },
        { value: 'radio', label: 'Escolha única' },
        { value: 'checkbox', label: 'Múltipla escolha' },
        { value: 'data', label: 'Data' },
        { value: 'dataHora', label: 'Data e hora' },
        { value: 'altura', label: 'Altura' },
        { value: 'peso', label: 'Peso' },
        { value: 'rg', label: 'RG' },
        { value: 'cpf', label: 'CPF' }
    ];

    const filteredQuestionTypes = questionTypes.filter(type => type.value !== valida.tipo[0]);

    const handleDataChange = (index, value) => {
        const newRespostas = [...data]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setData(newRespostas);
    };

    const handleDataHoraChange = (index, value) => {
        const newRespostas = [...dataHora]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setDataHora(newRespostas);
    };

    const handleAlturaChange = (index, value) => {
        const newRespostas = [...altura]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setAltura(newRespostas);
    };

    const handlePesoChange = (index, value) => {
        const newRespostas = [...peso]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setPeso(newRespostas);
    };

    const handleCpfCharge = (index, value) => {
        const newRespostas = [...cpf]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setCpf(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    const handleRgCharge = (index, value) => {
        const newRespostas = [...rg]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        setRg(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    
    const handleChangeText = (index, value) => {
        const newRespostas = [...textArray]; // Cria uma cópia do estado atual
        const newRespostas2 = [...textArray]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostas2[index] = value; // Atualiza a resposta para o índice correspondente
        despacho(arrayText(newRespostas))
        setText(newRespostas); // Atualiza o estado com a nova array de respostas
    };

    console.log("cococooc text", text)
    console.log("cococooc textArray", textArray)

    const availableTypes = questionTypes
        .filter(type => !questionTypes.includes(type.value));

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
            {question.type == 'peso' && (
                <input
                    type="text"
                    value={"Peso"}
                    onChange={handleTitleChange}
                    placeholder="Título da Pergunta"
                    className='tipdescQ'
                />
            )}
             {question.type == 'cpf' && (
                <input
                    type="text"
                    value={"CPF"}
                    onChange={handleTitleChange}
                    placeholder="Título da Pergunta"
                    className='tipdescQ'
                />
            )}
            {question.type == 'rg' && (
                <input
                    type="text"
                    value={"RG"}
                    onChange={handleTitleChange}
                    placeholder="Título da Pergunta"
                    className='tipdescQ'
                />
            )}

            {question.type !== 'altura' && question.type !== 'peso' && question.type !== 'cpf' && question.type !== 'rg' &&(
                <input
                    type="text"
                    value={question.title}
                    onChange={handleTitleChange}
                    placeholder="Título da Pergunta"
                    className='tipdescQ'
                />
            )}

            {question.type !== 'text' && question.type !== 'data' &&
                question.type !== 'altura' && question.type !== 'peso' && question.type !== 'rg' && question.type !== 'cpf' &&
                question.type !== 'dataHora' && (
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
                    {availableTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select> 

            {question.type !== 'text' && question.type !== 'data' && question.type !== 'altura'
                && question.type !== 'peso' && question.type !== 'rg' && question.type !== 'cpf' && question.type !== 'dataHora' && (
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
                   
                    {text.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleChangeText(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                   
                ))}
              

                </div>

            )}
            {question.type === 'data' && (
                <div>
               {data.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleDataChange(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                
            ))}
                </div>

            )}
             {question.type === 'cpf' && (
                <div>
                {cpf.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleCpfCharge(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                  
                ))}
                </div>

            )}
            {question.type === 'rg' && (
                <div>
              {rg.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleRgCharge(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                  
                ))}
                </div>

            )}
             {question.type === 'dataHora' && (
                <div>
                  {dataHora.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleDataHoraChange(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                 ))}
                   
                </div>

            )}
            {question.type === 'altura' && (
                <div>
                    {altura.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handleAlturaChange(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                   ))}
                   
                </div>

            )}
            {question.type === 'peso' && (
                <div>
                    {peso.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={question.text}
                                className='tipdescQ'
                                onChange={(e) => { handleTextChange(e); handlePesoChange(index, e.target.value)}}
                                placeholder={`Pergunta`}
                                style={{ marginLeft: '8px' }}
                            />
                        </div>
                        
                    ))}
                 
                </div>

            )}
            <button onClick={() => { onDelete(question.id)}} className='remPergAllButt'>Deletar pergunta</button>
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
