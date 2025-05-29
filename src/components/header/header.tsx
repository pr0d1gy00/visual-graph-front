import Image from "next/image";
import Link from "next/link";
import Styles from "./css/sidebar.module.css";
import VisualGraphLogoHorizontal from "../../../public/visual-graph-horizontal.png";
import ArrowDesing from "../../../public/arrow-visual-graph.png";
import {FaTimes} from "react-icons/fa"; // Importa el icono de hamburguesa
import React from 'react';
import { motion } from 'motion/react';

type HeaderProps = {
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
};

const link = [
	{ name: "Home", url: "/" },
	{ name: "Sección", url: "/Section" },
	{ name: "Contenido", url: "/Content" },
	{ name: "Imagenes", url: "/Media" },
	{ name: "Crea", url: "/RelationContents" },
];

const Header = ({setIsMobile,width}:HeaderProps) => {
	return (
		<motion.header className={Styles.header}
			initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}

		>
				<>
					<div className={Styles.headerImage}>
						<Image
							src={VisualGraphLogoHorizontal}
							alt="Visual Graph Logo"
						/>
						{width<600 ? <button title="Close button"className={Styles.headerButton} onClick={() => {
						setIsMobile(false)
					}
						}>
							<FaTimes className={Styles.icon} />
						</button> : null}
					</div>
					<div className={Styles.headerLinks}>
						{link.map((link, index) => {
							return (
								<Link
									href={link.url}
									key={index}
									className={
										Styles.headerLinkContainer
									}
									onClick={() => {
										setIsMobile(false);	
									}}
								>
									{link.name}
									<Image
										src={ArrowDesing}
										alt="Arrow"
										className={Styles.arrow}
									/>
								</Link>
							);
						})}
					</div>
				</>
		</motion.header>
	);
};

export default Header;
