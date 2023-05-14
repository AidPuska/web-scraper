import React from 'react'

const Results = ({result, index}) => {
  return (
    <div key={index} className='text-white m-5 border p-1 bg-black/50 text-xs'>
       <p>{`{`}</p>
       <p></p>
       <p className='ml-5'>name: {result.name},</p>
       <p className='ml-5'>price: {result.price},</p>
       <a target='_blank' href={result.imageItem} className='ml-5 underline'>picture: {result.imageItem}</a>
       <p>{`}`}</p>
    </div>
  )
}

export default Results