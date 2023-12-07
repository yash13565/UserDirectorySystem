import React from 'react'

function CustomSelect(props) {
  const { text, className, handleSelect, selected } = props;
  return (
    <select value={selected} className={className} onChange={(e) => handleSelect(e.target.value)}>
      {
        text?.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
    </select>
  )
}

export default CustomSelect