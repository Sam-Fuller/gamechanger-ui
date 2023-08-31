import './hostView.css';

import { MESSAGE_TYPES, Message, Player } from "src/types";
import React, { useCallback, useState } from "react";

import { PlayerPanel } from "./playerPanel";

const socket = new WebSocket("ws://gamechanger-ws.jonathanjackson.me.uk:80");

export const HostView: React.FunctionComponent = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [winningPlayer, setWinningPlayer] = useState<Player | undefined>(undefined);

    socket.onmessage = useCallback((event: MessageEvent<any>) => {
        const data: Message = JSON.parse(event.data);
        console.log(data);
	
        switch (data.type) {
            case MESSAGE_TYPES.UPDATE:
                setPlayers(data.players)

                const winner = data.players
                    .filter(player => player.timeBuzzed)
                    .sort(player => new Date(player.timeBuzzed || 0).getTime())[0]
                setWinningPlayer(winner)

                break;
        }
    }, [setPlayers]);

    const resetBuzzers = useCallback(() => {
        socket.send(JSON.stringify({
            type: "SET_POINTS",
            players: players.map(player => ({...player, timeBuzzed: undefined}))
        }))
    }, [players]);

    return <div style={{backgroundColor: "lightgray", height: "100vh"}}>
        <div style={{
            padding: "10px",
            backgroundColor: "darkgray",
            display: "flex",
        }}>
                <div style={{
                    margin: "5px", padding: "5px",
                    backgroundColor:"lightGray",
                    borderRadius: "5px",
                }} onClick={resetBuzzers}>reset buzzers</div>
        </div>

        <div style={{
            display: "flex",
        }}>
            {players.map(player => <PlayerPanel player={player} socket={socket} winner={winningPlayer}/>)}
        </div>
    </div>
}