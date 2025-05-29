"use client";
import React from "react";
import Footer from "@/components/footer/footer";
import styles from "@/app/page.module.css";
import ListSwipeableMedia from "../../components/listSwipeableMedia/listSwipeableMedia";
import { motion } from "motion/react";
export default function page() {
	return (
		<>
			<main className={styles.main}>
				<div className={styles.createSection}>
					<motion.button
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
						className={styles.createSectionButton}
						onClick={() =>
							(window.location.href = "/Media/Create")
						}
					>
						Subir Media
					</motion.button>
				</div>
				<ListSwipeableMedia />
			</main>
		</>
	);
}
