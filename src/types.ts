import ws from 'ws';

export enum COLORS {
    BLUE = "#5e9790",
    YELLOW = "#f9a648",
    ORANGE = "#e05536",
    RED = "#a4202d",
    PURPLE = "#5c3852"
}

export interface Player {
    id: number,
    player?: boolean,

    color: COLORS,
    score: number,
    timeBuzzed?: string,

    missedPings?: number,
    websocket?: ws.WebSocket
}

export enum MESSAGE_TYPES {
    UPDATE = "UPDATE",
    SET_POINTS = "SET_POINTS",
    JOIN = "JOIN",
}

export interface Message {
    type: MESSAGE_TYPES,
    id: number,
    players: Player[],
}
