import Image from 'next/image';
import Link from 'next/link';
import Styles from './css/sidebar.module.css'
import VisualGraphLogoHorizontal from '../../../public/visual-graph-horizontal.png';
import ArrowDesing from '../../../public/arrow-visual-graph.png'

const link =[
	{ name: 'Home', url: '/' },
    { name: 'Sección', url: '/Section' },
    { name: 'Contenido', url: '/Content' },
    { name: 'Services', url: '/services' },

]
const header = () => {
	return (
		<header className={Styles.header}>
			<div className={Styles.headerImage}>
				<Image src={VisualGraphLogoHorizontal} alt="Visual Graph Logo"/>

			</div>
			<div className={Styles.headerLinks}>
				{link.map((link,index)=>{
					return(
						<Link href={link.url} key={index} className={Styles.headerLinkContainer}>
							{link.name}
							<Image src={ArrowDesing} alt="Arrow" className={Styles.arrow}/>

						</Link>

					)
				})}

			</div>
		</header>
	);
};

export default header;
