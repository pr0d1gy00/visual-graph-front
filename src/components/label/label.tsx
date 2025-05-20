import React from 'react'
import Styles from './css/label.module.css'
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>{
	name:string
}

export default function label({name,...labelProps}:LabelProps) {
  return (
	<label {...labelProps} className={Styles.label}>
		{name}
	</label>
  )
}
