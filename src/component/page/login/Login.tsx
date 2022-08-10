import React, {useEffect} from "react";
import './loginStyle.css'

import {Button, Container, Grid, LoadingOverlay, Text, TextInput, Title, TypographyStylesProvider} from "@mantine/core";
import {ArrowBigRightLines} from "tabler-icons-react";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {loginUser, tryLogin} from "../../../api/API";
import {toast, ToastContainer} from "react-toastify";


export function Login() {
    let loading = false;

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('username') !== null && localStorage.getItem('uuid') !== null) {
            tryLogin(localStorage.getItem('uuid')!, localStorage.getItem('username')!).then((res) => {
                if(res.status === 200) {
                    navigate('/game');
                    console.log('navigate');
                }else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('uuid');
                }
            }).catch((err) => {
                localStorage.removeItem('username');
                localStorage.removeItem('uuid');
            });
        }
    }, [navigate]);

    const loginForm = useForm({
        initialValues: {
            username: '',
        },
        validate: {
            username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        }
    })

    const handleSubmit = () => {
        loading = true;

        loginUser(loginForm.values.username).then((res) => {
            console.log(res)

            if(res.status === 200) {
                localStorage.setItem('uuid', res.data.id);
                localStorage.setItem('username', res.data.username);
                navigate('/game');
            }else {
                loading = false;
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error(err.response.data);
        });
    }

    return (
        <>
            <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={500}/>
            <ToastContainer/>
            <Grid grow justify="center" className="login-main">
                <Grid.Col sm={1} md={2}>
                    <form className="login-container" onSubmit={loginForm.onSubmit((values) => handleSubmit())}>
                        <Title align="center">
                            ENTRAR
                        </Title>

                        <TextInput
                            required
                            label="Username"
                            placeholder="Username"
                            mt="xl"
                            {...loginForm.getInputProps('username')}
                        />

                        <Button mt="xl" type="submit" leftIcon={<ArrowBigRightLines/>} variant="default" uppercase>
                            começar
                        </Button>
                    </form>
                </Grid.Col>
                <Grid.Col sm={1} md={2}>
                    <Container className="how-to-play">
                        <Text>
                            <TypographyStylesProvider>
                                <h3>COMO JOGAR?</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed
                                    corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur
                                    debitis
                                    non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab,
                                    ipsum
                                    veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae
                                    perspiciatis.
                                </p>
                            </TypographyStylesProvider>
                        </Text>
                    </Container>
                </Grid.Col>
            </Grid>
        </>
    );
}