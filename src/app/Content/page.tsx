import React from 'react'
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import styles from "@/app/page.module.css";
import Form from '@/components/formContent/formContent';
import ListSwipeableContent from '@/components/listSwipeableContent/listSwipeableContent';
export default function page() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<ListSwipeableContent/>
				<Form/>
			</main>
			<Footer />
		</>
	)
}
