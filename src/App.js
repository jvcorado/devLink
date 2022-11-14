import { createBrowserRouter  } from "react-router-dom";

import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Mensagem} from "./pages/Mensagem";
import { Error } from "./pages/Error";
import { Private } from "./routes/private";
import { RedesSociais } from "./pages/RedesSociais";


export const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  { path:'/mensagem',
    element: <Mensagem/>
  },
  { path:'/login',
    element: <Login/>
  },
  {
    path:'/admin',
    element: <Private><Admin/></Private>
  },
  {
    path:'admin/redes',
    element: <Private><RedesSociais/></Private>
  },
  {
    path:'*',
    element:<Error/>
  }
]);