import React from "react";
import './style/winnerCardStyle.css'

import {Image, Title, Card} from "@mantine/core";
import {User} from "../api/API";
import {Crown} from "tabler-icons-react";

type Props = {
    user: User;
}

export function WinnerCard({user}: Props) {
    if (user.username.length > 16) {
        user.username = user.username.substring(0, 16) + '...';
    }

    let imageUrl = 'https://avatars.dicebear.com/api/big-ears/' + user.username + '.svg';

    return (
        <Card className="winner-card glassify" shadow="sm" p="xs" withBorder>
            <Title className="question-title">
                VENCEDOR
            </Title>
            <div className="winner-card">
                <Crown size={'5rem'} color="yellow"/>

                <Image
                    src={imageUrl}
                    radius={999}
                    width={'10rem'}
                    height={'10rem'}
                    alt={user.username}
                />

                <Title>{user.username}</Title>
            </div>
        </Card>
    );
}