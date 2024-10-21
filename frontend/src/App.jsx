import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setBackendUrl } from './features/urlBackend'
import { setToastConfig } from './features/toastConfig'
import axios from 'axios'
import { setCurrentUser } from './features/currentUser'


function App({children}) {

  const backUrl = import.meta.env.VITE_BACKEND_URL
  const dispatch = useDispatch()

  const cookieHandling = async()=>{
    const cookie= await axios.get(`${backUrl}/cookie`  , {withCredentials:true})
    const current_user = cookie.data
    dispatch(setCurrentUser(current_user))
    console.log(current_user);
    
  }

  useEffect(()=>{
    const toastConfig = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
    
    cookieHandling()
    dispatch(setBackendUrl(backUrl))
    dispatch(setToastConfig(toastConfig))
  } , [])

  return (
    <>
      <div>
        {children}
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </div>
    </>
  )
}

export default App
