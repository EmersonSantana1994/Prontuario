import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Question from './FormField';
import Simulador from './SimuladorQuestionario';
import './questionario.css';


const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [simula, setSimula] = useState(false);
  const [error, setError] = useState('');
  const [duplicateTypes, setDuplicateTypes] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), title: '', text: '', type: 'text', options: [] }]);
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
      } });

    setDuplicateTypes(nomesAlterados);
  }, [questions]);

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
      {!simula &&
        <button onClick={addQuestion} className='buttQ'>Adicionar uma questão</button>
      }
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
      ) }
      {duplicateTypes.length > 0 && (
        <div style={{ color: 'red' }}>
          Tipos duplicados encontrados: {duplicateTypes.join(', ')}
        </div>
      ) }
    </div>

    {simula &&
        <button onClick={addQuestion} className='buttQ'>Salvar</button>
      }
      
      {!simula && duplicateTypes.length == 0 ?
        <button onClick={simulador} className='buttQ'>Simular questionario</button>
        :
        simula && duplicateTypes.length == 0 ?
        <button onClick={simulador} className='buttQ'>Voltar</button>
        :
        ""
      }
      {console.log("como éeeeeeeee", duplicateTypes)}

    </div>
  );
};

export default Questionnaire;
