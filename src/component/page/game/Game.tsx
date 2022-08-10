import React, {useEffect, useState} from "react";
import './gameStyle.css'

import {Grid, LoadingOverlay, ScrollArea} from "@mantine/core";
import {QuestionCard} from "../../QuestionCard";
import {useNavigate} from "react-router-dom";
import {GameData, GameStatus, getGame, tryLogin} from "../../../api/API";
import {UserCard} from "../../UserCard";
import {WinnerCard} from "../../WinnerCard";
import {WaitingNextQuestionCard} from "../../WaitingNextQuestionCard";
import {WaitingUsersCard} from "../../WaitingUsersCard";

export function Game() {

    const [gameData, setGameData] = useState<GameData>();

    const navigate = useNavigate();
    useEffect((): any => {
        const username = localStorage.getItem('username');
        const uuid = localStorage.getItem('uuid');
        if (username === null || uuid === null) {
            navigate('/');
        }

        tryLogin(uuid!, username!).then((res) => {
            if (res.status === 200) {
                navigate('/game');
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('uuid');
            }
        }).catch((err) => {
            localStorage.removeItem('username');
            localStorage.removeItem('uuid');
        });
    }, [navigate]);

    useEffect(() => {
        const gameDataInterval = setInterval(() => {
            getGameData();
        }, 1000);

        return () => {
            clearInterval(gameDataInterval);
        }

        function getGameData() {
            getGame().then((res) => {
                setGameData(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);


    return (
        <>
            <LoadingOverlay visible={gameData === undefined} overlayBlur={2} transitionDuration={500}/>
            <Grid justify="center" className="game-main">
                <Grid.Col className="users" sm={5} md={4}>
                    <ScrollArea style={{height: 800}}>
                        {gameData !== undefined && gameData.users.map((user, index) => (
                            <UserCard username={user.username} score={user.score} position={index}/>
                        ))}
                    </ScrollArea>
                </Grid.Col>
                <Grid.Col sm={8} md={8}>
                    {gameData?.status === GameStatus.FINISHED && (
                        <WinnerCard user={gameData.users[0]}/>
                    )}
                    {gameData?.status === GameStatus.GENERATING_NEXT_QUESTION && (
                        <WaitingNextQuestionCard/>
                    )}
                    {gameData?.status === GameStatus.WAITING_FOR_PLAYERS && (
                        <WaitingUsersCard users={gameData.users}/>
                    )}
                    {gameData?.status === GameStatus.IN_PROGRESS && gameData?.currentQuestion !== undefined && (
                        <QuestionCard question={gameData.currentQuestion.question}
                                      optionA={gameData.currentQuestion.optionA}
                                      optionB={gameData.currentQuestion.optionB}
                                      optionC={gameData.currentQuestion.optionC}
                                      optionD={gameData.currentQuestion.optionD}
                                      percentageTimeLeft={gameData.percentageTimeLeft}/>
                    )}
                </Grid.Col>
            </Grid>
        </>
    );
}