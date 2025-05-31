"use client";
import Header from "@/components/header/header";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Styles from "./css/clientelayout.module.css";
import { FaBars } from "react-icons/fa";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { width } = useScreenSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (width < 600) setIsMobile(false);
	}, [width]);

	if (!isMounted) {
		// Opcional: puedes devolver un loader o null
		return null;
	}

	return (
		<div className={Styles.layoutWrapper}>
			{/* Header fijo */}
			{(width >= 900 || isMobile) && (
				<Header setIsMobile={setIsMobile} width={width} />
			)}
			{width < 900 && !isMobile && (
				<div className={Styles.mobileButtonContainer}>
					<motion.button
						className={Styles.mobileButton}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						transition={{
							type: "spring",
							stiffness: 300,
						}}
						onClick={() => setIsMobile(!isMobile)}
					>
						<FaBars className={Styles.icon} />
					</motion.button>
				</div>
			)}
			<div className={Styles.mainContent}>{children}</div>
		</div>
	);
}
