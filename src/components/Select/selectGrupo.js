//IMPORTAÇÕES
import React, { useState, useEffect, useRef } from 'react';/*eslint-disable*/
import '../Select/select.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";

// ICONES

/*  COMO USAR
    Importe a modal para dentro do componente que irá fazer uso dela.
    ex: import SelectCliente from '../../componentesModais/selects/selectCliente'

    Crie um hook apropriado para esconder e exibir a mensagem quando necessário.
    ex: const [revelarSelectCliente, setRevelarSelectCliente] = useState(false)

    Após isso, posicione-a dentro do return do seu componente e passe os props para
    customizar o conteúdo da mensagem da seguinte forma. É interessante utilizar um
    <Button/> com uma função onClick, dentro de um >Form.Group/> para que o campo
    se mantenha similar aos campos de texto normais.
    ex: <Form.Group>
            <Form.Label className="label">
                <div className="fonte-cabecalho">cliente {iconeAsterisco}</div>
            </Form.Label>
            <Button name="cdCliente" className="campo-select-modal" onClick={() => setRevelarSelectCliente(!revelarSelectCliente)}>
                <div className="campo-select-modal-label">{dsCliente}</div>
                <img className="campo-select-modal-icone" src={setaDropdown()} alt="drop" />
            </Button>
            { revelarSelectCliente === true &&
                <SelectCliente
                    setRevelarSelectCliente={setRevelarSelectCliente} //Hook para fechar a modal
                    setCdCliente={setCdCliente} //Código do cliente
                    setDsCliente={setDsCliente} //Nome do cliente
                    phCliente={phCliente} //Placeholder para mostrar o valor original em caso de edição
                >
                </SelectCliente>
            }
        </Form.Group>*/

export default function SelectGrupos(props) {
    const [grupos, setGrupos] = useState([])
    const [spinAtivo, setSpinAtivo] = useState(true);
    
    //HOOKS MODAL
    const modal = useRef();

    const handleClickFora = e => {
        if (!modal.current.contains(e.target)) {
            // handleCancelar()
        }
    };

    function handleGrupos(codigo, id){
        if(props.rota && props.rota == "filtroSimcard"){
            props.setFiltroGrupo(codigo)
            props.setCdGrupo(codigo)
            props.setId(id)
        }else if(props.rota && props.rota == "agendamento"){
            props.setFiltroGrupo(codigo)
            props.setCdGrupo(codigo)
            props.setId(id)
        }
        
        else{
            props.setNomeGrupo(grupo)
            props.setCdGrupo(codigo)
        }
        // handleCancelar()
    }

    function handleCancelar(){
        props.setRevelarSelectGrupo(false)
    }

    async function pesquisa() {
        await apiC.post("/cadastro/busque", {
          "pesquisa": pesquisar,
        })
          .then(response => {
            inserirData(response.data)
          })
          .catch((error) => {
            alert("erro ao pesquisar")
          })
    
      }

    useEffect(() => {
        if (props.rota == "filtroSimcard" && props.setResetGrupo) {
            props.setResetGrupo(false)
        }else if(props.rota == "agendamento" && props.setResetGrupo){
            props.setResetGrupo(false)
        }
        async function renderGrupos(){
            let todosGrupos = [];
            let data
            //carrega os 3 grupos padroes
         
            
            // carrega o grupos do cliente
            if(props.rota == 'filtroSimcard'){
                data = await apiC.post("/cadastro/busque", {
                    "nome": props.pesquisar,
                  })
            }else if(props.rota == 'agendamento'){
                data = await apiC.post("/cadastro/busque", {
                    "nome": props.pesquisar,
                  })
            }

            
            await data.data.map((item,i)=>{
                todosGrupos.push(item);
                return true
            })

            if(todosGrupos.length > 0){
                let objetoGrupos = todosGrupos.map((item,i) => {
                    return (
                        <li key={"menu-"+item.nome}>
                            <div className={ "campo-select-opcao campo-select-opcao-1" } onClick={() => handleGrupos(item.nome, item.id ) }>
                                <span className="fonte-cor-1 fonte-campo campo-select-opcao-label">{item.nome}</span>
                            </div>
                            {todosGrupos[i+1]!==undefined&&<div className="campo-select-divisor-cor-1 campo-select-divisor"></div>}
                        </li>
                    );
                })
                setGrupos(objetoGrupos)
            }else{
                let objetoGrupos = () => {
                    return (
                        <li>
                            <div disabled className={"campo-select-opcao campo-select-opcao-1" }>
                                <span className="fonte-cor-1 fonte-campo campo-select-opcao-label nao-selecionavel">Nenhuma informação encontrada</span>
                            </div>
                        </li>
                    );
                }
                setGrupos(objetoGrupos)
            }
        }
        renderGrupos()
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, [])


    return(
        <Form ref={modal}>
            <Button className={props.rota == "filtroSimcard" ? "campo-texto-cor-3 campo-select-2" : "campo-texto-cor-3 campo-select"}>
                <div className="fonte-cor-1 campo-texto-select-tamanho-2">{props.nomeGrupo}</div>
            </Button>
            {/* <div className={"campo-select-triangulo-cor-1 campo-select-triangulo"}></div> */}
            <div className={props.rota == "filtroSimcard" ? "campo-texto-cor-3 campo-select-corpo-2": "campo-texto-cor-3 campo-select-corpo"}>
                <ul className="campo-select-lista">
                    {grupos}
                </ul>
            </div>
        </Form>
    )
}