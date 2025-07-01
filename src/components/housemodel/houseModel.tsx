"use client";

import Styles from "./css/houseModel.module.css";

import Image from "next/image";
import Banner from '../../../public/background.jpg'
import PersonBanner from '../../../public/WhatsApp Image 2025-06-05 at 5.30.28 PM.png'
import { useEffect, useState } from "react";
export default function HouseModel() {
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
		<div className={Styles.sceneContainer}>
			<Image src={Banner} width={1000} height={1000} alt="banner" className={Styles.banner}/>
			<div className={Styles.textHomeContainer}>
<div className={Styles.textHome}>
	<h2>{letters.slice(0,visible)}</h2>
				<h3>{visible === letters.length ? 'Imagina, sueña y crea!' : ''}</h3>

</div>
				<Image src={PersonBanner} width={1000} height={1000} alt="banner" className={Styles.personBanner}/>

			</div>
		</div>
	);
}
