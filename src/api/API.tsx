import axios from "axios";

export const BASE_URL = "https://poo-quiz-final.herokuapp.com/api"

export function loginUser(username: String) {
    return axios.get(`${BASE_URL}/user/${username}`);
}

export function tryLogin(uuid: string, username: string) {
    return axios.post(`${BASE_URL}/user`, {
            id: uuid,
            username: username,
        }
    );
}

export function getGame() {
    return axios.get(`${BASE_URL}/game`);
}

export function answerQuestion(uuid: string, answer: number) {
    return axios.post(`${BASE_URL}/game/answer`, {}, {
            params: {
                uuid: uuid,
                answer: answer
            }
        });
}

export interface GameData {
    currentQuestion: CurrentQuestion;
    users: User[];
    usersWhoAnswered: User[];
    chatMessages: any[];
    status: string;
    percentageTimeLeft: number;
}

export interface CurrentQuestion {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}

export interface User {
    username: string;
    score: number;
}

export enum GameStatus {
    WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
    IN_PROGRESS = "IN_PROGRESS",
    GENERATING_NEXT_QUESTION = "GENERATING_NEXT_QUESTION",
    FINISHED = "FINISHED"
}