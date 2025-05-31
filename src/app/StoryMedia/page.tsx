"use client";
import React from "react";
import styles from "@/app/page.module.css";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import ListSwipeableStoriesMedia from "@/components/listSwipeableStoriesMedia/lisSwipeableStoriesMedia";

export default function Page() {
	  const router = useRouter();

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
							(router.push("/StoryMedia/Create"))
						}
					>
						Subir Media
					</motion.button>
				</div>
				<ListSwipeableStoriesMedia/>
			</main>
		</>
	);
}
