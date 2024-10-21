import React, { useState, useEffect, useRef } from 'react';/*eslint-disable*/
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import './../Questionario/questionario.css';
import BootstrapTable from 'react-bootstrap-table-next';
// import { useNavigate } from 'react-router-dom';
// import Dropzone from "react-dropzone";
// import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
// import ModalAdicionar from './modalAdicionar';
import { nome, visualizarRespostas, voltarProntuario } from '../../actions/actions';
// import { modalAberta } from '../../actions/actions';
// import { editarProntuario } from '../../actions/actions';
import { idPacliente, nomePacliente } from '../../actions/actions';
import { seguirRespostas, seguirConsulta, idConsulta, seguirAnotacao } from '../../actions/actions';
import { iconeExpandir, iconeRespostas } from '../../assets/alterarIcones';
// import { atualizarTabela, propsEditar } from '../../actions/actions';
// import SearchIcon from '@mui/icons-material/Search';


export default function ConsultaFechada() {

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






    useEffect(() => {
        async function listar(e) {
            await apiC.post("/consulta/buscarConsultaFechada", {
            })
                .then(response => {
                    if (response.status === 200) {
                        inserirData(response.data)
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




    const colunas = [
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColuna'>

            </p>,
            formatter: (cell, row) => {
                return <Button className='iconeExpandiButton'
                    onClick={(e) => {

                        despacho(idPacliente(row.id_pacliente));
                        despacho(seguirAnotacao(true));
                    }}>

                    <img className="iconeExpandi-2" src={iconeExpandir()} />
                </Button>
            },
        },
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadrãoTabela'>
                Nome
            </p>,
            formatter: (cell, row) => {
                let textoOriginal = cell
                let textoLimitado = limitarCaracteres(textoOriginal, 35);
                return <p className='corpadrãoTabela'>{cell === null ? '-' : textoLimitado}</p>;
            },
        },

        {
            dataField: 'dataAbertura',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaConsulta'>
                Data de abertura
            </p>,
            formatter: (cell, row) => {
                const formData = new Date(cell)
                let dt = formData.toLocaleString('pt-BR')
                return <p className='corpadrãoTabela'>{dt === null ? '-' : dt}</p>;
            },
        },
        {
            dataField: 'dataEncerrada',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaConsulta'>
                Data de encerramento
            </p>,
            formatter: (cell, row) => {
                const formData = new Date(cell)
                let dt = formData.toLocaleString('pt-BR')
                return <p className='corpadrãoTabela'>{dt === null ? '-' : dt}</p>;
            },
        },
        {
            dataField: 'dataRetorno',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaConsulta'>
                Data de retorno
            </p>,
            formatter: (cell, row) => {
                const formData = new Date(cell)
                let dt = formData.toLocaleString('pt-BR')
                return <p className='corpadrãoTabela'>{dt === null ? '-' : dt}</p>;
            },
        },
        {
            dataField: 'cpf',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadrãoTabela'>
                CPF
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadrãoTabela'>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadrãoTabela'>
                Triagem
            </p>,
            formatter: (cell, row) => {
                return <Button className='iconeExpandiButton'
                    onClick={(e) => {

                        despacho(idPacliente(row.id_pacliente)); despacho(idConsulta(row.id_consulta));
                        despacho(nomePacliente(row.nome));  despacho(visualizarRespostas(true));
                    }}>

                    <img className="iconeExpandi-2" src={iconeRespostas()} />
                </Button>
            },
        },
    ]

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

    const itemExpandido = {
        className: 'fundo-cor-1',
        renderer: (row, rowIndex) => (

            <div></div>
        ),
        expandHeaderColumnRenderer: (row, rowIndex) => (
            <div className="cabecalho-linha-expandida">
            </div>
        ),
        expandColumnRenderer: (rowKey) => {
            return (

                <div></div>

            );
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        headerClasses: 'tabela-coluna-primeira-header',
    };


    function fecharTela() {
        setAbrirAdicionar(!abrirAdicionar)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            pesquisa();
        }
    };

    async function limpar(parametro) {
        itensVar = []
        setItens([])
        if (parametro !== "1") {
            atualizar()
        }

    }

    async function limpar(parametro) {
        itensVar = []
        setItens([])
        if (parametro !== "1") {
            atualizar()
        }

    }

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

    return (
        <>

            <Form.Group>

                <Form.Control
                    onChange={e => { setPesquisar(e.target.value) }}
                    value={pesquisar}
                    className='campodepesquisa'
                    onKeyDown={handleKeyPress}
                    placeholder="Pesquise por nome..."
                />

                {/* <SearchIcon className="iconeBuscaModal" /> */}

                <Button className='botaoBuscar' onClick={(e) => pesquisa()}>
                    <div>Pesquisar</div>
                </Button>
                <Button className='botaoBuscar' onClick={(e) => limpar()}>
                    <div>Limpar</div>
                </Button>
            </Form.Group>
            <BootstrapTable // TABELA
                classes={"tabela"}
                condensed={true}
                keyField='id_consulta'
                data={itens}
                columns={colunas}
                // rowEvents={eventosLinhas}
                // selectRow={selecaoLinhas}
                expandRow={itemExpandido}
                bootstrap4={true}
                bordered={false}
            // noDataIndication={!spinAtivo && "Nenhum item encontrado"}
            // {...paginationTableProps}
            />












            {/* //  <ModalAdicionar></ModalAdicionar> : */}




        </>
    )
}


