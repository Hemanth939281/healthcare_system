import { Toaster } from "react-hot-toast"
import LoginPage from "./features/auth/Login"
const App = () => {
  return (
    <>
    <Toaster position="top-right" />
    <LoginPage />
    </>
  )
}

export default App