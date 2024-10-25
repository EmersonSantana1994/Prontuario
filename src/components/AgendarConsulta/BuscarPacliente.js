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
import { voltarProntuario } from '../../actions/actions';
// import { modalAberta } from '../../actions/actions';
// import { editarProntuario } from '../../actions/actions';
import { idQuestionario } from '../../actions/actions';
import { seguirAgenda } from '../../actions/actions';
import { rgRedux } from '../../actions/actions';
import { cpfRedux } from '../../actions/actions';
import { nomeRedux } from '../../actions/actions';
import { iconeExpandir } from './../../assets/alterarIcones';
// import { atualizarTabela, propsEditar } from '../../actions/actions';
// import SearchIcon from '@mui/icons-material/Search';

export default function Pesquisar() {

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
    const idQuestionarioo = useSelector(state => state.reduxH.idQuestionario);
    // const [envioModal, setEnvioModal] = useState()
    const [pesquisar, setPesquisar] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');


    async function pesquisa() {
        itensVar = []
        setItens([])
        despacho(cpfRedux(false))
        despacho(rgRedux(false))
        despacho(nomeRedux(false))
        despacho(seguirAgenda(false))
      

        if (cpf && rg && nome) {
            despacho(cpfRedux(cpf))
            despacho(rgRedux(rg))
            despacho(nomeRedux(nome))
        } else if (cpf && !rg && !nome) {
            despacho(cpfRedux(cpf))
        } else if (!cpf && rg && !nome) {
            despacho(rgRedux(rg))
        } else if (!cpf && !rg && nome) {
     
            despacho(nomeRedux(nome))
        }
        else if (!cpf && rg && nome) {
            despacho(nomeRedux(nome))
            despacho(rgRedux(rg))
        } else if (cpf && rg && !nome) {
            despacho(cpfRedux(cpf))
            despacho(rgRedux(rg))
        } else if (cpf && !rg && nome) {
            despacho(nomeRedux(nome))
            despacho(cpfRedux(cpf))
        } else {
            alert('digite uma informção')
        }
        despacho(seguirAgenda(true))

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

   

    async function limpar(parametro) {
        itensVar = []
        setItens([])
        despacho(cpfRedux(false))
        despacho(rgRedux(false))
        despacho(nomeRedux(false))
        despacho(seguirAgenda(false))
        setCpf('')
        setNome('')
        setRg('')
        if (parametro !== "1") {
            atualizar()
        }

    }

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

    async function handleChangeCpf(e) {
        const { value } = e;
        // Remove tudo que não é número
        const onlyNumbers = value.replace(/\D/g, '');

        // Formata o CPF: 000.000.000-00
        const formattedCpf = onlyNumbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');

 

        setCpf(formattedCpf);
    };

    const handleChangeRg = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length <= 9) {
            const formattedRg = formatRG(value);
            const newRespostas = rg; // Cria uma cópia do estado atual
            newRespostas[index] = formattedRg; // Atualiza a resposta para o índice correspondente
            setRg(newRespostas);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          pesquisa()
        }
      };

    return (
        <>

            <Form.Group key={'nn'} className="form-group">
                <Form.Label className="form-label">Nome</Form.Label>
                <Form.Control
                    className='tipresp form-control'
                    type='text'
                    placeholder='Digite o nome'
                    onKeyDown={handleKeyPress}
                    // name={`desc-${index}`}
                    value={nome} // Acesso às respostas se estiver usando um array
                    onChange={e => { setNome(e.target.value) }}
                />
            </Form.Group>


            <form onSubmit={handleSubmit} key={"cpf"} className='form-group-cpf'>
                <label className='label-cpf'>
                    CPF
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => handleChangeCpf(e.target)}
                        maxLength="14" // Limita o número de caracteres no formato XXX.XXX.XXX-XX
                        placeholder="000.000.000-00"
                        className='input-cpf-2'
                        onKeyDown={handleKeyPress}
                    />
                </label>

            </form>

            <form key={"rg"} className='form-group-cpf'>
                <label htmlFor="rg" className='label-cpf' key={'rg'}>
                    RG
                    <input
                        type="text"
                        id="rg"
                        value={rg}
                        onChange={event => handleChangeRg(event)}
                        maxLength="12" // Limita o número de caracteres no formato XXX.XXX.XXX-XX
                        placeholder="00.000.000-0"
                        className='input-cpf-2'
                        onKeyDown={handleKeyPress}
                    />
                </label>
            </form>
            <Button className='botaoBuscar' onClick={(e) => pesquisa()}>
                <div>Pesquisar</div>
            </Button>
            <Button className='botaoBuscar' onClick={(e) => limpar()}>
                <div>Limpar</div>
            </Button>







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


