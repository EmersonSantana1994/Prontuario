import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiC } from "../../conexoes/api";
import PropTypes from 'prop-types';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../Formulario/formulario.css'; // Importando seu CSS
import { ptBR } from 'date-fns/locale';
import { seguirCliente, seguirPacliente, seguirTriagem } from '../../actions/actions';
import { format, parseISO } from 'date-fns';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X

export default function Triagem() {
    const [questions, setQuestions] = useState([]);
    const despacho = useDispatch();
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(['']);
    const [selectedResposta, setSelectedResposta] = useState('');
    const [selectedOptionSel, setSelectedOptionSel] = useState([]);
    const [selectedRespostas, setSelectedRespostas] = useState([]);
    const [height, setHeight] = useState([]); // Altura inicial em cm
    const [peso, setPeso] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [startDateH, setStartDateH] = useState([]);
    const [error, setError] = useState('');
    const [cpf, setCpf] = useState([]);
    const [rg, setRg] = useState([]);

    const [selectedOptionId, setSelectedOptionId] = useState([]);
    const [selectedOptionsId, setSelectedOptionsId] = useState([]);
    const [selectedOptionSelId, setSelectedOptionSelId] = useState([]);
    const [selectedRespostasId, setSelectedRespostasId] = useState([]);
    const [heightId, setHeightId] = useState([]); // Altura inicial em cm
    const [pesoId, setPesoId] = useState([]);
    const [startDateId, setStartDateId] = useState([]);
    const [startDateHId, setStartDateHId] = useState([]);
    const [cpfId, setCpfId] = useState([]);
    const [rgId, setRgId] = useState([]);

    const [isSucess, setIsSucess] = useState(false);
    const [isFalhou, setIsFalhou] = useState(false);

    const idQuestionarioo = useSelector(state => state.reduxH.idQuestionario);
    const nomePaclientee = useSelector(state => state.reduxH.nomePacliente);
    const idPaclientee = useSelector(state => state.reduxH.idPacliente);


    const handleChangeRg = (index, event, id) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length <= 9) {
            const formattedRg = formatRG(value);
            const newRespostas = [...rg]; // Cria uma cópia do estado atual
            const newRespostasId = [...rgId]; // Cria uma cópia do estado atual
            newRespostas[index] = formattedRg; // Atualiza a resposta para o índice correspondente
            newRespostasId[index] = id; // Cria uma cópia do estado atual
            setRg(newRespostas);
            setRgId(newRespostasId);
        }
    };


    useEffect(() => {
        async function listar(e) {
            await apiC.post("/quationario/buscarPerguntas", {
                "idQuestionario": idQuestionarioo,
            })
                .then(response => {
                    if (response.status === 200) {
                        setQuestions(response.data)
                        // if (response.data.result.length == 0) {
                        // } else {
                        // }

                    }
                })
                .catch((error) => {

                    alert(error.response.data)

                });
        }
        listar()

    }, [])

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



    const handleChangeCpf = (index, dado, id) => {
        const { value } = dado;
        // Remove tudo que não é número
        const onlyNumbers = value.replace(/\D/g, '');

        // Formata o CPF: 000.000.000-00
        const formattedCpf = onlyNumbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');

        const newRespostas = [...cpf]; // Cria uma cópia do estado atual
        const newRespostasId = [...cpfId]; // Cria uma cópia do estado atual
        newRespostas[index] = formattedCpf; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setCpf(newRespostas);
        setCpfId(newRespostasId);
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

    const handleChangeD = (index, date, id) => {
        if (date) {
            const newRespostas = [...startDate]; // Cria uma cópia do estado atual
            const newRespostasId = [...startDateId]; // Cria uma cópia do estado atual
            newRespostas[index] = date; // Atualiza a resposta para o índice correspondente
            newRespostasId[index] = id; // Cria uma cópia do estado atual
            setStartDate(newRespostas);
            setStartDateId(newRespostasId);
            setError(''); // Limpa o erro se a data é válida
        }
    };
    const handleChangeDH = (index, date, id) => {
        if (date) {
            const newRespostas = [...startDateH]; // Cria uma cópia do estado atual
            const newRespostasId = [...startDateHId]; // Cria uma cópia do estado atual
            newRespostas[index] = date; // Atualiza a resposta para o índice correspondente
            newRespostasId[index] = id; // Cria uma cópia do estado atual
            setStartDateH(newRespostas);
            setStartDateHId(newRespostasId);
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

    function converterDataHoraISOParaMySQL(dataISO) {
        console.log("vvvvvv", dataISO)
        const jsDate = new Date(dataISO);
        return format(jsDate, 'yyyy-MM-dd HH:mm:ss');
    }

    function converterDataISOParaMySQL(dataISO) {
        console.log("vvvvvv", dataISO)
        const jsDate = new Date(dataISO);
        return format(jsDate, 'yyyy-MM-dd');
    }

    async function formatArrayData(array) {
        let newArray = [];
        let newArrayFormat = [];

        if (array.some(value => value !== undefined)) {
            newArray = array
                .filter(value => value !== undefined) // Remove os valores undefined
        }

        if (newArray.length > 0) {
            for (let j = 0; j < newArray.length; j++) {
                newArrayFormat.push(converterDataISOParaMySQL(newArray[j]))
            }
            return newArrayFormat
        } else {
            return newArray
        }

    }

    async function formatArrayDataHora(array) {
        let newArray = [];
        let newArrayFormat = [];

        if (array.some(value => value !== undefined)) {
            newArray = array
                .filter(value => value !== undefined) // Remove os valores undefined
        }

        if (newArray.length > 0) {
            for (let j = 0; j < newArray.length; j++) {
                newArrayFormat.push(converterDataHoraISOParaMySQL(newArray[j]))
            }
            return newArrayFormat
        } else {
            return newArray
        }

    }

    async function formatArray(array) {
        let newArray = [];

        if (array.some(value => value !== undefined)) {
            newArray = array
                .filter(value => value !== undefined) // Remove os valores undefined
        }

        return newArray


    }

    async function formatArrayMult(array) {

        let newArray = []

        if (array.length > 0) {
            // Remover o valor na posição 0
            const modifiedArray = array.slice(1);

            // Objeto para armazenar arrays por posição
            const result = [];

            // Iterar pelos itens restantes
            modifiedArray.forEach(item => {
                const position = item.split('-')[1]; // Pega a posição após o '-'

                // Verifica se a posição é um número, caso contrário, ignora
                if (!isNaN(position)) {
                    if (!result[position]) {
                        result[position] = []; // Se não existir, cria um novo subarray
                    }

                    // Adiciona o item ao subarray correspondente
                    result[position].push(item);
                }
            });

            // Exibir resultados
            newArray = result
        }

        return newArray;

    }

    async function formatArrayAltura(array) {

        let newArray = [];

        if (array.some(value => value !== undefined)) {
            newArray = array
                .filter(value => value !== undefined) // Remove os valores undefined
                .map(value => `${value} cm`); // Adiciona "cm" aos valores restantes
        }
        return newArray
    }

    async function formatArrayPeso(array) {

        let newArray = [];

        if (array.some(value => value !== undefined)) {
            newArray = array
                .filter(value => value !== undefined) // Remove os valores undefined
                .map(value => `${value} km`); // Adiciona "cm" aos valores restantes
        }


        return newArray
    }

    async function handleSaveClick() {

        let formatSelectedOption = [];
        let formatSelectedOptionIdPergunta = [];
        formatSelectedOption = await formatArray(selectedOption);
        formatSelectedOptionIdPergunta = await formatArray(selectedOptionId);

        let formatSelectedOptions = [];
        let formatSelectedOptionsIdPergunta = [];
        formatSelectedOptions = await formatArrayMult(selectedOptions);
        formatSelectedOptionsIdPergunta = await formatArray(selectedOptionsId);

        let formatSelectedOptionSel = [];
        let formatSelectedOptionSelIdPergunta = [];
        formatSelectedOptionSel = await formatArray(selectedOptionSel);
        formatSelectedOptionSelIdPergunta = await formatArray(selectedOptionSelId);

        let formatSelectedRespostas = [];
        let formatSelectedRespostasIdPergunta = [];
        formatSelectedRespostas = await formatArray(selectedRespostas);
        formatSelectedRespostasIdPergunta = await formatArray(selectedRespostasId);

        let formatHeight = [];
        let formatHeightIdPergunta = [];
        formatHeight = await formatArrayAltura(height);
        formatHeightIdPergunta = await formatArray(heightId);

        let formatPeso = [];
        let formatPesoIdPergunta = [];
        formatPeso = await formatArrayPeso(peso);
        formatPesoIdPergunta = await formatArray(pesoId);

        let formatStartDate = [];
        let formatStartDateIdPergunta = [];
        formatStartDate = await formatArrayData(startDate);
        formatStartDateIdPergunta = await formatArray(startDateId);

        let formatStartDateH = [];
        let formatStartDateHIdPergunta = [];
        formatStartDateH = await formatArrayDataHora(startDateH);
        formatStartDateHIdPergunta = await formatArray(startDateHId);

        let formatCpf = [];
        let formatCpfIdPergunta = [];
        formatCpf = await formatArray(cpf);
        formatCpfIdPergunta = await formatArray(cpfId);

        let formatRg = [];
        let formatRgIdPergunta = [];
        formatRg = await formatArray(rg);
        formatRgIdPergunta = await formatArray(rgId);


        await apiC.post("/quationario/respostas", {
            "formatSelectedOption": formatSelectedOption,
            "formatSelectedOptionIdPergunta": formatSelectedOptionIdPergunta,
            "formatSelectedOptions": formatSelectedOptions,
            "formatSelectedOptionsIdPergunta": formatSelectedOptionsIdPergunta,
            "formatSelectedOptionSel": formatSelectedOptionSel,
            "formatSelectedOptionSelIdPergunta": formatSelectedOptionSelIdPergunta,
            "formatSelectedRespostas": formatSelectedRespostas,
            "formatSelectedRespostasIdPergunta": formatSelectedRespostasIdPergunta,
            "formatHeight": formatHeight,
            "formatHeightIdPergunta": formatHeightIdPergunta,
            "formatPeso": formatPeso,
            "formatPesoIdPergunta": formatPesoIdPergunta,
            "formatStartDate": formatStartDate,
            "formatStartDateIdPergunta": formatStartDateIdPergunta,
            "formatStartDateH": formatStartDateH,
            "formatStartDateHIdPergunta": formatStartDateHIdPergunta,
            "formatCpf": formatCpf,
            "formatCpfIdPergunta": formatCpfIdPergunta,
            "formatRg": formatRg,
            "formatRgIdPergunta": formatRgIdPergunta,
            "idPacliente": idPaclientee
        })
            .then(response => {
                if (response.status === 200) {
                    formatSelectedOption = [];
                    formatSelectedOptionIdPergunta = [];
                    formatSelectedOptions = [];
                    formatSelectedOptionsIdPergunta = [];
                    formatSelectedOptionSel = [];
                    formatSelectedOptionSelIdPergunta = [];
                    formatSelectedRespostas = [];
                    formatSelectedRespostasIdPergunta = [];
                    formatHeight = [];
                    formatHeightIdPergunta = [];
                    formatPeso = [];
                    formatPesoIdPergunta = [];
                    formatStartDate = [];
                    formatStartDateIdPergunta = [];
                    formatStartDateH = [];
                    formatStartDateHIdPergunta = [];
                    formatCpf = [];
                    formatCpfIdPergunta = [];
                    formatRg = [];
                    formatRgIdPergunta = [];

                    setQuestions([]);
                    setSelectedOption([]);
                    setSelectedOptions(['']);
                    setSelectedResposta('');
                    setSelectedOptionSel([]);
                    setSelectedRespostas([]);
                    setHeight([]);
                    setPeso([]);
                    setStartDate([]);
                    setStartDateH([]);
                    setRg([]);
                    setSelectedOptionId([]);
                    setSelectedOptionsId([]);
                    setSelectedOptionSelId([]);
                    setSelectedRespostasId([]);
                    setHeightId([]);
                    setPesoId([]);
                    setStartDateId([]);
                    setStartDateHId([]);
                    setCpfId([]);
                    setRgId([]);
                    despacho(seguirTriagem(false))
                    despacho(seguirPacliente(false))
                    despacho(seguirCliente(false))
                    setIsSucess(true)
                    setIsModalOpen(false)
                    setIsFalhou(false)
                }
            })
            .catch((error) => {

                // alert(error.response.data)
                alert('erro questionario não salvo')
                setIsFalhou(true)
                setIsModalOpen(false)
                setIsSucess(false)

            });


    };

    async function voltar() {
        despacho(seguirTriagem(false))
        despacho(seguirPacliente(false))
        despacho(seguirCliente(true))
    }

    const handleHeightChange = (index, value, id) => {
        const newRespostas = [...height]; // Cria uma cópia do estado atual
        const newRespostasId = [...heightId]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setHeight(newRespostas);
        setHeightId(newRespostasId);
    };

    const handlePesoChange = (index, value, id) => {
        const newRespostas = [...peso]; // Cria uma cópia do estado atual
        const newRespostasId = [...pesoId]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setPeso(newRespostas);
        setPesoId(newRespostasId);
    };

    const handleResposta = (index, value, id) => {
        const newRespostas = [...selectedRespostas]; // Cria uma cópia do estado atual
        const newRespostasId = [...selectedRespostasId]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setSelectedRespostas(newRespostas); // Atualiza o estado com a nova array de respostas
        setSelectedRespostasId(newRespostasId); // Atualiza o estado com a nova array de respostas
    };




    const handleChangeRa = (index, value, id) => {
        const newRespostas = [...selectedOption]; // Cria uma cópia do estado atual
        const newRespostasId = [...selectedOptionId]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setSelectedOption(newRespostas); // Atualiza o estado com a nova array de respostas
        setSelectedOptionId(newRespostasId); // Atualiza o estado com a nova array de respostas
    };

    const handleChangeChec = (index, event, id) => {
        const newRespostas = [...selectedOptions]; // Cria uma cópia do estado atual
        const newRespostasId = [...selectedOptionsId]; // Cria uma cópia do estado atual
        const value = event.target.value;
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setSelectedOptions(newRespostas);
        setSelectedOptionsId(newRespostasId); // Atualiza o estado com a nova array de respostas
    };


    const handleChangeS = (index, value, id) => {
        const newRespostas = [...selectedOptionSel]; // Cria uma cópia do estado atual
        const newRespostasId = [...selectedOptionSelId]; // Cria uma cópia do estado atual
        newRespostas[index] = value; // Atualiza a resposta para o índice correspondente
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setSelectedOptionSel(newRespostas); // Atualiza o estado com a nova array de respostas
        setSelectedOptionSelId(newRespostasId); // Atualiza o estado com a nova array de respostas
    };

    const handleChangeC = (event, index, id) => {
        const value = event.target.value;
        const newRespostasId = [...selectedOptionsId]; // Cria uma cópia do estado atual
        newRespostasId[index] = id; // Cria uma cópia do estado atual
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value]
        );
        setSelectedOptionsId(newRespostasId); // Atualiza o estado com a nova array de respostas
    };

    return (
        <div>
            < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                <i className="fas fa-arrow-circle-left fsi"  ></i>
                <h3 className="voltar-titulo">
                    VOLTAR
                </h3>
            </Button>
            <h2 className='nomePacliente'>{nomePaclientee}</h2>

            {questions.map((question, indexQ) => {
                const { id, id_questao, title, text, options, type } = question;

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
                                        onChange={event => handleChangeDH(indexQ, event, id_questao)}
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
                                        onChange={event => handleChangeD(indexQ, event, id_questao)}
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
                                        onChange={event => handleHeightChange(indexQ, event.target.value, id_questao)}
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
                                        onChange={event => handlePesoChange(indexQ, event.target.value, id_questao)}
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
                                <select className="custom-select" value={selectedOptionSel[indexQ]}
                                    onChange={event => handleChangeS(indexQ, event.target.value, id_questao)}>

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
                                        onChange={event => handleResposta(indexQ, event.target.value, id_questao)}
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
                                            onChange={event => handleChangeCpf(indexQ, event.target, id_questao)}
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
                                            onChange={event => handleChangeRg(indexQ, event, id_questao)}
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
                                                onChange={event => handleChangeRa(indexQ, event.target.value, id_questao)}
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
                                            value={`${option}-${indexQ}`}
                                            checked={selectedOptions.includes(`${option}-${indexQ}`)}
                                            onChange={event => handleChangeC(event, indexQ, id_questao)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {

                <button onClick={(e) => (handleSaveClick())} className='buttQ'>Salvar</button>
            }
             <Modal isOpen={isSucess} onRequestClose={() => setIsSucess(false)} className='modal'>
      <div className='posicion'>
            <FaTimes
              onClick={() => setIsSucess(false)}
              className='fechar'
            />
          </div>
        <div className='modal-pos-sucess'>
         
          <div className='posiItem'>

            <h2 className='posText'>
              <i className="fa fa-check-circle" aria-hidden="true" 
              style={{ fontSize: '52px', color: 'green' }}></i>
            </h2>

          </div>
          <p className='msg'>Questionário salvo!</p>
          <h1 className='msg2'>A consulta foi aberta para o pacliente!</h1>

        </div>
      </Modal>

      <Modal isOpen={isFalhou} onRequestClose={() => setIsFalhou(false)} className='modal'>
      <div className='posicion'>
            <FaTimes
              onClick={() => setIsFalhou(false)}
               className='fechar'
            />
          </div>
          <div className='modal-pos-sucess'>
          
          <div className='posiItem'>

          <h2 className='posText'>
              <i className="fa fa-times-circle" aria-hidden="true" style={{ fontSize: '52px', color: 'red' }}></i>
            </h2>

          </div>
          <p className='msg'>Erro ao salvar!</p>
          <h1 className='msg2'>Contate a equipe de suporte!</h1>


  
        </div>
      </Modal>
        </div>

        
    );
};

// SimuladorQuestionComponent.propTypes = {
//     questions: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             options: PropTypes.arrayOf(PropTypes.string).isRequired,
//             text: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             type: PropTypes.oneOf(['select', 'radio', 'checkbox']).isRequired,
//         })
//     ).isRequired,
// };

// export default SimuladorQuestionComponent;