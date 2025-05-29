'use client'
import React from 'react'
import Styles from '@/app/page.module.css'
import Footer from '@/components/footer/footer'
import ListSwipeableRelations from '@/components/listSwipeableRelations/listSwipeableRelations'
import styles from '@/app/page.module.css'
import { motion } from 'motion/react'
export default function page() {
	return (
		<>
			<main className={Styles.main}>
				<div className={styles.createSection}>
					<motion.button
						className={styles.createSectionButton}
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
						onClick={() => window.location.href = "/RelationContents/Create"}>
						Crear Relación
					</motion.button>
				</div>
				<ListSwipeableRelations />
			</main>
		</>

	)
}
