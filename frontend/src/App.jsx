import { Routes,Route } from "react-router-dom"
import FloatingShape from "./component/FloatingShape"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import VerificationEmailPage from "./pages/VerificationEmailPage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthStore"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "./component/LoadingSpinner"
import Dashboard from "./pages/Dashboard"
import ForgotPasswordPage from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"

const ProtectedRoute = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore()
  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

  const RedirectedAuthenticatedRoute = ({children}) =>{
    const {isAuthenticated, user} = useAuthStore()

    if(isAuthenticated && user.isVerified){
      return <Navigate to="/" replace />
    }

    return children;
  
  }
function App() {

  const {checkAuth, isCheckingAuth,user, isAuthenticated} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])


  if(isCheckingAuth){
    return <LoadingSpinner />
  }

  console.log("isAuthenticated : ", isAuthenticated);
  console.log("User details:",user)
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center overflow-hidden relative">
    <div><Toaster/></div>
    <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
    <FloatingShape color="bg-emerald-500" size="w-32 h-32" top="70%" left="80%" delay={5} />
    <FloatingShape color="bg-lime-500" size="w-16 h-16" top="50%" left="-5%" delay={3} />
    <FloatingShape color="bg-green-100" size="w-10 h-10" top="10%" left="85%" delay={1} />

    <Routes>
      <Route path="/" element= { <ProtectedRoute> <Dashboard/>  </ProtectedRoute>} />
      <Route path="/signup" element= {<RedirectedAuthenticatedRoute> <SignUpPage /> </RedirectedAuthenticatedRoute>} />
      <Route path="/login" element = { <RedirectedAuthenticatedRoute> <LoginPage /> </RedirectedAuthenticatedRoute>} />
      <Route path="/verify-email" element = { <RedirectedAuthenticatedRoute> <VerificationEmailPage /> </RedirectedAuthenticatedRoute>} />
      <Route path="/forgot-password" element = { <RedirectedAuthenticatedRoute> <ForgotPasswordPage /> </RedirectedAuthenticatedRoute>} />
      <Route path="/reset-password/:token" element = { <RedirectedAuthenticatedRoute> <ResetPassword /> </RedirectedAuthenticatedRoute>} />
      <Route path="*" element = {<NotFound/> } />
    </Routes>
    </div>
  )
}

export default App
