import React, {useEffect} from "react";
import './style/waitingNextQuestionStyle.css'

import {Card, Title} from "@mantine/core";
import {User} from "../api/API";

type Props = {
    users: User[];
}

export function WaitingUsersCard({users}: Props) {
    const [usersCount, setUsersCount] = React.useState(0);

    useEffect(() => {
        setUsersCount(users.length);
    }, [users]);

    return (
        <Card className="waiting-next-question-card glassify" shadow="sm" p="xs" withBorder>
            <Title>Iniciando uma nova partida</Title>
            <Title mt="xl">Esperando jogadores...</Title>
            <Title mt="xs">{usersCount}/2</Title>
        </Card>
    );
}