import React, { useState, useEffect, useRef } from 'react';/*eslint-disable*/
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import './questionario.css';
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
import { seguirTriagem, seguirCliente, seguirPacliente } from '../../actions/actions';
import { iconeExpandir } from '../../assets/alterarIcones';
// import { atualizarTabela, propsEditar } from '../../actions/actions';
// import SearchIcon from '@mui/icons-material/Search';

export default function Pacliente() {

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
    const idQuestionarioo = useSelector(state => state.reduxH.idPacliente);



  

    useEffect(() => {
        async function listar(e) {
            await apiC.post("/quationario/pacliente", {
                "cpf": cpf,
                "rg": rg,
                "nome": nome,
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

    }, [cpf, rg, nome])


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
                return <Button className='iconeExpandiButton' onClick={(e) => { despacho(idPacliente(row.id_pacliente)); 
                    despacho(nomePacliente(row.nome)); despacho(seguirTriagem(true)); 
                    despacho(seguirCliente(false)); despacho(seguirPacliente(false));
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
            dataField: 'rg',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p className='corpadrãoTabela'>
                RG
            </p>,
           formatter: (cell, row) => {
            return <p className='corpadrãoTabela'>{cell === null ? '-' : cell}</p>;
                },
        },
        // {
        //     dataField: 'data',
        //     headerClasses: 'nao-selecionavel',
        //     sort: true,
        //     text: <p className='corpadraoColuna'>
        //         Data e hora do envio
        //     </p>,
        //     formatter: (cell, row) => {
        //         const formData = new Date(cell)
        //         let dt = formData.toLocaleString('pt-BR')
        //         return <p className='corpadrãoTabela'>{dt === null ? '-' : dt}</p>;
        //     },
        // },

        // {
        //       formatter: (cell, row) => {
        //         return <Button onClick={(e) => {setAbrirAdicionar(!abrirAdicionar); despacho(voltarProntuario(true)); enviarDetalheLinha(row.id_pro, row.nome)}}>

        //              <p className='corpadrão'>adicionar</p>
        //         </Button>;
        //     },
        // },
    ]

    function limitarCaracteres(str, limite) {
        return str.substring(0, limite);
    }

    // function enviarDetalheLinha(id, nome) {
    //     setidEnviar(id)
    //     setnomeArquivo(nome)
    // }

    // function enviarDetalhe() {
    //     setidEnviar(0)
    //     despacho(voltarProntuario(true))
    // }

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

    // const colunasTimes = [
    //     {
    //         dataField: 'nome',
    //         headerClasses: 'nao-selecionavel',
    //         sort: true,
    //         text: <p className='corpadrão'>
    //             Jogadores
    //         </p>,
    //         formatter: (cell, row) => {
    //             return <p className='corpadrão'>{cell === null ? '-' : cell}</p>;
    //         },
    //     },
    // ]

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

    // async function handleAlterar(novaImagem, nome) {
    //     await apiC.post('/inserir/imagem', {
    //         "imagem": novaImagem,
    //         "nome": nome,
    //     })
    //         .then(function (response) {
    //             setMostrarImagem(novaImagem)
    //             alert('foto registrada com sucesso')
    //         })
    //         .catch(function (error) {
    //             alert(error.response.data)
    //             console.log("erooooo", error)
    //         });
    // }
    // const eventosLinhas = {
    //     onClick: (e, row, rowIndex) => {
    //     }
    // }

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

        


        


                {/* <ModalAdicionar atualizar={atualizar} idUsuario={props.envioModal.id_usuario} 
                envioModal={envioModal} editar={true}></ModalAdicionar> */}



                           
                            <BootstrapTable // TABELA
                                classes={"tabela"}
                                condensed={true}
                                keyField='id_questonario'
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

                       


                        {/* <did className='lado-d'>
                     <div className='cima'>
                         <label className='label-2'>{text.observacoes}</label>
                         <Form.Control
                             onChange={e => { setJogador(getName) }}
                             value={getName}
                             placeholder=''
                             className='imput-4'
                         />
                     </div>
                 </did> */}

                        {/* <did className='lado-d'>
                            <Button className="botaoCadastroModal" onClick={(e) => { enviarDetalhe(); despacho(propsEditar(false)) }}>
                                <div>Adicionar</div>
                            </Button>

                        </did> */}



                 




               
                {/* //  <ModalAdicionar></ModalAdicionar> : */}

            


        </>
    )
}


