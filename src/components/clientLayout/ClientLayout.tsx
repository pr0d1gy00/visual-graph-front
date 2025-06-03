"use client";
import Header from "@/components/header/header";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Styles from "./css/clientelayout.module.css";
import { FaBars } from "react-icons/fa";
import Carousel from "../carousel/Carousel";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { width } = useScreenSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [showHistory, setShowHistory] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	useEffect(() => {
		if (showHistory) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [showHistory]);
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
				<Header
					setIsMobile={setIsMobile}
					width={width}
					setShowHistory={setShowHistory}
				/>
			)}
			{width < 900 && !isMobile && (
				<div
					className={
						showHistory
							? Styles.mobileButtonContainerHistory
							: Styles.mobileButtonContainer
					}
				>
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
			{showHistory && (
				<Carousel
					setShowHistory={setShowHistory}

				/>
			)}
		</div>
	);
}
