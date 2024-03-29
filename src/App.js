import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes, adminRouters } from "./routes";
import DefaultLayout from "./component/DefaultLayout";
import LayoutAdmin from "./component/LayoutAdmin";
import RequireAuth from "./component/RequireAuth";
import { RequireAuthAdmin } from "./component/RequireAuth";
import PersistLogin from "./store/PersistLogin";

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
          {/* </Routes> */}
          {/* <Routes> */}
          <Route element={<PersistLogin />}>
            {privateRoutes.map((route, index) => {
              const Layout = route.layout ? route.layout : DefaultLayout;
              const Page = route.component;
              return (
                <Route key={index} element={<RequireAuth />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}

            {adminRouters.map((route, index) => {
              const Layout = route.layout ? route.layout : LayoutAdmin;
              const Page = route.component;
              return (
                <Route key={index} element={<RequireAuthAdmin />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
