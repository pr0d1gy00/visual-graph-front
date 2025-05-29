"use client";
import Footer from "@/components/footer/footer";
import styles from "@/app/page.module.css";
import ListSwipeableContent from "@/components/listSwipeableContent/listSwipeableContent";
import { motion } from "motion/react";
export default function page() {
	return (
		<>
			<main className={styles.main}>
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
						onClick={() =>
							(window.location.href = "/Content/Create")
						}
					>
						Crear Contenido
					</motion.button>
				</div>
				<ListSwipeableContent />
			</main>
		</>
	);
}
