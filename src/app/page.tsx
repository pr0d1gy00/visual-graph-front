import styles from "./page.module.css";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import HouseModel from '@/components/housemodel/houseModel';
import TextHome from "@/components/textHome/textHome";
export default function Home() {
  return (
    <>
          <Header />

      <main className={styles.page}>
      <HouseModel/>
      <TextHome/>
    </main>
    <Footer/>
    </>


  );
}
