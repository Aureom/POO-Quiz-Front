import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MantineProvider} from "@mantine/core";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
        <App/>
    </MantineProvider>
);
