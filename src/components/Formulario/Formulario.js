import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Question from './FormField';
import Simulador from './SimuladorQuestionario';
import './formulario.css';
import { apiC } from "../../conexoes/api";
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Ícone de X


const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [simula, setSimula] = useState(false);
  const [error, setError] = useState('');
  const [duplicateTypes, setDuplicateTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionarioNome, setQuestionarioNome] = useState('');
  const [isSucess, setIsSucess] = useState(false);
  const [isFalhou, setIsFalhou] = useState(false);
  const [isValidar, setIsValidar] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), title: '', text: '', type: 'text', options: [] }]);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setQuestionarioNome(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  async function handleSave() {
    if (!questionarioNome) {
      setError('O nome do questionário é obrigatório!');
      return;
    }
    setQuestionarioNome('');
    await salvar()

  };

  const handleQuestionChange = (id, newQuestion) => {
    setQuestions(questions.map(q => (q.id === id ? newQuestion : q)));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);
    setQuestions(reorderedQuestions);
  };

  const simulador = (result) => {
    setSimula(!simula)
  };

  useEffect(() => {
    if(questions.length > 0){
      if(questions[0].options.length > 0 ){
        if(questions[0].options[0] != ''){
          setIsValidar(true)
        }else{
          setIsValidar(false)
        }
      }else{
        setIsValidar(false)
      }
    }else{
      setIsValidar(false)
    }

  }, [questions]);

  useEffect(() => {
    const typeCount = {};

    // Contar ocorrências de cada tipo
    questions.forEach(item => {
      typeCount[item.type] = (typeCount[item.type] || 0) + 1;
    });

    // Filtrar tipos que aparecem mais de uma vez
    const duplicates = Object.keys(typeCount).filter(type => typeCount[type] > 1);

    const nomesAlterados = duplicates.map(elemento => {
      switch (elemento) {
        case 'checkbox':
          return 'Múltipla escolha';
        case 'select':
          return 'Campo de seleção';
        case 'radio':
          return 'Escolha única';
        case 'dataHora':
          return 'Data e hora';
        case 'text':
          return 'Resposta em texto';
        case 'data':
          return 'Data';
        default:
          return elemento; // Retorna o elemento original se não houver correspondência
      }
    });

    setDuplicateTypes(nomesAlterados);
  }, [questions]);

  async function salvar() {

    console.log("zzzzzzzzz", questionarioNome)
    apiC.post("quationario/salvar", {
      "questionario": questions,
      "id_usuario": 1,
      "questionarioNome": questionarioNome,
    })
      .then(response => {

        if (response.status === 200) {

          alert('questionario salvo')
          setIsSucess(true)
          setIsModalOpen(false)
          setIsFalhou(false)
        }
      })
      .catch((error) => {
        alert('erro questionario não salvo')
        setIsFalhou(true)
        setIsModalOpen(false)
        setIsSucess(false)
      });
  }

  return (

    <div>
      {!simula &&
        <h1>Criador de questionário</h1>
      }
      {!simula &&
        <h6>Araste as perguntas para as posições que deseja</h6>
      }
      {simula &&
        <h4 className='tituSimu'>Veja abaixo como seu questionario esta ficando antes de salvar</h4>
      }

      {simula &&
        <h5 className='tituQuest'>Questionario</h5>
      }

      {/* <h2>Modo de usar</h2>
      <p>- Clique em Adicionar pergunta para inserir uma nova pergunta ao questionario</p>
      <p>- Clique em Adicionar pergunta para inserir uma nova pergunta ao questionario</p> */}

      {console.log("wwwwwwwwwww", questions)}

      {!simula ?
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Question
                          question={question}
                          onChange={handleQuestionChange}
                          onDelete={removeQuestion} // Passando a função de remoção
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        : <Simulador questions={questions} />
      }


      <div>
        {duplicateTypes.length > 0 && (
          <div style={{ color: 'red' }}>
            Não deve conter mais de um tipo de pergunta adicionado em títulos diferentes
          </div>
        )}
        {duplicateTypes.length > 0 && (
          <div style={{ color: 'red' }}>
            Tipos duplicados encontrados: {duplicateTypes.join(', ')}
          </div>
        )}
      </div>
      {!simula &&
        <button onClick={addQuestion} className='buttQ'>Adicionar uma questão</button>
      }
      {simula && !isValidar && 
        <p style={{ color: 'red' }}>
            A primeira questão deve ter uma pergunta ou opção descrita!
          </p>
      }
      {simula && isValidar &&
        <button onClick={handleSaveClick} className='buttQ'>Salvar</button>
      }

      {!simula  &&
        <button onClick={simulador} className='buttQ'>Simular questionario</button>
      }

      {
        simula && 
          <button onClick={simulador} className='buttQ'>Voltar</button>
         
      }

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className='modal'>
      <div className='fecharModal'>
            <FaTimes
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        <div className='modal-pos'>
        
          <p className='h2-modal'>Digite um nome ao questionário*</p>
          <input
            type="text"
            value={questionarioNome}
            onChange={handleInputChange}
            className='input-modal'
          />
          {error && <p className='error' >{error}</p>}


          <div className="buttons">
            <button onClick={() => { handleSave() }} className='confirm'>
              Confirmar
            </button>
            <button onClick={() => setIsModalOpen(false)} className='cancel'>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isSucess} onRequestClose={() => setIsSucess(false)} className='modal'>
      <div className='posicion'>
            <FaTimes
              onClick={() => setIsSucess(false)}
              className='fechar'
            />
          </div>
        <div className='modal-pos-sucess'>
         
          <div className='posiItem'>

            <h2 className='posText'>
              <i className="fa fa-check-circle" aria-hidden="true" 
              style={{ fontSize: '52px', color: 'green' }}></i>
            </h2>

          </div>
          <p className='msg'>Questionário salvo!</p>
          <h1 className='msg2'>Seu questionario se encontra no menu de Questionario!</h1>

        </div>
      </Modal>

      <Modal isOpen={isFalhou} onRequestClose={() => setIsFalhou(false)} className='modal'>
      <div className='posicion'>
            <FaTimes
              onClick={() => setIsFalhou(false)}
               className='fechar'
            />
          </div>
          <div className='modal-pos-sucess'>
          
          <div className='posiItem'>

          <h2 className='posText'>
              <i className="fa fa-times-circle" aria-hidden="true" style={{ fontSize: '52px', color: 'red' }}></i>
            </h2>

          </div>
          <p className='msg'>Erro ao salvar!</p>
          <h1 className='msg2'>Contate a equipe de suporte!</h1>


  
        </div>
      </Modal>
    </div>
    
  );
};

export default Questionnaire;
