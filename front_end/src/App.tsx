import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { userApi } from "./api/userApi";
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const AuthRoute = lazy(() => import("./utils/AuthRoute"));
const Login = lazy(() => import("./containers/Login/Login"));
const Register = lazy(() => import("./containers/Register/Register"));
const Home = lazy(() => import("./containers/Home/Home"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={"/"} loader={userApi.checkToken} element={<AuthRoute />}>
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Home/>} />
          </Route>
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
        </Route>
      </Route>
    )
  );

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
