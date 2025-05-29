import React from 'react'
import Styles from './css/input.module.css'


export default function input(inputProps:React.InputHTMLAttributes<HTMLInputElement>) {
  return (
	<input {...inputProps} className={Styles.input} />
  )
}
