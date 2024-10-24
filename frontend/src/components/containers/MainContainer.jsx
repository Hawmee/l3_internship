import React from 'react'

function MainContainer({children}) {

    const title = children[0]
    const searchContainer = children[1]
    const content = children[2]

  return (
    <>
        <div className='flex flex-col h-full '>
            <div>
              {title}
            </div>
            <div>{searchContainer}</div>
            <div className='h-full'>{content}</div>
        </div>
    </>
  )
}

export default MainContainer