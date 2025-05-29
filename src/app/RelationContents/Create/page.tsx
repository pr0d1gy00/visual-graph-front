import React from 'react'
import styles from "@/app/page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Form from "@/components/formRelationsContents/formRelationsContents";
export default function page() {
  return (
			<>
			<Header />
			<main className={styles.main}>
				<Form />
			</main>
			<Footer />

		</>
  )
}
