import React from 'react';
import './App.less';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound404 from "@/pages/NotFound404";
import WithLogin from "@/utils/WithLogin";
import Signup from "@/pages/Signup";


function App() {

    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={WithLogin(Home)}/>
                <Route path="*" component={NotFound404}/>
            </Switch>
        </Router>
    );
}

export default App;
