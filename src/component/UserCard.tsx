import React from "react";
import './style/userCardStyle.css'

import {Badge, Card, Image, Text} from "@mantine/core";

type Props = {
    username: string;
    score: number;
    position: number;
}

export function UserCard({username, score, position}: Props) {
    if (username.length > 16) {
        username = username.substring(0, 16) + '...';
    }

    let imageUrl = 'https://avatars.dicebear.com/api/big-ears/' + username + '.svg';

    return (
        <Card key={position} className="user-card glassify" style={{display: "flex", flexDirection: "row"}} shadow="sm" p="xs"
              withBorder>
            <Image
                src={imageUrl}
                radius={999}
                width={50}
                height={50}
                alt={username}
            />

            <Text size="sm">
                {username}
            </Text>

            {getBadge(position, score)}
        </Card>

    );
}

function getBadge(position: number, score: number = 0) {
    if (position === 0) {
        return (
            <div>
                <Badge mr="xs" color="gray" className="badge-score">
                    {score.toFixed(0)}
                </Badge>
                <Badge color="yellow" variant="light">
                    1º
                </Badge>
            </div>
        )
    } else if (position === 1) {
        return (
            <div>
                <Badge mr="xs" color="gray" className="badge-score">
                    {score.toFixed(0)}
                </Badge>
                <Badge color="cyan" variant="light">
                    2º
                </Badge>
            </div>
        )
    } else if (position === 2) {
        return (
            <div>
                <Badge mr="xs" color="gray" className="badge-score">
                    {score.toFixed(0)}
                </Badge>
                <Badge color="grape" variant="light">
                    3º
                </Badge>
            </div>
        )
    } else {
        return (
            <div>
                <Badge mr="md" color="gray" className="badge-score">
                    {score.toFixed(0)}
                </Badge>
                <Badge color="gray" variant="light">
                    {position + 1}º
                </Badge>
            </div>
        )
    }
}