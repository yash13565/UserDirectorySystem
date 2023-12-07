import React from 'react'

function CustomButton(props) {
  const { text, onClick, className } = props
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}

export default CustomButton