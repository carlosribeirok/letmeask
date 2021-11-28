import Swal from 'sweetalert2'

import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    const Swal = require('sweetalert2')

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }

    function AlertaSucesso() {
        return (
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'O código da sala foi copiado!',
                showConfirmButton: false,
                timer: 1300
              })
        )
    }

    return (
        <button className="room-code" onClick={() => { copyRoomCodeToClipBoard(); AlertaSucesso()}}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala: {props.code}</span>
        </button>
    )
}