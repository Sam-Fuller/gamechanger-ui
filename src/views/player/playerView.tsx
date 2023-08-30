import { COLORS, MESSAGE_TYPES, Message, Player } from "src/types";
import React, { useState } from "react";

const socket = new WebSocket("ws://localhost:80");

export const PlayerView: React.FunctionComponent = () => {
    const [player, setPlayer] = useState<Player | undefined>(undefined);

    socket.onmessage = (event: MessageEvent<any>) => {
        const data: Message = JSON.parse(event.data);
        console.log(data);
	
        switch (data.type) {
            case MESSAGE_TYPES.UPDATE:
                const players = data.players;
                const id = data.id;

                setPlayer(players.find(player => player.id === id))
                break;
        }
    }

    if (!player) {
        socket.onopen = () => {
            console.log("Joining game")

            socket.send(JSON.stringify({
                type: "JOIN",
            }));
        }
    }

    return <div style={{
            // @ts-ignore
            backgroundColor: COLORS[player?.color.toString() || "RED"],
            height: '100vh',

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>

        <div style={{
            background: "black",
            color: "white",

            width: '75vw',
            height: '30vw',

            borderRadius: '2vw',

            fontSize: '25vw',
            textAlign: 'center',
        }}>
            {player?.score.toString().padStart(4, '0')}
        </div>

    </div>
}