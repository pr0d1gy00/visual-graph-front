import React from 'react'
import Styles from './css/input.module.css'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function input(inputProps:inputProps) {
  return (
	<input {...inputProps} className={Styles.input} />
  )
}
