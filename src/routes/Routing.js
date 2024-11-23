import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import PageLoading from "../components/fallback/PageLoading";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import PostDoc from "../pages/PostDoc";
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoading />}>
            {" "}
            <Login />
          </Suspense>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/postdoc"
            element={
              <Suspense fallback={<PageLoading />}>
                <PostDoc />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
