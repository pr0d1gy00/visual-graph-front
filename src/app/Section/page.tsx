"use client";
import styles from "@/app/page.module.css";
import ListSwipeable from "@/components/ListSwipeable/ListSwipeable";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
						 onClick={() => router.push( "/Section/Create")}>
						Crear Sección
					</motion.button>
				</div>
				<ListSwipeable/>
			</main>
		</>
	);
}
