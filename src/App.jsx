import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import CreateNewCase from "./pages/createNewCase/CreateNewCase";
import Home from "./pages/home/Home";
import CaseDetails from "./pages/caseDetails/CaseDetails";
import ViewCases from "./pages/viewCases/ViewCases";
import UserProfile from "./pages/user/User";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import RedirectAuthenticatedUser from "./components/protectedRoutes/RedirectAuthenticatedUser";
import { AuthProvider } from "./context/AuthProvider";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ThereDotLoader from "./components/loaders/ThereDotLoader";
import MyCases from "./pages/mycases/MyCases";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />}></Route>
        <Route path="/putUserData" element={<CreateNewCase />}></Route>
        <Route path="/view" element={<ViewCases />}></Route>
        <Route path="/mycases" element={<MyCases />}></Route>
        <Route path="/user" element={<UserProfile />}></Route>
        <Route path="/case/:id" element={<CaseDetails />}></Route>
      </Route>

      <Route
        path="/auth/signup"
        element={
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        }
      ></Route>
      <Route
        path="/auth/signin"
        element={
          <RedirectAuthenticatedUser>
            <SignIn />
          </RedirectAuthenticatedUser>
        }
      ></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    </>
  );
}

const AuthConsumer = () => {
  const { checkAuth, isCheckingAuth } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };
    authenticate();
  }, []);

  if (isCheckingAuth) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThereDotLoader />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
