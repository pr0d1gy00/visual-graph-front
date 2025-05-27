"use client";
import React from 'react'
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import styles from "@/app/page.module.css";
import ListSwipeableContent from '@/components/listSwipeableContent/listSwipeableContent';
export default function page() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.createSection}>
					<button className={styles.createSectionButton} onClick={() => window.location.href = "/Content/Create"}>
						Crear Sección
					</button>
				</div>
				<ListSwipeableContent/>
			</main>
			<Footer />
		</>
	)
}
