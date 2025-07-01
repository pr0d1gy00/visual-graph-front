"use client";
import React, { useEffect, useState } from "react";
import Styles from "./css/renderView.module.css";
import {
	GetSectionsWithContent,
	SectionInterfaceWithContent,
} from "@/pages/api/section/GetSectionsWithContent";
import { motion } from "motion/react";
import MasonryComponent from "./MasonryComponent";
import HeroComponent from "./HeroComponent";
import CardComponent from "./CardComponent";

export default function RenderView() {
	const [section, setSection] = useState<
		SectionInterfaceWithContent[]
	>([]);

	useEffect(() => {
		const fecth = async () => {
			const data = await GetSectionsWithContent();
			if (Array.isArray(data)) {
				setSection(data);
			} else {
				console.error(data.message);
			}
		};
		fecth();
	}, []);
	console.log(section);
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			whileInView={{ opacity: 1, y: 0 }}
			className={Styles.renderViewContainer}
		>
			{section.map((sec, index) => (
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					transition={{
						duration: 0.4,
						type: "spring",
						stiffness: 60,
					}}
					whileInView={{ opacity: 1, y: 0 }}
					// viewport={{ once: false, amount: 0.3 }}
					key={sec.id}
				>
					<h2 className={Styles.secTitle}>{sec.title}</h2>
					{sec.distribution === "hero" ? null : (
						<p className={Styles.secDescription}>
							{sec.description}
						</p>
					)}
					<div
						key={index}
						className={`${
							sec.distribution === "flex" ||
							sec.distribution === "flex column" ||
							sec.distribution === "grid"
								? Styles[
										sec.distribution.replace(
											" ",
											""
										)
								]
								: Styles.defaultSection
						}`}
					>
						{sec.distribution === "grid images" ? (
							<MasonryComponent section={sec} />
						) : null}
						{sec.distribution === "hero" ? (
							<HeroComponent contents={sec.contents} />
						) : (
							sec.contents.map(
								(content, contentIndex) =>
									content.type === "card" ? (
										<CardComponent
											key={contentIndex}
											content={content}
											contentIndex={
												contentIndex
											}
										/>
									) : null
							)
						)}
					</div>
				</motion.section>
			))}
		</motion.div>
	);
}
