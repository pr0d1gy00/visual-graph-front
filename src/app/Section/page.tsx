"use client";
import styles from "@/app/page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ListSwipeable from "@/components/ListSwipeable/ListSwipeable";


export default function Page() {

	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.createSection}>
					<button className={styles.createSectionButton} onClick={() => window.location.href = "/Section/Create"}>
						Crear Sección
					</button>
				</div>
				<ListSwipeable/>
			</main>
			<Footer />
		</>
	);
}
