import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./component/DefaultLayout";
import { useState } from 'react';


function App() {
    const [token, setToken] = useState();

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout ? route.layout : DefaultLayout
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
                    })}
                </Routes>
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout ? route.layout : DefaultLayout
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;