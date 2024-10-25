/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Prontuario from "../../layouts/profile/components/Prontuario/prontuario";
// import Agendamento from "../../layouts/profile/components/Agendamento/agendamento";
import Agendamento from "../../components/Agendamento/agendamento";
import ConsultaFechadas from "../../components/Consulta/ConsultaFechadas";
import Anotacao from "../../components/Consulta/Anotacao";
import VisualizarRespostas from "../../components/Consulta/VisualizarRespostas";
import Consulta from "../../components/Consulta/Consulta";



// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import { useEffect, useState } from "react";
import { apiC } from "../../conexoes/api";

import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { seguirRespostas, seguirConsulta, seguirAnotacao, visualizarRespostas } from '../../actions/actions';
function Overview() {
    const idUsuario = useSelector(state => state.reduxH.fixarUsuario);
    const direcionar = useSelector(state => state.reduxH.rotaDirecionar);
    const seguirAgend = useSelector(state => state.reduxH.seguirAgendamento);
    const seguirRespostasRedux = useSelector(state => state.reduxH.seguirRespostas);
    const seguirConsultaRedux = useSelector(state => state.reduxH.seguirConsulta);
    const visualizarRespostasRedux = useSelector(state => state.reduxH.visualizarRespostas);
    const seguirTriagem = useSelector(state => state.reduxH.seguirTriagem);
    const seguirAnotacaoo = useSelector(state => state.reduxH.seguirAnotacao);
    const despacho = useDispatch();
    const [itens, setItens] = useState([]);
    let contador = 0
    let itensVar = []



    useEffect(() => {


    }, [direcionar])

    useEffect(() => {

        async function pesquisa() {
            await apiC.post("/cadastro/buscarUsuario", {
                "id": idUsuario,
            })
                .then(response => {
                    inserirData(response.data)
                })
                .catch((error) => {
                    alert("erro ao pesquisars")
                })

        }
        pesquisa()
    }, [idUsuario])

    async function voltar(params) {
        despacho(seguirAnotacao(false))
    }

    async function voltarConsulta(params) {
        despacho(visualizarRespostas(false))
    }

    async function voltarResposta(params) {
        despacho(seguirRespostas(true))
        despacho(seguirConsulta(false))
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


    return (

        <DashboardLayout>

            <Header />
            {!seguirAnotacaoo && !visualizarRespostasRedux &&
                <SoftBox mt={5} mb={3}>
                    <Grid container spacing={3}>


                        <Grid item xs={12} md={6} xl={16}>
                            <ConsultaFechadas></ConsultaFechadas>
                        </Grid>
                    </Grid>
                </SoftBox>
            }
            {seguirAnotacaoo && !visualizarRespostasRedux && 
                <SoftBox mt={5} mb={3}>
                    < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                        <i className="fas fa-arrow-circle-left fsi"  ></i>
                        <h3 className="voltar-titulo">
                            VOLTAR
                        </h3>
                    </Button>
                    <Grid container spacing={3}>
                        {/* < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                                    <i className="fas fa-arrow-circle-left fsi"  ></i>
                                    <h3 className="voltar-titulo">
                                        VOLTAR
                                    </h3>
                                </Button> */}

                        <Grid item xs={12} md={6} xl={16}>
                            <Anotacao></Anotacao>
                        </Grid>
                    </Grid>
                </SoftBox>
            }
             {!seguirAnotacaoo && visualizarRespostasRedux && 
                <SoftBox mt={5} mb={3}>
                    < Button className="voltar-consultorio" onClick={e => { voltarConsulta() }}>
                        <i className="fas fa-arrow-circle-left fsi"  ></i>
                        <h3 className="voltar-titulo">
                            VOLTAR
                        </h3>
                    </Button>
                    <Grid container spacing={3}>
                        {/* < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                                    <i className="fas fa-arrow-circle-left fsi"  ></i>
                                    <h3 className="voltar-titulo">
                                        VOLTAR
                                    </h3>
                                </Button> */}

                        <Grid item xs={12} md={6} xl={16}>
                            <VisualizarRespostas></VisualizarRespostas>
                        </Grid>
                    </Grid>
                </SoftBox>
            }







            {/* {seguirRespostasRedux && !seguirConsultaRedux &&
                <SoftBox mt={5} mb={3}>

                    <Grid container spacing={3}>
                        < Button className="voltar-consultorio" onClick={e => { voltar() }}>
                            <i className="fas fa-arrow-circle-left fsi"  ></i>
                            <h3 className="voltar-titulo">
                                VOLTAR
                            </h3>
                        </Button>

                        <Grid item xs={12} md={6} xl={16}>
                            <Respostas></Respostas>
                        </Grid>
                    </Grid>
                </SoftBox>
            }
            {!seguirRespostasRedux && seguirConsultaRedux &&
                <SoftBox mt={5} mb={3}>

                    <Grid container spacing={3}>
                        < Button className="voltar-consultorio" onClick={e => { voltarResposta() }}>
                            <i className="fas fa-arrow-circle-left fsi"  ></i>
                            <h3 className="voltar-titulo">
                                VOLTAR
                            </h3>
                        </Button>

                        <Grid item xs={12} md={6} xl={16}>
                            <Consulta></Consulta>
                        </Grid>
                    </Grid>
                </SoftBox>
            } */}


            <Footer />
        </DashboardLayout>
    );
}

export default Overview;