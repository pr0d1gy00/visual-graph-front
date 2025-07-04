'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import Styles from '@/app/page.module.css'
import ListSwipeableRelations from '@/components/listSwipeableRelations/listSwipeableRelations'
import styles from '@/app/page.module.css'
import { motion } from 'motion/react'
export default function Page() {
	const router = useRouter();

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
						onClick={() => router.push( "/RelationContents/Create")}>
						Crear Relación
					</motion.button>
				</div>
				<ListSwipeableRelations />
			</main>
		</>

	)
}
