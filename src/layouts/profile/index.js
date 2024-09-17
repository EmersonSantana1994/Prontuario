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
import Consultorio from "../../components/Consultorio/consultorio";
import ProfilesList from "examples/Lists/ProfilesList";
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
import TimeLine from "./components/TimeLine/timeLine";
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


  console.log("direcionar", direcionar)
  useEffect(() => {

    console.log("mudou", direcionar)
  }, [direcionar])

  useEffect(() => {
    console.log("oooooooooooo")
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
      console.log("itensVar", itensVar)
      setItens(JSON.parse(JSON.stringify(itensVar)))
    }
  }


  return (

    <DashboardLayout>
      {console.log("hhhh", direcionar)}
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid> */}

          {direcionar == "cadastro" &&
            <Grid item xs={12} md={6} xl={4}>

              <ProfileInfoCard
                title="Informações do cliente"
                info={{
                  nome: !itens[0] ? "" : itens[0].nome,
                  telefone: !itens[0] ? "" : itens[0].telefone,
                  data: !itens[0] ? "" : itens[0].dataNascimento,
                  CPF: !itens[0] ? "" : itens[0].cpf,
                  RG: !itens[0] ? "" : itens[0].rg,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>

          }

          {direcionar == "cadastro" &&

            <Grid item xs={12} md={6} xl={4}>

              <ProfileInfoCard
                title="Endereço do cliente"
                info={{
                  Endereço: !itens[0] ? "" : itens[0].endereco,
                  Cep: !itens[0] ? "" : itens[0].cep,
                  Cidade: !itens[0] ? "" : itens[0].cidade,
                  Pais: !itens[0] ? "" : itens[0].pais,
                  Email: !itens[0] ? "" : itens[0].email
                }}

                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>
          }
          {direcionar == "prontuario" &&

            <Grid item xs={12} md={6} xl={8}>
              <Prontuario></Prontuario>
            </Grid>
          }


          {direcionar == "timeline" &&
            <Grid item xs={12} md={6} xl={8}>
              <TimeLine></TimeLine>
            </Grid>
          }



          {!seguirAgend &&

            <div className='tituloConsultorio2'>
              <h1 className='tituloConsultorio'>Escolha o consultorio</h1>
            </div>

          }

          {seguirAgend &&
            <div>
                
              < Button className="voltar-consultorio" onClick={e => { voltar() }}>
              <i className="fas fa-arrow-circle-left fsi"  ></i>
                <h3 className="voltar-titulo">
                   VOLTAR
                </h3>
              </Button>
            
            </div>
          }
          {!seguirAgend &&
            <Grid item xs={12} md={6} xl={16}>
              <Consultorio></Consultorio>
            </Grid>
          }


          {seguirAgend &&
            <Grid item xs={12} md={6} xl={16}>
              <Agendamento></Agendamento>
            </Grid>
          }

          {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid> */}
        </Grid>
      </SoftBox>
      {/* <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Projects
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <PlaceholderCard title={{ variant: "h5", text: "New project" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox> */}

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
