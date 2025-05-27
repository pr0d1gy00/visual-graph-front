"use client";
import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import styles from '@/app/page.module.css'
import ListSwipeableMedia from '../../components/listSwipeableMedia/listSwipeableMedia';
export default function page() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.createSection}>
					<button className={styles.createSectionButton} onClick={() => window.location.href = "/Media/Create"}>
						Subir Media
					</button>
				</div>
				<ListSwipeableMedia/>
			</main>
			<Footer />
		</>
	)
}
