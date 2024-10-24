import React, { useState, useEffect } from 'react';/*eslint-disable*/
import './../Consulta/consulta.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import BootstrapTable from 'react-bootstrap-table-next';
import { useNavigate } from 'react-router-dom';
// import Dropzone from "react-dropzone";
import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
// import DateInput from '../login/heal.js/calendarioAtual';
import moment from 'moment';
// import SelectGrupo from '../login/selectGrupo';
// import Pronturario2 from '../login/prontuario2';
// import { editarProntuario, voltarProntuario, propsEditar } from '../../actions/actions';
import { isValid, parseISO, format } from 'date-fns';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicOffIcon from '@mui/icons-material/MicOff';
import { ptBR } from 'date-fns/locale';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X
// import { atualizarTabela } from '../../actions/actions';
// import ContagemRegre from './contagemRegre';
// import ModalAviso from './modalAviso';
import DatePicker from "react-datepicker";
import ContagemRegre from './contagemRegre';



export default function Consulta(props) {

 
    const idUsuario = useSelector(state => state.reduxH.idUsuario);
    const [transcription, setTranscription] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    let recognition = null;
    window.Buffer = Buffer;
    const [itens, setItens] = useState([]);
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [time3, setTime3] = useState('');
    const [time4, setTime4] = useState('');
    const [liga, setLiga] = useState('');
    const navigate = useNavigate();
    const [jogador, setJogador] = useState('');
    const [observacoes, setObservacoes] = useState('');
    // const expandirNavegacao = useSelector(state => state.reduxH.expandirNavegacao);

    const [permissaoDescricao, setPermissaoDescricao] = useState();
    const despacho = useDispatch();
    const [inputDate, setInputDate] = useState('');
    const [isValidDate, setIsValidDate] = useState(true);
    // const editarProntuarioo = useSelector(state => state.reduxH.editarProntuario);
    // const propsEditarr = useSelector(state => state.reduxH.propsEditar);

    const [jogador1, setJogador1] = useState('');
    const [jogador2, setJogador2] = useState('');
    const [jogador3, setJogador3] = useState('');
    const [jogador4, setJogador4] = useState('');
    const [time, setTime] = useState('');
    const [pesquisarTime, setPesquisarTime] = useState('');
    const [resultado, setResultado] = useState(false);
    const [nenhumResultado, setNenhumResultado] = useState('Nenhum resultado encontrado');
    const [mostrarTime, setMostrarTime] = useState(false);
    let contador = 0
    let itensVar = []
    const [mostrarImagem, setMostrarImagem] = useState('');
    const [imagemBuscada, setImagemBuscada] = useState('');
    const [nome, setNome] = useState('');
    // let token = JSON.parse(localStorage.getItem("keyToken"))
    const [getName, setGetName] = useState('');
    const exemplo = ['exemplo']
    const [text, setText] = useState('');
    const [filtroAtivacaoDataInicio, setFiltroAtivacaoDataInicio] = useState('');
    const [filtroAtivacaoDataFinal, setFiltroAtivacaoDataFinal] = useState('');
    const [dataMin, setDataMin] = useState(1990)
    const [dataMax, setDataMax] = useState(new Date())
    const [aparecerContagem, setAparecerContagem] = useState(false)
    const [novaData, setNovaData] = useState('')
    const [confirmEditar, seConfirmEditar] = useState(false)


    const [tipoArquivo, setTipoArquivo] = useState(0);


    const [envioImagem, setEnvioImagem] = useState("");
    const [date, setDate] = useState('');
    const [desabilitarButao, setDesabilitarButao] = useState(true);
    const [desabilitarButaoEditar, setDesabilitarButaoEditar] = useState(false);
    const [monitoraMudanca1, setMonitoraMudanca1] = useState(false);
    const [monitoraMudanca2, setMonitoraMudanca2] = useState(false);
    const [monitoraMudanca3, setMonitoraMudanca3] = useState(false);
    const [monitoraMudanca1Editar, setMonitoraMudanca1Editar] = useState(false);
    const [monitoraMudanca2Editar, setMonitoraMudanca2Editar] = useState(false);
    const [monitoraMudanca3Editar, setMonitoraMudanca3Editar] = useState(false);
    const [descr, setDescr] = useState('');
    const [isValidDescr, setIsValidDescr] = useState(false);
    // const [transcription, setTranscription] = useState('');
    // const [isRecording, setIsRecording] = useState(false);
    // const speechClient = new SpeechClient();
    const [eptestar, setEptestar] = useState();
    const [editableTranscript, setEditableTranscript] = useState('');
    const [isActive, setIsActive] = useState(false);

    const [checkConsulta, setCheckConsulta] = useState(false);
    const [checkExame, setCheckExame] = useState(false);
    const [checkAnotacao, setCheckAnotacao] = useState(false);
    const [checkLaudo, setCheckLaudo] = useState(false);
    const [checkLaboratorio, setCheckLaboratorio] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isValidProcedureDate, setIsValidProcedureDate] = useState(true);
    const [isValidReturnDate, setIsValidReturnDate] = useState(true);
    const [returnDate, setReturnDate] = useState('');

    const [inforDataProc, setInforDataProc] = useState(false);
    const [inforDataRetor, setInforDataRetor] = useState(false);
    const [inforAnotacao, setInforAnotacao] = useState(false);

    const idPacliente = useSelector(state => state.reduxH.idPacliente);
    const idConsulta = useSelector(state => state.reduxH.idConsulta);

    const [isSucess, setIsSucess] = useState(false);
    const [isFalhou, setIsFalhou] = useState(false);
    
    // CAIXA DE AVISO

    const ConfirmationModal = ({ isOpen, message, rota }) => {
        let editar = false
        if (!isOpen) {
            return null;
        }

        if (rota == 'editar') {
            editar = true
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <p>{message}</p>
                    <div className="button-container">
                        <button className='botaoCadastro' onClick={editar ? editarArquivo : cadastrarArquivo}>Sim</button>
                        <button className='botaoCadastro' onClick={handleCancelAction}>Não</button>
                    </div>
                </div>
            </div>
        );
    };


    const handleCancelAction = () => {
        setIsModalOpen(false); // Fechar o modal ao clicar em "Não"
    };

    //FIM///////

    //CAIXA DE GRAVAÇÂO DE VOZ
    const startRecording = () => {
        setAparecerContagem(true)
        recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'pt-BR'; // Define o idioma para português brasileiro, se necessário
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsRecording(true);
        };
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscription(prevTranscription => prevTranscription + transcript + '. ');
                    setEditableTranscript(prevTranscription => prevTranscription + transcript + '. ');
                } else {
                    interimTranscript += transcript;
                }
            }
        };

        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento de voz: ', event.error);
            alert('Erro no reconhecimento de voz')
            console.log("Erro no reconhecimento de voz log", event.error)
            setIsRecording(false);
            setAparecerContagem(false)
        };

        recognition.onend = () => {
            setIsRecording(false);
            setAparecerContagem(false)
        };

        recognition.start();
        setEptestar(recognition)
    };

    const handleInputChangee = (event) => {
        setEditableTranscript(event.target.value);
        setTranscription(event.target.value);
    };

    const stopRecording = () => {

        eptestar.stop();
        setIsRecording(false);
        setAparecerContagem(false)
    };
    //FIM///////

    function atualizarDescricao(event) {
        setDescr(event.target.value)
    }
    // useEffect(() => {
    //     if (propsEditarr) {
    //         setDescr(propsEditarr.descricao)
    //         setEditableTranscript(propsEditarr.anotacao)
    //         var partes = propsEditarr.data.split('/');
    //         var formData = new Date(propsEditarr.data);
    //         let dtY = formData.getFullYear().toString()
    //         let dtM = (formData.getMonth() + 1).toString()
    //         let mesFormatado = dtM < 10 ? '0' + dtM : dtM;
    //         let dtD = formData.getDate().toString()
    //         let diaFormatado = dtD < 10 ? '0' + dtD : dtD;
    //         let dta = diaFormatado + "/" + mesFormatado + "/" + dtY
    //         setDate(dta)
    //     }
    // }, [propsEditarr])


    // useEffect(() => {
    //     function verifyArquivo() {
    //         switch (propsEditarr.id_procedimento) {
    //             case 1:
    //                 return setCheckConsulta(true) + setCheckExame(false) + setCheckAnotacao(false)
    //                     + setCheckLaudo(false) + setCheckLaboratorio(false)
    //             case 2:
    //                 return setCheckConsulta(false) + setCheckExame(true) + setCheckAnotacao(false)
    //                     + setCheckLaudo(false) + setCheckLaboratorio(false)
    //             case 3:
    //                 return setCheckConsulta(false) + setCheckExame(false) + setCheckAnotacao(true)
    //                     + setCheckLaudo(false) + setCheckLaboratorio(false)
    //             case 4:
    //                 return setCheckConsulta(false) + setCheckExame(false) + setCheckAnotacao(false)
    //                     + setCheckLaudo(true) + setCheckLaboratorio(false)
    //             case 5:
    //                 return setCheckConsulta(false) + setCheckExame(false) + setCheckAnotacao(false)
    //                     + setCheckLaudo(false) + setCheckLaboratorio(true)
    //         }
    //     }
    //     verifyArquivo()
    // }, [])



    const handleInputChange = (dataString) => {
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/; // Expressão regular para 'dd/mm/yyyy'
        if (!regexData.test(dataString)) {
            // Formato inválido
        }


        try {
            const data = parseISO(dataString); // Tenta fazer o parse da data
            if (isValid(data)) {
                // setIsValidDate(true)

            }; // Retorna true se for uma data válida
        } catch (error) {
            // return  setIsValidDate(false); // Retorna false se houver erro no parse

        }


        const partesData = dataString.split('/');
        const dia = parseInt(partesData[0]);
        const mes = parseInt(partesData[1]);
        const ano = parseInt(partesData[2]);


        // Validação mais detalhada: verificar se é uma data válida
        const data = new Date(ano, mes - 1, dia); // Note que o mês no Date é zero-indexed (0 = janeiro)
        if (isValid(data)) {
            setIsValidDate(true)
            setMonitoraMudanca2(true)
        } else {
            setIsValidDate(false)
            setMonitoraMudanca2(false)
        }
        if (dataString == '') {
            setIsValidDate(true)
            setMonitoraMudanca2(true)
        }
    };

    const validarDesc = (dataString) => {
        if (dataString == '') {
            setIsValidDescr(true)
            setMonitoraMudanca3(false)
        } else {
            setIsValidDescr(false)
            setMonitoraMudanca3(true)
        }
    };

    useEffect(() => {
        if (monitoraMudanca1 && monitoraMudanca2 && monitoraMudanca3) {
            setDesabilitarButao(false)
        } else {
            setDesabilitarButao(true)
        }

    }, [monitoraMudanca1, monitoraMudanca2, monitoraMudanca3])


    useEffect(() => {
        if (monitoraMudanca1Editar && monitoraMudanca2Editar && monitoraMudanca3Editar) {
            setDesabilitarButaoEditar(false)
        } else {
            setDesabilitarButaoEditar(true)
        }

    }, [monitoraMudanca1Editar, monitoraMudanca2Editar, monitoraMudanca3Editar])

    useEffect(() => {

        setDesabilitarButaoEditar(false)


    }, [])

    let contagem = 0

    // useEffect(() => {
    //     async function autenticar(e) {
    //         await apiC.post("autenticacao/autenticar")
    //             .then(response => {
    //             })
    //             .catch((error) => {
    //                 if (error.response.data === 'não autenticado') {
    //                     navigate('/')
    //                 }
    //             });
    //     }
    //     setTimeout(autenticar, 5000);
    // }, [])

    useEffect(() => {
        setText(JSON.parse(localStorage.getItem('idioma')))
    }, [])

    // useEffect(() => {
    //     function tipArquivoEditar() {
    //         switch (propsEditarr.id_procedimento) {
    //             case 1:
    //                 return setTipoArquivo(1)
    //             case 2:
    //                 return setTipoArquivo(2)
    //             case 3:
    //                 return setTipoArquivo(3)
    //             case 4:
    //                 return setTipoArquivo(4)
    //             case 5:
    //                 return setTipoArquivo(5)
    //         }
    //     }
    //     tipArquivoEditar()
    // }, [])

  

    async function cadastrarTime() {

        await apiC.post("cadastrar/time", {
            "liga": liga,
            "time1": time1,
            "time2": time2,
            "time3": time3,
            "time4": time4,
            headers: {
                'x-access-token': token,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    alert('liga e times cadastrados')
                }
            })
            .catch((error) => {
                alert(error.response.data)
            });
    }

    async function buscarImagem() {

        await apiC.post("buscar/imagem", {
            "nome": nome,
        })
            .then(response => {
                if (response.status === 200) {
                    const imagePath = Buffer.from(response.data.result.data).toString();
                    setImagemBuscada(imagePath)
                }
            })
            .catch((error) => {
                console.log("error", error)
                // alert(error.response.data)

            });
    }



    async function editarArquivo() {
        let dta = ''
        if (isActive) {
            var partes = novaData.split('/');
            var formData = new Date(partes[2], partes[1] - 1, partes[0]);
            let dtY = formData.getFullYear().toString()
            let dtM = (formData.getMonth() + 1).toString()
            let mesFormatado = dtM < 10 ? '0' + dtM : dtM;
            let dtD = formData.getDate().toString()
            let diaFormatado = dtD < 10 ? '0' + dtD : dtD;
            dta = dtY + "-" + mesFormatado + "-" + diaFormatado
        }
        if (!isActive) {
            var partes = date.split('/');
            var formData = new Date(partes[2], partes[1] - 1, partes[0]);
            let dtY = formData.getFullYear().toString()
            let dtM = (formData.getMonth() + 1).toString()
            let mesFormatado = dtM < 10 ? '0' + dtM : dtM;
            let dtD = formData.getDate().toString()
            let diaFormatado = dtD < 10 ? '0' + dtD : dtD;
            dta = dtY + "-" + mesFormatado + "-" + diaFormatado
        }

        if (isValidDate && isActive && novaData != '') {

            if (descr != '') {

                await apiC.post("prontuario/editar", {
                    "descricao": descr,
                    "data": dta,
                    "id_prontuario": propsEditarr.id_prontuario,
                    "tipo_arquivo": tipoArquivo,
                    "anotacao": editableTranscript
                })
                    .then(response => {
                        if (response.status === 200) {
                            alert('Arquivo editado')
                            despacho(atualizarTabela(true))
                            // despacho(voltarProntuario(false))
                        }
                    })
                    .catch((error) => {

                    });

            }

            else {
                alert("descrição invalida")
            }


        } else if (isValidDate && !isActive) {

            if (descr != '') {

                await apiC.post("prontuario/editar", {
                    "descricao": descr,
                    "data": dta,
                    "id_prontuario": propsEditarr.id_prontuario,
                    "tipo_arquivo": tipoArquivo,
                    "anotacao": editableTranscript
                })
                    .then(response => {
                        if (response.status === 200) {
                            alert('Arquivo editado')
                            despacho(atualizarTabela(true))
                            // despacho(voltarProntuario(false))
                        }
                    })
                    .catch((error) => {

                    });

            }

            else {
                alert("descrição invalida")
            }
        }

        else {
            alert("data invalida")
        }




    }

    async function cadastrarArquivo() {
        var partes = date.split('/');
        var formData = new Date(partes[2], partes[1] - 1, partes[0]);
        let dtY = formData.getFullYear().toString()
        let dtM = (formData.getMonth() + 1).toString()
        let mesFormatado = dtM < 10 ? '0' + dtM : dtM;
        let dtD = formData.getDate().toString()
        let diaFormatado = dtD < 10 ? '0' + dtD : dtD;
        let dta = dtY + "-" + mesFormatado + "-" + diaFormatado



        await apiC.post("prontuario/adicionar", {
            "descricao": descr,
            "data": dta,
            "id_usuario": idUsuario,
            "tipo_arquivo": tipoArquivo,
            "anotacao": editableTranscript
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Arquivo cadastrado')
                  
                    // despacho(voltarProntuario(false))
                }
            })
            .catch((error) => {
               
            });


    }



    const colunas = [
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p>
                procedimento
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },

        {
            dataField: 'data',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p>
                Data
            </p>,
            formatter: (cell, row) => {
                const formData = new Date(cell)
                let dt = formData.toLocaleString('pt-BR')
                return <p>{dt === null ? '-' : dt}</p>;
            },
        },
        {
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p>
                Adicionar
            </p>,
            formatter: (cell, row) => {
                return <Button>
                    <p>adicionar</p>
                </Button>;
            },
        },
    ]

    function inserirData(data) {
        itensVar = []
        for (let i = 0; i < data.length; i++) {
            if (contador == i) {
                let k = i
                for (let j = 0; j < data.length; j++) {
                    itensVar[k] = data[j]
                    k++
                }
            }
            setItens(JSON.parse(JSON.stringify(itensVar)))
        }
    }

    const colunasTimes = [
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p>
                Jogadores
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
    ]


    // const itemExpandido = {
    //     className: 'fundo-cor-1',
    //     renderer: (row, rowIndex) => (

    //         <div className={expandirNavegacao === true ? "expand-row-tabela-dispositivos-1" : "expand-row-tabela-dispositivos-2"}>
    //             {/* <DetalhamentoLinha renderConsultaColunas={props.render} setRenderConsultaColunas={props.setRender} row={mapearDadoDetalhamentoLinha(row)} cdSimcard={row.CD_SIMCARD} gsm={row.FULLCALLERID} previsaoConsumo={row.PREVISAO} plano={row.PLANO + row.EXCEDENTE} renderizar={renderizar} setRenderizar={setRenderizar}></DetalhamentoLinha> */}
    //             <Pronturario2 idProntuario={row.id_pro} ></Pronturario2>

    //         </div>
    //     ),
    //     expandHeaderColumnRenderer: (row, rowIndex) => (
    //         <div className="cabecalho-linha-expandida">
    //         </div>
    //     ),
    //     expandColumnRenderer: (rowKey) => {
    //         return (
    //             <Button className="">
    //                 <p>expandir</p>
    //                 {/* <Image id={rowKey.rowKey} className="icone-botao-expandir-row nao-selecionavel"  /> */}
    //                 {/* <Image id={rowKey.rowKey} className="icone-botao-expandir-row nao-selecionavel" src={setaDropdown()} /> */}
    //             </Button>
    //         );
    //     },
    //     showExpandColumn: true,
    //     expandByColumnOnly: true,
    //     headerClasses: 'tabela-coluna-primeira-header',
    // };

    async function handleAlterar(novaImagem, nome) {
        await apiC.post('/inserir/imagem', {
            "imagem": novaImagem,
            "nome": nome,
        })
            .then(function (response) {
                setMostrarImagem(novaImagem)
                alert('foto registrada com sucesso')
            })
            .catch(function (error) {
                alert(error.response.data)
                console.log("erooooo", error)
            });
    }
    const eventosLinhas = {
        onClick: (e, row, rowIndex) => {
        }
    }



    function tipArquivo(tipo) {
        setCheckConsulta(false)
        setCheckExame(false)
        setCheckAnotacao(false)
        setCheckLaudo(false)
        setCheckLaboratorio(false)
        console.log("passou sim", tipo)
        switch (tipo) {
            case 'consulta':
                return setTipoArquivo(1) + setMonitoraMudanca1(true)
            case 'imagem':
                return setTipoArquivo(2) + setMonitoraMudanca1(true)
            case 'anotacao':
                return setTipoArquivo(3) + setMonitoraMudanca1(true)
            case 'laudo':
                return setTipoArquivo(4) + setMonitoraMudanca1(true)
            case 'exame':
                return setTipoArquivo(5) + setMonitoraMudanca1(true)
        }
    }


    const handleClick = () => {
        setIsActive(!isActive); // Inverte o estado atual ao clicar
    };

    function handleLerArquivo(files) {
        let reader = new FileReader();
        let format = files.name.replace(".jpg", "")
        setGetName(format)
        if (files.size <= 9048576 && files.type.split('/')[0] === "image" && files.type.split('/')[0] !== "gif" && files.type.split('/')[0] !== "psd") {
            reader.readAsDataURL(files);
            reader.onloadend = () => {

                setEnvioImagem(reader.result)
                // handleAlterar(reader.result, format)
            }
        } else {
            if (files.size > 9048576) {
                alert('Erro tamanho de foto muito grande')
            } else {
                alert('Erro ao importar foto')
            }

        }
        // if (files.size <= 1048576 && files.type.split('/')[0] === "image" && files.type.split('/')[0] !== "gif" && files.type.split('/')[0] !== "psd") {
        //     reader.readAsDataURL(files);
        //     reader.onloadend = () => {
        //         handleAlterar(reader.result, format)
        //     }
        // } else {
        //     if (files.size > 1048576) {
        //         alert('Erro tamanho de foto muito grande')
        //     } else {
        //         alert('Erro ao importar foto')
        //     }

        // }
    };



    // function fechar() {

    //     despacho(voltarProntuario(false))
    //     // despacho(editarProntuario(false))
    // }

    const validateDate = (value, setValidity) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/YYYY
        if (!datePattern.test(value)) {
            setValidity(false);
            return false;
        }

        const [day, month, year] = value.split('/').map(Number);
        const dateObj = new Date(year, month - 1, day);



        if (dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
            setValidity(true);
            return true;
        }

        setValidity(false);
        return false;
    };

    async function salvar(params) {
        

        if (!novaData && !returnDate && !editableTranscript) {
            setInforAnotacao(true)
            setInforDataProc(true)
            setInforDataRetor(true)
            return
        } else if (!novaData && !returnDate) {
            setInforAnotacao(false)
            setInforDataProc(true)
            setInforDataRetor(true)
            return
        } else if (!returnDate && !editableTranscript) {
            setInforAnotacao(true)
            setInforDataProc(false)
            setInforDataRetor(true)
            return
        } else if (!novaData && !editableTranscript) {
            setInforAnotacao(true)
            setInforDataProc(true)
            setInforDataRetor(false)
            return
        } else if (!novaData) {
            setInforAnotacao(false)
            setInforDataProc(true)
            setInforDataRetor(false)
            return
        } else if (!editableTranscript) {
            setInforAnotacao(true)
            setInforDataProc(false)
            setInforDataRetor(false)
            return
        } else if (!returnDate) {
            setInforAnotacao(false)
            setInforDataProc(false)
            setInforDataRetor(true)
            return
        }

        let dataProc = converterDataISOParaMySQL(novaData)
        let dataRetorn = converterDataISOParaMySQL(returnDate)


        await apiC.post("/consulta/inserirConsulta", {
            "idPacliente": idPacliente,
            "idConsulta": idConsulta,
            "idMedico": 1,
            "anotacao": editableTranscript,
            "dataProcedimento": dataProc,
            "dataRetorno": dataRetorn,
        })
            .then(response => {
                if (response.status === 200) {
                    setIsSucess(true)
                    setIsModalOpen(false)
                    setIsFalhou(false)
                  setTimeout(() => {
                    window.location.href = '/consultasAbertas'; // Substitua '/outra-pagina' pela sua rota
                }, 3000);
                }
            })
            .catch((error) => {
                alert("erro ao pesquisar")
                setIsFalhou(true)
                setIsModalOpen(false)
                setIsSucess(false)
            })

    }

    function converterDataISOParaMySQL(dataISO) {
        const jsDate = new Date(dataISO);
        return format(jsDate, 'yyyy-MM-dd');
    }

    return (
        <>
            {aparecerContagem &&
                <ContagemRegre></ContagemRegre>
            }

            {/* {!editarProntuarioo ?
                <div className='p-lado'>


                    <div className="coluna-alterar-ciclo-vida-1-ativacao">

                        {/* <Form.Label className="fonte-cor-1 label-campo-ativacao">Ativação</Form.Label> */}
            {/* <div className="break-3"></div> */}
            {/* <Form.Group>
                            {/* Componente Calendário */}
            {/* <div className="conteudo-calendario-filtro">
                                      <Form.Control name="ATIVACAO_INICIO" type="text" value={filtroAtivacaoDataInicio ? moment(filtroAtivacaoDataInicio).format("YYYY-MM-DD hh:mm:ss") : filtroAtivacaoDataInicio} className="d-none" />
                                      <Calendario imputCustomisado='De:' data={filtroAtivacaoDataInicio} setData={setFiltroAtivacaoDataInicio} dataMax={filtroAtivacaoDataFinal ? filtroAtivacaoDataFinal : dataMax} dataMin={dataMin} rota={"filtroSimcard"}></Calendario>
                                  </div> */}
            {/* <div className="conteudo-calendario-filtro">
                                      <Form.Control name="ATIVACAO_FINAL" type="text" value={filtroAtivacaoDataFinal ? moment(filtroAtivacaoDataFinal).format("YYYY-MM-DD hh:mm:ss") : filtroAtivacaoDataFinal} className="d-none" />
                                      <Calendario imputCustomisado='Até:' data={filtroAtivacaoDataFinal} setData={setFiltroAtivacaoDataFinal} dataMax={dataMax} dataMin={filtroAtivacaoDataInicio ? filtroAtivacaoDataInicio : dataMin} rota={"filtroSimcard"}></Calendario>
                                  </div> */}

            {/* </Form.Group>
                    </div> */}




            {/* <div className='modal'>


                        <did className='modal-content1'>
                            <Button className="botaoVoltar" onClick={fechar} >
                                <p className='voltar' >VOLTAR</p>
                            </Button>
                            <div className='cimaPront'>

                                <div className='lado-d'>
                                    <div className='cima'>
                                        <label className='labell-1'>Descrição</label>
                                        <Form.Control
                                            onChange={e => { validarDesc(e.target.value); setDescr(e.target.value) }}
                                            value={descr}
                                            placeholder='Descrição'
                                            className='imput-5'
                                        />
                                        {isValidDescr && <p className='descriInvalida'>Preencher descrição</p>}
                                    </div>

                                    <div className='cima'>
                                        <label className='labell-1'>Data do procedimento</label>
                                        <div>

                                            <input
                                                className='imput-7'
                                                type="text"
                                                value={date}
                                                onChange={e => { handleInputChange(e.target.value); setDate(e.target.value) }}
                                                placeholder="DD/MM/YYYY"
                                            />
                                            {!isValidDate && <p className='dataInvalida'>Data inválida!</p>}
                                        </div>
                                    </div>
                                </div>

                                <label className='label-5 corpadrão'>{text.tipoDocumento}</label> */}

            {/* <Form.Group>
                                    <div className="flex-filtros">
                                        <label className="label-radio-1 corpadrão" onChange={() => { tipArquivo("consulta") }}>Consulta

                                            <input type="radio" name="tipo_doc" />

                                            <span className="checkbox-filtros-b campo-texto-cor-3"></span>
                                        </label>
                                        <label className="label-radio-1 corpadrão" onChange={() => { tipArquivo("imagem") }}>Exame de Imagem
                                            <input type="radio" name="tipo_doc" />

                                            <span className="checkbox-filtros-b  campo-texto-cor-3"></span>

                                        </label>
                                        <label className="label-radio-1 corpadrão" onChange={() => { tipArquivo("anotacao") }}>Anotção clinica

                                            <input type="radio" name="tipo_doc" />

                                            <span className="checkbox-filtros-b  campo-texto-cor-3"></span>
                                        </label>
                                        <label className="label-radio-1 corpadrão" onChange={() => { tipArquivo("laudo") }}>Laudo

                                            <input type="radio" name="tipo_doc" />

                                            <span className="checkbox-filtros-b campo-texto-cor-3"></span>
                                        </label>
                                        <label className="label-radio-1 corpadrão" onChange={() => { tipArquivo("exame") }}>Exame de laboratório

                                            <input type="radio" name="tipo_doc" />

                                            <span className="checkbox-filtros-b campo-texto-cor-3"></span>
                                        </label>

                                    </div>

                                </Form.Group> */}
            {/* <did className='lado-d'>
                                    <div className='cima'>
                                        <label className='label-4'>Anotação</label> */}
            {/* <Form.Control
                           onChange={e => { setObservacoes(e.target.value) }}
                           value={observacoes}
                           placeholder=''
                           className='imput-4'
                       /> */}
            {/* <Form.Control name="dsCallerIds" value={editableTranscript} className="campo-texto-cor-3 campo-texto-area" as="textarea"
                                  placeholder=""
                                  rows="2" maxlength="500" onChange={e => {  handleInputChangee }} /> */}
            {/* <textarea
                                            value={editableTranscript}
                                            onChange={handleInputChangee}
                                            disabled={isRecording}
                                            className="campo-texto-cor-3 campo-texto-area"
                                            rows={4}
                                            cols={50}
                                        />
                                    </div>
                                </did> */}
            {/* <div>
                                    {!isRecording ?
                                        <button className='gravar' onClick={startRecording}>

                                            <MicIcon className='iconeGravador' style={{ fontSize: 42 }} />
                                            {/* {'Iniciar Gravação'} */}
            {/* </button>
                                        :
                                        <button className='gravar'> */}

            {/* <GraphicEqIcon className='iconeGravador' style={{ fontSize: 42 }} /> */}
            {/* {'Iniciar Gravação'} */}
            {/* </button>

                                    } */}
            {/* {isRecording &&
                                        <p className='gravando'>
                                            {'Gravando...'}
                                        </p>
                                    } */}

            {/* {isRecording &&
                                        <MicOffIcon className='iconePararGravador' style={{ fontSize: 42 }} onClick={stopRecording} />
                                    }
                                    <div>

                                    </div>

                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className='lado-d'> */}

            {/* <Dropzone onDrop={acceptedFiles => handleLerArquivo(acceptedFiles[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />

                                                    {/* <div>{text.importarFoto}</div> */}
            {/* <div class="wrapper">
                                                        <div class="link_wrapper">
                                                            <a className='ae1' href="#">Upload</a>

                                                        </div>

                                                    </div>

                                                </div>
                                            </section>
                                        )} */}
            {/* </Dropzone> */}
            {/* <label className='labell-2'>Arquivo</label>
                                    <Form.Control
                                        onChange={e => { setJogador(e.target.value) }}
                                        value={getName}
                                        className='imput-8'
                                    />
                                </div>

                            </div> */}




            {/* <did className='lado-d'>

                                {!desabilitarButao ?
                                     <Button className="botaoCadastro" onClick={(e) => { setIsModalOpen(true) }}>
                                     <div>Enviar</div>
                                 </Button>
                                    :
                                    <Button disabled className="botaoCadastroDesab">
                                        <div>Enviar</div>
                                    </Button>
                                }                    
                                {isModalOpen &&
                                    <ConfirmationModal
                                        isOpen={isModalOpen}
                                        message="Tem certeza que deseja continuar?"
                                        rota="adicionar"
                                    />
                                }
                            </did> */}

            {/* </did>


                    </div>


                </div> */}

            {/* // :  */}

            <div className='p-lado'>


                <div className="coluna-alterar-ciclo-vida-1-ativacao">

                    {/* <Form.Label className="fonte-cor-1 label-campo-ativacao">Ativação</Form.Label> */}
                    {/* <div className="break-3"></div> */}
                    <Form.Group>
                        {/* Componente Calendário */}
                        {/* <div className="conteudo-calendario-filtro">
                                  <Form.Control name="ATIVACAO_INICIO" type="text" value={filtroAtivacaoDataInicio ? moment(filtroAtivacaoDataInicio).format("YYYY-MM-DD hh:mm:ss") : filtroAtivacaoDataInicio} className="d-none" />
                                  <Calendario imputCustomisado='De:' data={filtroAtivacaoDataInicio} setData={setFiltroAtivacaoDataInicio} dataMax={filtroAtivacaoDataFinal ? filtroAtivacaoDataFinal : dataMax} dataMin={dataMin} rota={"filtroSimcard"}></Calendario>
                              </div> */}
                        {/* <div className="conteudo-calendario-filtro">
                                  <Form.Control name="ATIVACAO_FINAL" type="text" value={filtroAtivacaoDataFinal ? moment(filtroAtivacaoDataFinal).format("YYYY-MM-DD hh:mm:ss") : filtroAtivacaoDataFinal} className="d-none" />
                                  <Calendario imputCustomisado='Até:' data={filtroAtivacaoDataFinal} setData={setFiltroAtivacaoDataFinal} dataMax={dataMax} dataMin={filtroAtivacaoDataInicio ? filtroAtivacaoDataInicio : dataMin} rota={"filtroSimcard"}></Calendario>
                              </div> */}

                    </Form.Group>
                </div>


                <div className='form-container'>
                    <div className='form-group'>
                        <label className='label'>Data do procedimento</label>
                        <DatePicker

                            onChange={(date) => { setNovaData(date); }}
                            selected={novaData}
                            // showTimeSelect
                            className={`input`}
                            id="birthDate"
                            placeholderText="DD/MM/YYYY"
                            locale={ptBR}
                            minDate={dataMax}
                        // useWeekdaysShort={true}
                        dateFormat="dd/MM/yyyy"
                        //minDate={new Date()}
                        />
                        {/* {!isValidProcedureDate && <p className='error-message'>Data inválida. Formato: DD/MM/YYYY</p>} */}
                    </div>

                    <div className='form-group'>
                        <label className='label'>Data de Retorno</label>



                        <DatePicker

                            onChange={(date) => { setReturnDate(date); }}
                            selected={returnDate}
                            // showTimeSelect
                            className={`input`}
                            id="birthDate"
                            placeholderText="DD/MM/YYYY"
                            locale={ptBR}
                            minDate={dataMax}
                            dateFormat="dd/MM/yyyy"
                        // useWeekdaysShort={true}
                        // dateFormat="Pp"
                        //minDate={new Date()}
                        />
                        {/* {!isValidProcedureDate && <p className='error-message'>Data inválida. Formato: DD/MM/YYYY</p>} */}

                    </div>



                    <div className='form-group'>
                        <label className='label'>Anotação</label>
                        <textarea
                            value={editableTranscript}
                            onChange={handleInputChangee}
                            disabled={isRecording}
                            className='textarea'
                            rows={4}
                            cols={50}
                        />
                    </div>

                    <div className='button-group'>
                        {!isRecording ? (
                            <button className='record-button' onClick={startRecording}>
                                <MicIcon style={{ fontSize: 42 }} />
                            </button>
                        ) : (
                            <button className='recording-button'>
                                <MicOffIcon style={{ fontSize: 42 }} onClick={stopRecording} />
                            </button>
                        )}

                        {isRecording && <p className='recording-status'>Gravando...</p>}

                        {isRecording && <GraphicEqIcon style={{ fontSize: 42 }} />}

                        <button className='salvar-button' onClick={() => salvar()}>
                            Salvar
                        </button>

                    </div>
               

                    {inforAnotacao && inforDataProc && inforDataRetor &&
                        <p className='aviso'>Informe a data do procedimento, data de retorno e anotação</p>
                    }
                    {inforAnotacao && inforDataProc && !inforDataRetor &&
                        <p className='aviso'>Informe a data do procedimento e anotação</p>
                    }
                    {inforAnotacao && inforDataRetor && !inforDataProc &&
                        <p className='aviso'>Informe a data de retorno e anotação</p>
                    }
                    {inforDataProc && inforDataRetor && !inforAnotacao &&
                        <p className='aviso'>Informe a data do procedimento e data de retorno</p>
                    }
                    {inforDataProc && !inforDataRetor && !inforAnotacao &&
                        <p className='aviso'>Informe a data do procedimento</p>
                    }
                    {inforDataRetor && !inforDataProc && !inforAnotacao &&
                        <p className='aviso'>Informe a data de retorno</p>
                    }
                    {inforAnotacao && !inforDataRetor && !inforDataProc &&
                        <p className='aviso'>Informe a anotação</p>
                    }
                </div>


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
                    <p className='msg'>Consulta salva!</p>
                    <h1 className='msg2'>A consulta foi encerrada para o pacliente!</h1>

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


            </div >

            {/* // } */}



        </>


    )
}