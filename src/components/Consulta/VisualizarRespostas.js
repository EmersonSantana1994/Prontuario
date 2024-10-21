import React, { useState, useEffect, useRef } from 'react';/*eslint-disable*/
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import './../Consulta/consulta.css';
import BootstrapTable from 'react-bootstrap-table-next';
// import { useNavigate } from 'react-router-dom';
// import Dropzone from "react-dropzone";
// import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
// import ModalAdicionar from './modalAdicionar';
import { nome, voltarProntuario } from '../../actions/actions';
// import { modalAberta } from '../../actions/actions';
// import { editarProntuario } from '../../actions/actions';
import { idPacliente, nomePacliente } from '../../actions/actions';
import { seguirRespostas, seguirConsulta } from '../../actions/actions';
import { iconeExpandir } from '../../assets/alterarIcones';
// import { atualizarTabela, propsEditar } from '../../actions/actions';
// import SearchIcon from '@mui/icons-material/Search';


export default function Respostas() {

    // window.Buffer = Buffer;
    const [itens, setItens] = useState([]);
    const [abrirAdicionar, setAbrirAdicionar] = useState(false);
    // const navigate = useNavigate();
    // const expandirNavegacao = useSelector(state => state.reduxH.expandirNavegacao);
    // const voltarProntuarioo = useSelector(state => state.reduxH.voltarProntuario);
    const despacho = useDispatch();
    // const modal = useRef();
    let contador = 0
    let itensVar = []
    const [mostrarImagem, setMostrarImagem] = useState('');
    // let token = JSON.parse(localStorage.getItem("keyToken"))
    // const atualizarTabelaa = useSelector(state => state.reduxH.atualizarTabela);
    // const editarProntuarioo = useSelector(state => state.reduxH.editarProntuario);
    // const [envioModal, setEnvioModal] = useState()
    const [pesquisar, setPesquisar] = useState('');
    const cpf = useSelector(state => state.reduxH.cpfRedux);
    const rg = useSelector(state => state.reduxH.rgRedux);
    const nome = useSelector(state => state.reduxH.nomeRedux);
    const idPaclientee = useSelector(state => state.reduxH.idPacliente);

    const [dados, setDados] = useState([]);

    const [dadosValida, setDadosValida] = useState([]);





    useEffect(() => {
        async function listar(e) {
            await apiC.post("/consulta/buscarRespostas", {
                "idPacliente": idPaclientee,
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("ggggggg", response)
                        agruparCheckbox(response.data)
                        setDadosValida(response.data)
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


    async function pesquisa() {
        await limpar("1")
        await apiC.post("/tabela/busqueProntuario", {
            "pesquisa": pesquisar,
        })
            .then(response => {
                inserirData(response.data)
            })
            .catch((error) => {
                alert("erro ao pesquisar")
            })

    }

    // atualizar()

    async function atualizar(e) {

        // if (atualizarTabelaa) {
        //     await apiC.post("prontuario/listar", {
        //         "idUsuario": props.envioModal.id_usuario
        //     })
        //         .then(response => {

        //             if (response.status === 200) {
        //                 inserirData(response.data)
        //                 // if (response.data.result.length == 0) {
        //                 // } else {
        //                 // }

        //             }
        //         })
        //         .catch((error) => {

        //             alert(error.response.data)

        //         });
        //     despacho(atualizarTabela(false))
        // }

    }






    function limitarCaracteres(str, limite) {
        return str.substring(0, limite);
    }


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


    function handleLerArquivo(files) {
        let reader = new FileReader();
        let format = files.name.replace(".jpg", "")
        setGetName(format)
        if (files.size <= 1048576 && files.type.split('/')[0] === "image" && files.type.split('/')[0] !== "gif" && files.type.split('/')[0] !== "psd") {
            reader.readAsDataURL(files);
            reader.onloadend = () => {
                handleAlterar(reader.result, format)
            }
        } else {
            if (files.size > 1048576) {
                alert('Erro tamanho de foto muito grande')
            } else {
                alert('Erro ao importar foto')
            }

        }
    };



    async function limpar(parametro) {
        itensVar = []
        setItens([])
        if (parametro !== "1") {
            atualizar()
        }

    }

    const formatarData = (dataStr) => {
        const [ano, mes, dia] = dataStr.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const agruparCheckbox = (dados) => {
        const agrupados = {};

        dados.forEach((item) => {
            if (item.type === 'checkbox') {
                if (!agrupados[item.text]) {
                    agrupados[item.text] = [];
                }
                agrupados[item.text].push(item.resposta);
            } else {
                agrupados[item.text] = item.resposta;
            }
        });

        setDados(agrupados);
    };

    async function realizarConsulta(params) {
        despacho(seguirRespostas(false))
        despacho(seguirConsulta(true))
    }


    return (
        <div className="container">

            {dadosValida.length > 0 ?
                <h2 className='h1c'>Questionário de {dadosValida[0].nome}</h2>
                :
                <h2 className='h1c'>Questionário respondido</h2>
            }

            <ul>
                {Object.entries(dados).map(([pergunta, resposta], index) => (
                    <li key={index} className="item">
                        <p>{pergunta}</p>
                        <p><strong>Resposta:</strong> {Array.isArray(resposta) ? resposta.join(', ') : resposta}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


