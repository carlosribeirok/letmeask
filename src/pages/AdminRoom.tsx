import { useHistory, useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { useRoom } from '../hooks/useRoom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { Tema } from '../components/Tema';

import logoImg from '../assets/images/logo.svg';
import logoLight from '../assets/images/logoLight.png';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import emptyQuestions from '../assets/images/empty-questions.svg';

import usePersistedState from '../hooks/usePersistedState';

import { DefaultTheme } from 'styled-components';
import light from '../styles/themes/light';
import '../styles/room.scss';

import { AiOutlineArrowUp } from "react-icons/ai";

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    
    const swal = require('@sweetalert/with-react');
    const Swal = require('sweetalert2')

    let showingAlert = false;
    const interval = setInterval(() => {
        document.title = showingAlert
        ? 'Letmeask' : `Sala Admin`;
        
        showingAlert = !showingAlert;
    }, 15000);

    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    
    const [ theme ] = usePersistedState<DefaultTheme>('theme', light);

    const style = {
        display: 'none'
    };

    function handleEndRoom() {

        Swal.fire({
            title: 'Encerrar Sala',
            text: "Tem certeza que deseja fechar a sala?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Deletar!'
          }).then((result:any) => {
            if (result.isConfirmed) {
                database.ref(`rooms/${roomId}`).update({
                    endedAt: new Date(),
                })
                history.push('/');
                
                Swal.fire(
                    'Sala Fechada!',
                    'Sua sala foi encerrada.',
                    'success'
              )
            }
          })
    }

    function ScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function handleDeleteQuestion(questionId: string) {
        swal({
            title: "Excluir Pergunta",
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
            title: "Marcar Pergunta Como Respondida",
            text: "Tem certeza que esta pergunta já teve resposta?",
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
            title: "Destacar Pergunta Importante",
            text: "Você gostaria de ressaltar esta pergunta no topo?",
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
            <div style={style}><Tema /></div>
            <header>
                <div className="content">
                    <a className="home" href="http://localhost:3100">
                        <img src={theme.title === 'dark' ? logoLight : logoImg} alt="Letmeask" />
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

                { questions.length > 5 && <button className="buttonScrollTop" onClick={ScrollTop}><AiOutlineArrowUp /></button> }
                
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