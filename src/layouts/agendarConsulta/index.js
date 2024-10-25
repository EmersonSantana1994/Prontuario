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
import Triagem from "../../components/Questionario/triagem";
import BuscarPacliente from "../../components/AgendarConsulta/BuscarPacliente";
import Pesquisar from "../../components/Questionario/buscaPacliente";
import Pacliente from "../../components/AgendarConsulta/Pacliente";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";


// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import kal from "assets/images/kal-visuals-square.jpg";
import { useEffect, useState } from "react";
import { apiC } from "../../conexoes/api";

import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { seguirAgendamento } from '../../actions/actions';
import { seguirCliente } from '../../actions/actions';
function Overview() {
    const idUsuario = useSelector(state => state.reduxH.fixarUsuario);
    const direcionar = useSelector(state => state.reduxH.rotaDirecionar);
    const seguirAgend = useSelector(state => state.reduxH.seguirAgendamento);
    const seguirClienteRedux = useSelector(state => state.reduxH.seguirCliente);
    const seguirAgendaRedux = useSelector(state => state.reduxH.seguirAgenda);
    const seguirTriagem = useSelector(state => state.reduxH.seguirTriagem);
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
        despacho(seguirAgendamento(false))
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

    async function voltar(params) {
        despacho(seguirCliente(false))
    }

    return (

        <DashboardLayout>

            <Header />
         

                <SoftBox mb={3}>
                    <Card>
                        <SoftBox pt={2} px={2}>
                            <SoftBox mb={0.5}>
                              
                                <SoftTypography variant="h6" fontWeight="medium">
                                    Pesquise o pacliente abaixo
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox mb={1}>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                    para ser mais preciso, pesquise por cpf
                                </SoftTypography>
                            </SoftBox>
                        </SoftBox>
                        <SoftBox p={2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} xl={6}>
                                    <BuscarPacliente></BuscarPacliente>
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    {seguirAgendaRedux &&
                                        <Pacliente></Pacliente>
                                    }
                                </Grid>
                            </Grid>
                        </SoftBox>
                    </Card>
                </SoftBox>
            

        


            <Footer />
        </DashboardLayout>
    );
}

export default Overview;
