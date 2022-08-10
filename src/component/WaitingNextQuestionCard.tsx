import React, {useEffect} from "react";
import './style/waitingNextQuestionStyle.css'

import {Card, Progress, Title} from "@mantine/core";

export function WaitingNextQuestionCard() {
    const [countdown, setCountdown] = React.useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        }
    }, [countdown]);

    return (
        <Card className="waiting-next-question-card glassify" shadow="sm" p="xs" withBorder>
            <Title>Proxima questão</Title>
            <Title>{countdown}...</Title>
            <Progress mt="xl" color="yellow" animate value={countdown * 20}/>
        </Card>
    );
}