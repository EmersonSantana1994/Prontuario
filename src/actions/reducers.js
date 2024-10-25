// reducers/exampleReducer.js

import { idPacliente, idQuestionario, nomePacliente, seguirConsulta, seguirPacliente, seguirRespostas, voltarProntuario } from './actions';

const initialState = {
  expandirNavegacao: true,
  voltarProntuario: false,
  modalAberta: false,
  editarProntuario: false,
  idUsuario: 0,
  atualizarTabela:false,
  propsEditar:false,
  fixarUsuario:false,
  rotaCadastro:false,
  rotaAgendamento:false,
  rotaProntuario:false,
  rotaTimeline:false,
  rotaPreferencia:false,
  rotaJornada:false,
  rotaPagamento:false,
  rotaDirecionar:false,
  consultorio:false,
  seguirAgendamento:false,
  nomeConsultorio:false,
  seguirCliente:false,
  seguirPacliente:false,
  seguirAgenda:false,
  cpfRedux:false,
  rgRedux:false,
  nomeRedux:false,
  idQuestionario:false,
  idPacliente:false,
  seguirTriagem:false,
  nomePacliente:false,
  arrayText:[''],
  seguirRespostas:false,
  seguirConsulta:false,
  idConsulta:false,
  seguirAnotacao:false,
  visualizarRespostas:false,
};

export const reduxH = (state = initialState, action) => {
   
    if (action.type === 'EXPANDIR_NAVEGACAO') {
        return {
            ...state, 
            expandirNavegacao: action.payload
        }
    }
    else if (action.type === 'SEGUIR_CLIENTE') {
        return {
            ...state, 
            seguirCliente: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_TRIAGEM') {
        return {
            ...state, 
            seguirTriagem: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_ANOTACAO') {
        return {
            ...state, 
            seguirAnotacao: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_PACLIENTE') {
        return {
            ...state, 
            seguirPacliente: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_AGENDA') {
        return {
            ...state, 
            seguirAgenda: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_RESPOSTAS') {
        return {
            ...state, 
            seguirRespostas: action.payload
        }
    } 
    else if (action.type === 'VISUALIZAR_RESPOSTAS') {
        return {
            ...state, 
            visualizarRespostas: action.payload
        }
    } 
    else if (action.type === 'SEGUIR_CONSULTA') {
        return {
            ...state, 
            seguirConsulta: action.payload
        }
    } 
    else if (action.type === 'RG') {
        return {
            ...state, 
            rgRedux: action.payload
        }
    } 
    else if (action.type === 'CPF') {
        return {
            ...state, 
            cpfRedux: action.payload
        }
    } 
    else if (action.type === 'NOME') {
        return {
            ...state, 
            nomeRedux: action.payload
        }
    } 
    else if (action.type === 'FIXAR_USUARIO') {
        return {
            ...state, 
            fixarUsuario: action.payload
        }
    } else if (action.type === 'CONSULTORIO_SELECIONADO') {
        return {
            ...state, 
            consultorio: action.payload
        }
    }
        else if (action.type === 'ARRAY_TEXT') {
            return {
                ...state, 
                arrayText: action.payload
            }
        
    }else if (action.type === 'NOME_CONSULTORIO') {
        return {
            ...state, 
            nomeConsultorio: action.payload
        }
        
    }else if (action.type === 'SEGUIR_AGENDAMENTO') {
        return {
            ...state, 
            seguirAgendamento: action.payload
        }
    }else if (action.type === 'ID_QUESTIONARIO') {
        return {
            ...state, 
            idQuestionario: action.payload
        }
    }
    else if (action.type === 'ID_PACLIENTE') {
        return {
            ...state, 
            idPacliente: action.payload
        }
    }
    else if (action.type === 'ID_CONSULTA') {
        return {
            ...state, 
            idConsulta: action.payload
        }
    }
    else if (action.type === 'NOME_PACLIENTE') {
        return {
            ...state, 
            nomePacliente: action.payload
        }
    }
    else if (action.type === 'ROTA_DIRECIONAR') {
        return {
            ...state, 
            rotaDirecionar: action.payload
        }
    }
    else if (action.type === 'ROTA_CADASTRO') {
        return {
            ...state, 
            rotaCadastro: action.payload
        }
    }
    else if (action.type === 'ROTA_AGENDAMENTO') {
        return {
            ...state, 
            rotaAgendamento: action.payload
        }
    }
    else if (action.type === 'ROTA_PRONTUARIO') {
        return {
            ...state, 
            rotaProntuario: action.payload
        }
    }
    else if (action.type === 'ROTA_TIMELINE') {
        return {
            ...state, 
            rotaTimeline: action.payload
        }
    }
    else if (action.type === 'ROTA_PREFERENCIA') {
        return {
            ...state, 
            rotaPreferencia: action.payload
        }
    }
    else if (action.type === 'ROTA_JORNADA') {
        return {
            ...state, 
            rotaJornada: action.payload
        }
    }
    else if (action.type === 'ROTA_PAGAMENTO') {
        return {
            ...state, 
            rotaPagamento: action.payload
        }
    }


    else if (action.type === 'MODAL_ABERTA') {
        return {
            ...state, 
            modalAberta: action.payload
        }
    }
    else if (action.type === 'EDITAR_PRONTUARIO') {
        return {
            ...state, 
            editarProntuario: action.payload
        }
    }

    else if (action.type === 'ID_USER_PRONTUARIO') {
        return {
            ...state, 
            idUsuario: action.payload
        }
    }

    else if (action.type === 'ATUALIZAR_TABELA') {
        return {
            ...state, 
            atualizarTabela: action.payload
        }
    }

    else {
        return state;
    }
};


