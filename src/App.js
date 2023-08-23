import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./component/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout ? route.layout : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Layout = route.layout ? route.layout : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
