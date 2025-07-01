import styles from "./page.module.css";
import HouseModel from '@/components/housemodel/houseModel';
import RenderView from "@/components/renderView/renderView";
export default function Home() {
  return (
    <>

      <main className={styles.page}>
      <HouseModel/>
      <RenderView/>
      </main>
    </>


  );
}
