import React from 'react'
import Styles from './css/footer.module.css'
import Image from 'next/image'
import VisualGraphLogoFooter from '../../../public/visual-graph-horizontal.png'
import {FaInstagram, FaFacebookF, FaLinkedinIn} from 'react-icons/fa'
import Link from 'next/link'
const footer = () => {
	return (
		<footer className={Styles.footer}>
			<div className={Styles.footerContainer}>
				<div className={Styles.footerImageContainer}>
					<Image src={VisualGraphLogoFooter} alt='logo Visual Graph Footer' />
				</div>
				<div className={Styles.footerSocialMedia}>
					<Link href={'https://www.instagram.com/visualgraphagency/'}>
						<FaInstagram size={32} color='#000000'/>
					</Link>
					<Link href={'https://www.facebook.com/profile.php?id=61574412012253'}>
						<FaFacebookF size={32} color='#000000'/>
					</Link>
					<Link href={'/'}>
						<FaLinkedinIn size={32} color='#000000'/>
					</Link>
				</div>
				<div className={Styles.footerTextContainer}>
					<p className={Styles.footerText}>Visual Graph Graphic Designer</p>
					<p className={Styles.footerText}>All rights reserved © 2023</p>
				</div>
			</div>
		</footer>
	)
}

export default footer
