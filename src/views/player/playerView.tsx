import { COLORS, MESSAGE_TYPES, Message, Player } from "src/types";
import React, { useCallback, useState } from "react";

const socket = new WebSocket("ws://gamechanger-ws.jonathanjackson.me.uk:80");

export const PlayerView: React.FunctionComponent = () => {
    const [player, setPlayer] = useState<Player | undefined>(undefined);
    const [winningBuzz, setWinningBuzz] = useState<boolean>(true);

    socket.onmessage = (event: MessageEvent<any>) => {
        const data: Message = JSON.parse(event.data);
        console.log(data);
	
        switch (data.type) {
            case MESSAGE_TYPES.UPDATE:
                const players = data.players;
                const id = data.id;

                const thisPlayer = players.find(player => player.id === id);
                setPlayer(thisPlayer)

                if (thisPlayer?.timeBuzzed) {
                    const fasterPlayers = players.find(player => player.timeBuzzed && new Date(player.timeBuzzed) < new Date(thisPlayer.timeBuzzed || 0));
                    console.log(fasterPlayers);
                    setWinningBuzz(!fasterPlayers);
                } else {
                    setWinningBuzz(true);
                }
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

    const buzz = useCallback(() => {
        socket.send(JSON.stringify({
            type: "SET_POINTS",
            players: [{...player, timeBuzzed: Date.now()}]
        }))
    }, [player])

    return <div style={{
            // @ts-ignore
            backgroundColor: COLORS[player?.color.toString() || "RED"],
            height: '100vh',

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }} onClick={buzz}>

        <div style={{
            background: winningBuzz? "black": "gray",
            color: "white",

            width: '75vw',
            height: '30vw',

            borderRadius: '2vw',

            fontSize: '25vw',
            textAlign: 'center',
        }}>
            {
                player?.timeBuzzed ? 
                    "BUZZ!" :
                    player?.score.toString().padStart(4, '0')
            }
        </div>

    </div>
}