import React, {useState, useEffect} from 'react'
import {BrowserRouter} from "react-router-dom";
import useRoutes from "./routes";

function App() {
    const routes = useRoutes()

    return (
        <div className="app-container container">
            <div className="page-wrapper">
                <BrowserRouter>
                    {routes}
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
