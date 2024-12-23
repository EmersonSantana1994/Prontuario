import React, { useState, useEffect } from 'react';/*eslint-disable*/
import { format, parseISO } from 'date-fns';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel } from 'react-bootstrap';
import { apiC } from "../../conexoes/api";
import '../../components/Consultorio/consultorio.css';
import { consultorio, nomeConsultorio } from '../../actions/actions';
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
    const [consultorioSelecionado, setConsultorioSelecionado] = useState(null);
    useEffect(() => {

        async function getConsultorio() {
            const novoEventoPadrao = []
            await apiC.post("agenda/getConsultorio", {
            }).then(response => {

                if (response.status === 200) {


                    for (let i = 0; i < response.data.length; i++) {


                        if (contador == i) {
                            let k = i
                            for (let j = 0; j < response.data.length; j++) {
                                itensVar[k] = response.data[j]
                                k++
                            }
                        }
                        array = JSON.parse(JSON.stringify(itensVar))
                        
                    }

                    console.log("yyyyy", array)
                    setEventos(array)
                    {
                        eventos.map((element) => {

                        })
                    }
                }
            })
                .catch((error) => {
                    alert("erro ao adicionar dataaa", error)


                });

        }
        getConsultorio()
    }, [])

    const handleSelect = (evento) => {
        console.log("consultorio", evento)
        setConsultorioSelecionado(evento);
        despacho(consultorio(evento.id_consultorio))
        setSelecionado(true)
        setNomeSelecionado(evento.nomeConsultorio)
        setClicado(evento.id_consultorio)
        despacho(nomeConsultorio(evento.nomeConsultorio))
      };



    async function seguir(){
        despacho(seguirAgendamento(true))
    }

    return (
        
        <div>
               {eventos.map(consultorio => (
                    < Button  className={ clicado == consultorio.id_consultorio ? "botao-consultorio-selecionado": "botao-consultorio"} 
                    onClick={() => handleSelect(consultorio)} >
                        <h3 className="vertical-timeline-element-title">
                        {consultorio.nomeConsultorio}
                        </h3>
                    </Button>
                   
                
                ))}

         
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