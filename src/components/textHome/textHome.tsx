'use client'
import { useEffect, useState } from "react";
import Styles from "./css/textHome.module.css"
const TextHome = () => {
	const letters = '¡Transforma tu visión en realidad con Visual Graph!'
	const [visible, setVisible] = useState(0);

	useEffect(()=>{
		const interval = setInterval(()=>{
			setVisible((prev)=> {
				if(prev < letters.length){
					return prev + 1;
				}else{
					clearInterval(interval);
					return prev;
				}
			})
		},50)
	},[letters.length])
	return (
		<div className={Styles.textHomeContainer}>
			<h2>{letters.slice(0,visible)}</h2>
			<h3>{visible === letters.length ? 'No solo diseñamos, ¡damos vida a tus ideas!' : ''}</h3>

		</div>
	)
}

export default TextHome
