import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Movies,
  NewMovie,
  SitSelector,
  Payments,
  NotFound,
} from "./Pages";
import "@fontsource/poppins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Movies",
    element: <Movies />,
  },
  {
    path: "/NewMovie",
    element: <NewMovie />,
  },
  {
    path: "/SitSelector",
    element: <SitSelector />,
  },
  {
    path: "/Payments",
    element: <Payments />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
