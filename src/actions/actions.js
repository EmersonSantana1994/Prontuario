// actions/exampleActions.js
export const IDIOMA = 'IDIOMA';

export const idioma = (data) => ({
  type: IDIOMA,
  payload: data,
});

export const expandirNavegacao = (data) => ({
  type: "EXPANDIR_NAVEGACAO",
  payload: data,
});
export const fixarUsuario = (data) => ({
  type: "FIXAR_USUARIO",
  payload: data,
});
export const rotaDirecionar = (data ) => ({ 
  type: "ROTA_DIRECIONAR",
  payload: data,
});
export const rotaCadastro = (data) => ({
  type: "ROTA_CADASTRO",
  payload: data,
});
export const rotaAgendamento = (data) => ({
  type: "ROTA_AGENDAMENTO",
  payload: data,
});
export const rotaProntuario = (data) => ({
  type: "ROTA_PRONTUARIO",
  payload: data,
});
export const rotaTimeline = (data) => ({
  type: "ROTA_TIMELINE",
  payload: data,
});
export const rotaPreferencia = (data) => ({
  type: "ROTA_PREFERENCIA",
  payload: data,
});
export const rotaJornada = (data) => ({
  type: "ROTA_JORNADA",
  payload: data,
});
export const rotaPagamento = (data) => ({
  type: "ROTA_PAGAMENTO",
  payload: data,
});
export const propsEditar = (data) => ({
  type: "PROPS_EDITAR",
  payload: data,
});
export const voltarProntuario = (data) => ({
  type: "VOLTAR_PRONTUARIO",
  payload: data,
});

export const modalAberta = (data) => ({
  type: "MODAL_ABERTA",
  payload: data,
});
export const editarProntuario = (data) => ({
  type: "EDITAR_PRONTUARIO",
  payload: data,
});
export const idUsuario = (data) => ({
  type: "ID_USER_PRONTUARIO",
  payload: data,
});
export const atualizarTabela = (data) => ({
  type: "ATUALIZAR_TABELA",
  payload: data,
});




