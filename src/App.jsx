import { Link, Route, Switch } from "wouter";
import "./App.css";
import Home from "./pages/home/Home";

function App() {
    return (
        <>
            <Route path="/about">About Us</Route>

            <Switch>
                <Route path="/" component={Home} />

                {/* Default route in a switch */}
                <Route>404: No such page!</Route>
            </Switch>
        </>
    );
}

export default App;
