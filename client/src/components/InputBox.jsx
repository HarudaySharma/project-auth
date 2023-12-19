import React from 'react'

function InputBox(
    {
        labelText,
        type,
        name,
        id,
        value,
        required,
        handleInputChange,
        className,
        children,
    }
) {
    return (
        <fieldset className="flex flex-col gap-1 mb-3">
            <label htmlFor={id} className="uppercase tracking-widest">{labelText}</label>
            <input
                type={type}
                name={name}
                value={value}
                id={id}
                className={`bg-inherit p-4 outline outline-2 hover:bg-gray-100 focus:bg-white focus:shadow-2xl  ${className}`}
                required={required}
                onChange={handleInputChange}
            />
            {children}
        </fieldset>
    )
}

export default InputBox;