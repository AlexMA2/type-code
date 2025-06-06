import "./App.css";

import Layout from "@/components/ui/layout";
import { CodeProvider } from "./providers/CodeProvider";
import { Route, Switch } from "wouter";

import Stats from "./pages/stats/Stats";
import Home from "./pages/home/Home";

function App() {
    return (
        <>
            <Route path="/about">About Us</Route>

            <Switch>
                <Route path="/">
                    <Layout>
                        <CodeProvider>
                            <Home />
                        </CodeProvider>
                    </Layout>
                </Route>

                <Route path="/stats">
                    <Layout>
                        <Stats />
                    </Layout>
                </Route>

                {/* Default route in a switch */}
                <Route>404: No such page!</Route>
            </Switch>
        </>
    );
}

export default App;
