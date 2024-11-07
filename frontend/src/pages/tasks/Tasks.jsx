import React from 'react'
import CUTask from './cu/CUTask'
import { useSelector } from 'react-redux'

function Tasks() {

  const interns = useSelector(state=>state.stage.value)

  return (
    <>
      <CUTask data={interns} />
    </>
  )
}

export default Tasks