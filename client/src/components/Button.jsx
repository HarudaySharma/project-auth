import React from 'react'

function Button({
    formBtn,
    type,
    value,
    disabled,
    className,
    handleButtonClick
}) {


  return (
    formBtn ? 
    <input type={type} value={value} disabled={disabled} 
    className={className} />
    : <button type={type} value={value} disabled={disabled} onClick={handleButtonClick} className={className}>
        {value}
    </button>
  )
}

export default Button;