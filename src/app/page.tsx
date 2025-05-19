import styles from "./page.module.css";
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import HouseModel from '@/components/housemodel/houseModel';
import TextHome from "@/components/textHome/textHome";
export default function Home() {
  return (
    <main className={styles.page}>
      <Header />
      <HouseModel/>
      <TextHome/>
      <Footer/>
    </main>
  );
}
