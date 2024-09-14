import React, { useState, useEffect } from 'react';/*eslint-disable*/
import { format, parseISO } from 'date-fns';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import '../../components/Consultorio/consultorio.css';
import { consultorio } from '../../actions/actions';
import { seguirAgendamento } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';

function Consultorio() {
    let array = []
    let contador = 0
    let itensVar = []
    const [eventos, setEventos] = useState([]);
    const [selecionado, setSelecionado] = useState(false);
    const [clicado, setClicado] = useState(false);
    const [nomeSelecionado, setNomeSelecionado] = useState(false);
    const despacho = useDispatch();
    useEffect(() => {

        async function getConsultorio() {
            const novoEventoPadrao = []
            await apiC.post("agenda/getConsultorio", {
            }).then(response => {

                if (response.status === 200) {
                    console.log("responseeee", response.data)

                    for (let i = 0; i < response.data.length; i++) {


                        if (contador == i) {
                            let k = i
                            for (let j = 0; j < response.data.length; j++) {
                                itensVar[k] = response.data[j]
                                k++
                            }
                        }
                        array = JSON.parse(JSON.stringify(itensVar))
                        console.log("arrayvvvvvv", array)
                    }

                    console.log("arrayoooooooo", array)
                    setEventos(array)
                    {
                        eventos.map((element) => {
                            console.log("minhaaacaraaaaa", element.nomeConsultorio)
                        })
                    }
                }
            })
                .catch((error) => {
                    console.log("errorrrrrrrrrr", error)
                    alert("erro ao adicionar dataaa", error)


                });

        }
        getConsultorio()
    }, [])

    async function selecao(params1, params2) {
        console.log("params", params1)
        despacho(consultorio(params1))
        setSelecionado(true)
        setNomeSelecionado(params2)
        setClicado(params1)
        
    }

    async function seguir(){
        despacho(seguirAgendamento(true))
    }

    return (
        
        <div>
               
                    < Button  className={ clicado == "1" ? "botao-consultorio-selecionado": "botao-consultorio"} onClick={(e) => selecao("1", "Consultorio 1" )} >
                        <h3 className="vertical-timeline-element-title">
                            Consultorio 1
                        </h3>
                    </Button>
                    < Button  className={ clicado == "2" ? "botao-consultorio-selecionado": "botao-consultorio"} onClick={(e) => selecao("2", "Consultorio 2")} >
                        <h3 className="vertical-timeline-element-title">
                            Consultorio 2
                        </h3>
                    </Button>
                    < Button  className={ clicado == "3" ? "botao-consultorio-selecionado": "botao-consultorio"} onClick={(e) => selecao("3", "Consultorio 3")} >
                        <h3 className="vertical-timeline-element-title">
                            Consultorio 3
                        </h3>
                    </Button>
                

         
            {selecionado &&
                <div style={{ marginLeft: '30vw', marginTop: '1vw' }}>
                    < Button className="irAgenda" onClick={(e) => seguir()}>
                        <h3 className="vertical-timeline-element-title">
                            Verificar agenda em {nomeSelecionado}
                        </h3>
                    </Button>

                </div >

            }
            {!selecionado &&
                <div style={{ marginLeft: '30vw', marginTop: '1vw' }}>
                    < Button className="irAgendaDesabilitado" disabled >
                        <h3 className="vertical-timeline-element-title">
                            Selecione uma opção acima 
                        </h3>
                    </Button>

                </div >
            }

        </div >

    )
}
export default Consultorio;