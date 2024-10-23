import React from 'react'

function MainContainer({children}) {

    const title = children[0]
    const searchContainer = children[1]
    const content = children[2]

  return (
    <>
        <div className='flex flex-col h-full '>
            {title}
            {searchContainer}
            {content}
        </div>
    </>
  )
}

export default MainContainer