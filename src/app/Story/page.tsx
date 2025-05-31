'use client'
import React from 'react'
import Styles from '@/app/page.module.css';
import ListSwipeableStory from '@/components/listSwipeableStory/listSwipeableStory';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
export default function Page() {
	const router = useRouter();
	return (
				<>
			<main className={Styles.main}>
				<div className={Styles.createSection}>
					<motion.button
						className={Styles.createSectionButton}
						whileHover={{
							scale: 1.07,
							boxShadow:
								"0 4px 16px rgba(255,204,1,0.25)",
						}}
						whileTap={{ scale: 0.97 }}
						transition={{
							type: "spring",
							stiffness: 300,
						}}
						onClick={() => router.push( "/Story/Create")}>
						Crear Historia
					</motion.button>
				</div>
				<ListSwipeableStory/>
			</main>
		</>
	)
}
