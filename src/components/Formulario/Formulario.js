import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Question from './FormField';

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);

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

  return (
    <div>
      <h1>Criador de Questionário</h1>
      <button onClick={addQuestion}>Adicionar Pergunta</button>
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
    </div>
  );
};

export default Questionnaire;
