import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {ModalProvider} from "./context/ModalContext";
import NotesPage from "./pages/NotesPage";

export default function useRoutes() {
    return (
        <Switch>
            <Route path={'/'} exact>
                <ModalProvider>
                    <NotesPage/>
                </ModalProvider>
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    )
}