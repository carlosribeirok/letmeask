import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    const swal = require('@sweetalert/with-react');

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }

    function AlertaSucesso() {
        return (
            swal({
                icon: "success",
                text: "Texto copiado com sucesso!",
                timer: 1000,
                buttons: false,
                content: (
                  <div></div>
                )
              })
        )
    }


    return (
        <button className="room-code" onClick={() => { copyRoomCodeToClipBoard(); AlertaSucesso()}}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}