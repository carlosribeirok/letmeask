import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

import usePersistedState from '../hooks/usePersistedState';
import { useAuth } from '../hooks/useAuth';

import { Tema } from '../components/Tema';
import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoLight from '../assets/images/logoLight.png';

import { DefaultTheme } from 'styled-components';
import light from '../styles/themes/light';
import '../styles/auth.scss';

export function NewRoom() {    

    const { user } = useAuth()
    const history = useHistory()
    
    const [newRoom, setNewRoom] = useState('');

    const [ theme ] = usePersistedState<DefaultTheme>('theme', light);

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() == '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
        await window.location.replace(`http://localhost:3100/admin/rooms/${firebaseRoom.key}`);        
    }

    return (
        <div id="page-auth">
            <Tema />
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />        
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={theme.title === 'dark' ? logoLight : logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}