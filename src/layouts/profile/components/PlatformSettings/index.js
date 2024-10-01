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

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import '@fortawesome/fontawesome-free/css/all.min.css';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import '../../../../components/Select/select.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel, Alert } from 'react-bootstrap';
import SelectGrupo from '../../../../components/Select/selectGrupo';
import { useSelector, useDispatch } from 'react-redux';
import { fixarUsuario } from '../../../../actions/actions';

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [filtroGrupo, setFiltroGrupo] = useState('Selecione');
  const [resetGrupo, setResetGrupo] = useState(false)
  const [cdGrupo, setCdGrupo] = useState('')
  const [revelarSelectGrupo, setRevelarSelectGrupo] = useState(false)
  const [id, setId] = useState('')
  const [pesquisar, setPesquisar] = useState('');
  const [itens, setItens] = useState([]);
  const despacho = useDispatch();
  let contador = 0
  let itensVar = []

  async function pesquisa() {
   await setRevelarSelectGrupo(false)
    setRevelarSelectGrupo(true)

  }

  useEffect(() => {
    despacho(fixarUsuario(id))
  }, [id])


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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      pesquisa(true)
    }
  };




  return (
    <Card>
      <SoftBox pt={2} px={2}>

      </SoftBox>
      <SoftBox pr={1}>
        <div className="search-container">
          <input type="text" placeholder="Busque pelo nome do cliente..."
            className="search-input"
            onChange={e => { setPesquisar(e.target.value) }}
            value={pesquisar}
            onKeyDown={handleKeyPress}
          />

          <i className="fas fa-search search-icon" onClick={e => { pesquisa(true) }} ></i>
        </div>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <div className="coluna-alterar-ciclo-vida-1-status-grupo">
          <label className='idioma'>Cliente</label>
          <div className="break-4"></div>
      
          <Form.Control placeholder="Idioma" name="GRUPO" type="text" value={filtroGrupo == 'Selecione' || resetGrupo ? '' : filtroGrupo} className="esconder label-login" onChange={(e) => setCdGrupo(e.target.value)} />
          {/* {revelarSelectGrupo === false &&
                                        <Button disabled={revelarSelectGrupo !== '' && revelarSelectGrupo !== null && revelarSelectGrupo !== undefined ? false : true} className="campo-texto-cor-3 campo-select-filtro-8" onClick={() => setRevelarSelectGrupo(!revelarSelectGrupo)}>
                                            <div className="fonte-cor-1 label-campo campo-texto-select-tamanho-2">{resetGrupo ? "Selecione" : filtroGrupo.split('*')[0]}</div>
                                            <img className={revelarSelectGrupo ? "campo-select-icone-ativado nao-selecionavel" : "campo-select-icone-desativado-filtro-b nao-selecionavel"} />
                                        </Button>
                                    } */}
            
          {revelarSelectGrupo &&

            <SelectGrupo
              rota={"filtroSimcard"}
              setRevelarSelectGrupo={setRevelarSelectGrupo}
              setFiltroGrupo={setFiltroGrupo}
              setCdGrupo={setCdGrupo}
              setResetGrupo={setResetGrupo}
              nomeGrupo={filtroGrupo}
              setId={setId}
              pesquisar={pesquisar}
            >
            </SelectGrupo>
          }


        </div>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
