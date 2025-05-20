import Form from '@/components/formSection/form'
import styles from "@/app/page.module.css";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer'
export default function page(){
  return (
	<main className={styles.main}>
		<Form/>
		<Footer/>
	</main>
  )
}
