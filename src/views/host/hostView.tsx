import { MESSAGE_TYPES, Message, Player } from "src/types";
import React, { useCallback, useState } from "react";

import { PlayerPanel } from "./playerPanel";

const socket = new WebSocket("ws://localhost:80");

export const HostView: React.FunctionComponent = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    socket.onmessage = useCallback((event: MessageEvent<any>) => {
        const data: Message = JSON.parse(event.data);
        console.log(data);
	
        switch (data.type) {
            case MESSAGE_TYPES.UPDATE:
                setPlayers(data.players)
                break;
        }
    }, [setPlayers]);

    return <div style={{
        display: "flex",
        
    }}>
        {players.map(player => <PlayerPanel player={player} socket={socket}/>)}
    </div>
}