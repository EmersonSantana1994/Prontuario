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
import Formulario from "../../components/Formulario/Formulario";




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
function Overview() {
  const idUsuario = useSelector(state => state.reduxH.fixarUsuario);
  const direcionar = useSelector(state => state.reduxH.rotaDirecionar);
  const seguirAgend = useSelector(state => state.reduxH.seguirAgendamento);
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


  return (

    <DashboardLayout>

      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
         
        
            <Grid item xs={12} md={6} xl={16}>
              <Formulario></Formulario>
            </Grid>

          {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid> */}
        </Grid>
      </SoftBox>
    

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
