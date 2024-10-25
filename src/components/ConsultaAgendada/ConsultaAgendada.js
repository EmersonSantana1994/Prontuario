import React, { useState, useEffect, useRef } from 'react';/*eslint-disable*/
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import './consultaAgendada.css';
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
import { seguirRespostas, seguirConsulta, idConsulta } from '../../actions/actions';
import { iconeExpandir } from '../../assets/alterarIcones';
// import { atualizarTabela, propsEditar } from '../../actions/actions';
// import SearchIcon from '@mui/icons-material/Search';


export default function ConsultaAgendada() {

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
            await apiC.post("/consultarAgenda/buscarConsultas", {
                "id_medico": 1,
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
            dataField: 'nomedd',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Editar
            </p>,
            formatter: (cell, row) => {
                return <Button className='iconeExpandiButton'
                    onClick={(e) => {

                        despacho(idPacliente(row.id_pacliente)); despacho(idConsulta(row.id_consulta));
                        despacho(nomePacliente(row.nome)); despacho(seguirRespostas(true));
                    }}>

                    <img className="iconeExpandi-2" src={iconeExpandir()} />
                </Button>
            },
        },

        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Nome
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'cpf',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                CPF
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : cell}</p>;
            },
        },

        {
            dataField: 'nomeMedico',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Medico
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'horario',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Horário
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'dataAgendada',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Data
            </p>,
            formatter: (cell, row) => {
                const formData = new Date(cell)
                let dtY = formData.getFullYear().toString()
                let dtM = (formData.getMonth() + 1).toString()
                let mesFormatado = dtM < 10 ? '0' + dtM : dtM;
                let dtD = formData.getDate().toString()
                let diaFormatado = dtD < 10 ? '0' + dtD : dtD;
                let dta = diaFormatado + "/" + mesFormatado + "/" + dtY
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : dta}</p>;
            },
        },
        {
            dataField: 'especialidade',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadraoColunaAgendar'>
                Especialidade
            </p>,
            formatter: (cell, row) => {
                return <p className='corpadraoColunaAgendar'>{cell === null ? '-' : cell}</p>;
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


    return (
        <>
            <Form.Control
                onChange={e => { setPesquisar(e.target.value) }}
                value={pesquisar}
                className='campodepesquisa'
                onKeyDown={handleKeyPress}
                placeholder="Pesquise por nome..."
            />
            <Button className='botaoBuscar' onClick={(e) => pesquisa()}>
                <div>Pesquisar</div>
            </Button>
            <Button className='botaoBuscar' onClick={(e) => limpar()}>
                <div>Limpar</div>
            </Button>

            <BootstrapTable // TABELA
                classes={"tabela"}
                condensed={true}
                keyField='id_consultaAgendada'
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


