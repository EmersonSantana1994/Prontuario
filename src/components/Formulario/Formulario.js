import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Question from './FormField';
import Simulador from './SimuladorQuestionario';
import './questionario.css';


const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [simula, setSimula] = useState(false);

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

  return (
    
    <div>
        {!simula &&
      <h1>Criador de Questionário</h1>
}
{simula &&
      <h4>Veja abaixo como seu questionario esta ficando antes de salvar</h4>
}

      {simula &&
      <h5>Questionario</h5>
}

      {/* <h2>Modo de usar</h2>
      <p>- Clique em Adicionar pergunta para inserir uma nova pergunta ao questionario</p>
      <p>- Clique em Adicionar pergunta para inserir uma nova pergunta ao questionario</p> */}
{!simula &&
 <button onClick={addQuestion} className='buttQ'>Adicionar Pergunta</button>
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
:  <Simulador questions={questions}/>
} 
     
{simula &&
  <button onClick={addQuestion} className='buttQ'>Salvar</button>
}
      

      {!simula ?
        <button onClick={simulador} className='buttQ'>Simular questionario</button>
        :
        <button onClick={simulador} className='buttQ'>Voltar</button>
      }
      {console.log("como éeeeeeeee",questions )}

    </div>
  );
};

export default Questionnaire;
