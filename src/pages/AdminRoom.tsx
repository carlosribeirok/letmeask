import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import emptyQuestions from '../assets/images/empty-questions.svg';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    
    let showingAlert = false;
    const interval = setInterval(() => {
        document.title = showingAlert
        ? 'Letmeask' : `Sala Admin`;
        
        showingAlert = !showingAlert;
    }, 15000);

    const swal = require('@sweetalert/with-react');

    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    
    function handleEndRoom() {

        swal({
            title: "Encerrar sala",
            text: "Tem certeza que você deseja encerrar a sala?",
            icon: 'error',
            buttons: {
              cancel: true,
              delete: 'Sim, quero fechar'
            }
          }).then((result: any) => {
              if(result) {
                database.ref(`rooms/${roomId}`).update({
                    endedAt: new Date(),
                })
        
                history.push('/');
              }
          })
    }

    function handleDeleteQuestion(questionId: string) {
        swal({
            title: "Excluir pergunta",
            text: "Tem certeza que você deseja excluir a pergunta?",
            icon: 'error',
            buttons: {
              cancel: true,
              delete: 'Excluir'
            }
          }).then((result: any) => {
              if(result) {
                database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
              }
          })
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        swal({
            title: "Marcar como respondida",
            text: "Tem certeza que esta pergunta já teve sua resposta?",
            icon: 'warning',
            buttons: {
              cancel: true,
              delete: 'Sim'
            }
          }).then((result: any) => {
              if(result) {
                database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                    isAnswered: true,
                });
              }
          })
    }

    async function handleHighlightQuestion(questionId: string) {
        swal({
            title: "Marcar pergunta importante",
            text: "Você gostaria de destacar esta pergunta?",
            icon: 'info',
            buttons: {
              cancel: true,
              delete: 'Marcar'
            }
          }).then((result: any) => {
              if(result) {
                database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                    isHighlighted: true,
                });
              }
          })
    }
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <a className="home" href="http://localhost:3100">
                        <img src={logoImg} alt="Letmeask" />
                    </a>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>{title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>                

                <div className="question-isHighlighted">
                    {questions.map(question => {
                        if(question.isHighlighted){  
                            
                            return (
                                <Question 
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque à pergunta" />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                            );
                        }
                    })}
                    {questions.map(question => {
                        if(question.isHighlighted){
                            <div></div>
                        } else {
                            return (
                                <Question 
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque à pergunta" />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                            );
                        }
                    })}
                </div>
            </main>
            <div className="room-noQuestions">
            {questions.length === 0 && 
                <div>
                    <img src={emptyQuestions} alt="Sem perguntas" />
                    <p className="noQuestions-Title">Nenhuma pergunta por aqui</p>
                    <p>Envie o código desta sala para seus amigos e comece a responder perguntas</p>
                </div>} 
            </div>
        </div>
    );
}