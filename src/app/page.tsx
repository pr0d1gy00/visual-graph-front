import styles from "./page.module.css";
import HouseModel from '@/components/housemodel/houseModel';
import TextHome from "@/components/textHome/textHome";
export default function Home() {
  return (
    <>

      <main className={styles.page}>
      <HouseModel/>
      <TextHome/>
      </main>
    </>


  );
}
