import React, { ChangeEvent, SetStateAction } from 'react'

interface ICheckbox {
  checked: boolean
  setChecked: React.Dispatch<SetStateAction<boolean>>
}

const Checkbox = ({ checked, setChecked }: ICheckbox) => {
  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }

  return (
    <div className='checkbox'>
      <label className='container h-6 w-6'>
        <input onChange={handleChangeChecked} type='checkbox' className='h-6 w-6 accent-gray-50' checked={checked} />
        <span className='checkmark'></span>
      </label>
    </div>
  )
}

export default Checkbox
