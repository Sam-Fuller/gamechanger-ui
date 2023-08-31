import { COLORS, Player } from "src/types";

import {ReactComponent as AddIcon} from './add.svg';
import React from "react";
import {ReactComponent as SubIcon} from './sub.svg';

export const PlayerPanel: React.FunctionComponent<{player: Player, socket: WebSocket, winner?: Player}> = ({player, socket, winner}) => {
    const addPoints = (amount: number) => {
        socket.send(JSON.stringify({
            type: "SET_POINTS",
            players: [{...player, score: Math.max(0, player.score + amount)}]
        }));
    }

    return <div style={{
        // @ts-ignore
        backgroundColor: COLORS[player?.color.toString() || "RED"],

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
    }}>
        <div style={{
            background: winner && winner.id !== player.id? "gray": "black",
            color: "white",

            padding: "5px",
            borderRadius: '5px',
            margin: "20px",
            marginBottom: "5px",

            fontSize: '2em',
            textAlign: 'center',
        }}>
            {
                player?.timeBuzzed ? 
                    "BUZZ" :
                    player?.score.toString().padStart(4, '0')
            }
        </div>

        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "center",
        }}>
            <AddIcon style={{width: "25px", margin: "5px"}} onClick={() => addPoints(1)}/>
            <SubIcon style={{width: "25px", margin: "5px"}} onClick={() => addPoints(-1)}/>
        </div>
    </div>
}