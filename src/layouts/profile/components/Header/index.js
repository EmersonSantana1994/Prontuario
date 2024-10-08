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

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import nelsonAkamine from "assets/images/nelson-akamine.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import {rotaDirecionar, rotaCadastro, rotaAgendamento, rotaProntuario, rotaTimeline, rotaPreferencia,
  rotaJornada, rotaPagamento
 } from '../../../../actions/actions';

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabsOrientation2, setTabsOrientation2] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [tabValue2, setTabValue2] = useState(0);
  const idUsuario = useSelector(state => state.reduxH.fixarUsuario);
  const direcionar = useSelector(state => state.reduxH.rotaDirecionar);
  const despacho = useDispatch();
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => { setTabValue(newValue) };
  const handleSetTabValue2 = (event, newValue) => { setTabValue2(newValue) };



  async function mudarRota(rota){
    if(rota == "cadastro"){  
      despacho(rotaDirecionar("cadastro"))}
    else if(rota == "agendamento"){ despacho(rotaDirecionar("agendamento"))}
    else if(rota == "prontuario"){despacho(rotaDirecionar("prontuario"))}
    else if(rota == "timeline"){despacho(rotaDirecionar("timeline"))}
    else if(rota == "preferencia"){despacho(rotaDirecionar("preferencia"))}
    else if(rota == "timeline"){ despacho(rotaDirecionar("timeline"))}
   
  }

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="8.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={nelsonAkamine}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Nelson Akamine
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                Médico / Professor
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={1} lg={12} sx={{ ml: "auto" }}>
            <AppBar position="static">
              {idUsuario &&
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  sx={{ background: "transparent" }}
                >

                  <Tab label="Cadastro" icon={<Document />} onClick={() => mudarRota("cadastro")} />
                  <Tab label="Agendamento" icon={<Document />} onClick={() => mudarRota("agendamento")}/>
                  <Tab label="Prontuário" icon={<Document />} onClick={() => mudarRota("prontuario")} />
                  <Tab label="Timeline" icon={<Document />} onClick={() => mudarRota("timeline")}/>
                  <Tab label="Preferências" icon={<Document onClick={() => mudarRota("preferencia")}/>} />
                  <Tab label="Jornada" icon={<Document />} onClick={() => mudarRota("jornada")}/>
                  <Tab label="Pagamento" icon={<Document />} onClick={() => mudarRota("pagamento")}/>


                </Tabs>
              }

            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
