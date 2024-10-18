import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './features/currentUser'


function App({children}) {
  const [count, setCount] = useState(12)
  const [value, setValue] = useState('user lessy e')
  const dispatch = useDispatch()
  
  const currentUser = useSelector((state)=>state.currentUser.value)

  useEffect(()=>{
    dispatch(setCurrentUser(value))
  } , [])

  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}

export default App
