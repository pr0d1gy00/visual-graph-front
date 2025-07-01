import React, { useState } from 'react'
import { motion } from 'motion/react';
import Styles from './css/renderView.module.css'
import Image from 'next/image';

export default function Carousel() {
	const [element,setElement]=useState<unknown[]>([]);
	const [selectedIndex,setSelectedIndex]=useState(0);
	const [selectedElement,setSelectedElement]=useState(null);
	const selectNewElement= (index:number,element:unknown[],next=true)=>{
		const condition = next ? selectedIndex < element.length -1 : selectedIndex > 0;

		const nextIndex = next ? condition ? selectedIndex +1 : 0 : condition ? selectedIndex -1 : element.length -1
		setSelectedIndex(nextIndex);
	}
	const previous = ()=>{
		selectNewElement(selectedIndex,element,false)
	}
	const next = ()=>{
		selectNewElement(selectedIndex,element,true)
	}
	console.log(setElement,selectedElement,setSelectedElement,previous,next)

	return (
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				type: "spring",
				stiffness: 60,
			}}
			className={Styles.carouselContainer}
		>

			<motion.button></motion.button>
			<motion.div>
				<Image
					src={`${process.env.NEXT_PUBLIC_API_URL ?? ''}${!element[selectedIndex]}`}
					alt="Carousel Image"
					className={Styles.carouselImage}
					width={500}
					height={500}

				/>
			</motion.div>
			<motion.button></motion.button>
		</motion.div>
	)
}
