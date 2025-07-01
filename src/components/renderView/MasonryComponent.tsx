import React from "react";
import Styles from "./css/renderView.module.css";

import { motion } from "motion/react";
import { SectionInterfaceWithContent } from "@/pages/api/section/GetSectionsWithContent";

interface MasonryProps {
	section: SectionInterfaceWithContent;
}
export default function MasonryComponent({ section }: MasonryProps) {
	return (
		<motion.section
			className={Styles.gridImages}
			initial={{ opacity: 0, y: 50 }}
			transition={{
				duration: 0.4,
				type: "spring",
				stiffness: 60,
			}}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{
				section.contents.map((content) =>
					content.media.map((m) => (
						<motion.img
							key={m.id}
							src={
								process.env.NEXT_PUBLIC_API_URL +
								m.url
							}
							alt={m.altText || "Grid Image"}
							className={Styles.gridImageItem}
						/>
					))
				)
			}
		</motion.section>
	);
}
