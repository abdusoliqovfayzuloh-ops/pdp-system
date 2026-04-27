import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Loyaut from "./pages/Loyaut/Loyaut"
import Leaders from "./pages/Leaders/Leaders"
import Roules from "./pages/Roules/Roules"
import Home from "./pages/Home/Home"
import './App.css'
import Login from "./pages/Login/Login"
import { useState } from "react"
import Negatives from "./components/Negatives/Negatives"
import Pozetives from "./components/Pozetives/Pozetives"
import Profil from "./pages/Profil/Profil"
import Complain from "./pages/Complain/Complain"

function App() {
  const [student, setStudent] = useState({})
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login"/>
    },
    {
      path: "/login",
      element: <Login setStudent={setStudent}/>
    },
    {
      path: "/loyaut",
      element: <Loyaut student={student}/>,
      children: [
        {
          index: true,
          element: <Navigate to={"home"}/>
        },
        {
          path: "home",
          element: <Home/>
        },
        {
          path: "leaders",
          element: <Leaders/>
        },
        {
          path: "rouls",
          element: <Roules/>,
          children: [
            {
              index: true ,
              element: <Navigate to={"pozetives"}/>
            },
            {
              path: 'negatives',
              element: <Negatives/>
            },
            {
              path: "pozetives",
              element: <Pozetives/>
            }
          ]
        },
        {
          path: "complain",
          element: <Complain/>
        },
        {
          path:"profil",
          element:<Profil />
        }
      ]
    }
  ])

  return (<>
    <RouterProvider router={router}/>
  </>)
}

export default App
