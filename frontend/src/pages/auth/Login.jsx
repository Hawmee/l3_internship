import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Login() {

  const token = useSelector((state)=>state.token.value)
  const currentUser = useSelector((state)=>state.currentUser.value)
  return (
    <>
        <div className='h-full w-full bg-gray-200 flex flex-col justify-center items-center'>
          <div className='bg-white rounded p-4'>
              <form >
                <div>
                  <h1> {currentUser} </h1>
                </div>
                <div>
                  <label htmlFor="matricule">Matricule</label>
                  <input type="text" className='border border-gray-500' />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" className='border border-gray-500' />
                </div>
                <div>
                    <p>Don't have an account ? <NavLink to='/register' className='text-blue-400 hover:text-blue-500'>Register</NavLink></p>
                </div>
                <div>
                  <button className='bg-blue-500 text-gray-50 px-2 rounded-[8px] hover:bg-blue-600' type='button'>Log In</button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default Login