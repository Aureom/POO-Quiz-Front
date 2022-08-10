import React from 'react';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {Game} from "./component/page/game/Game";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./component/page/login/Login";

function App() {
  return (
    <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/game" element={<Game />} />
                <Route
                    path="*"
                    element={<Login/>}
                />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
