import React from "react";
import './style/questionStyle.css'

import {Button, Card, Checkbox, Progress, Title} from "@mantine/core";
import {toast, ToastContainer} from "react-toastify";
import {answerQuestion} from "../api/API";

type Props = {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    percentageTimeLeft: number;
    userAnswer?: number;
}

export function QuestionCard({question, optionA, optionB, optionC, optionD, percentageTimeLeft}: Props) {
    const [optionSelected, setOptionSelected] = React.useState<number>();
    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);

    const handleSubmit = () => {
        if (optionSelected === undefined) {
            toast.error("Você deve selecionar uma opção");
            return;
        }

        answerQuestion(localStorage.getItem('uuid')!, optionSelected).then(() => {
            setAlreadyAnswered(true);
        }).catch(err => {
            console.log(err);
        });

        console.log(optionSelected);
    }

    return (
        <>
            <Card className="question-card glassify" shadow="sm" p="xs" withBorder>
                <ToastContainer/>
                <div>
                    <Title>{question}</Title>
                    <Checkbox size="lg" mt="md" checked={optionSelected === 0} value={optionA} label={optionA}
                              onChange={() => {
                                  if (alreadyAnswered)
                                      toast.error("Você não pode alterar sua resposta");
                                  else
                                      setOptionSelected(0)
                              }}/>
                    <Checkbox size="lg" mt="md" checked={optionSelected === 1} value={optionB} label={optionB}
                              onChange={() => {
                                  if (alreadyAnswered)
                                      toast.error("Você não pode alterar sua resposta");
                                  else
                                      setOptionSelected(1)
                              }}/>
                    <Checkbox size="lg" mt="md" checked={optionSelected === 2} value={optionC} label={optionC}
                              onChange={() => {
                                  if (alreadyAnswered)
                                      toast.error("Você não pode alterar sua resposta");
                                  else
                                      setOptionSelected(2)
                              }}/>
                    <Checkbox size="lg" mt="md" checked={optionSelected === 3} value={optionD} label={optionD}
                              onChange={() => {
                                  if (alreadyAnswered)
                                      toast.error("Você não pode alterar sua resposta");
                                  else
                                      setOptionSelected(3)
                              }}/>
                </div>
                <div>
                    <Button uppercase disabled={alreadyAnswered} mt="xl" className="submit-answer" onClick={() => {
                        handleSubmit()
                    }}>
                        confirmar resposta
                    </Button>
                </div>
                <div>
                    <Progress mt="xl" color="red" animate value={percentageTimeLeft}/>
                </div>
            </Card>
        </>
    );
}
