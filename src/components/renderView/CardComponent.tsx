import React from "react";
import Styles from "./css/renderView.module.css";

import { motion } from "motion/react";
import Image from "next/image";
import { Content } from "@/pages/api/section/GetSectionsWithContent";

interface CardProps {
	content: Content;
	contentIndex: number;
}
export default function CardComponent({
	content,
	contentIndex,
}: CardProps) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 30,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			transition={{
				duration: 0.4,
				delay: contentIndex * 0.1,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
			}}
			key={content.id}
			className={`${Styles.content} ${
				content.type ? Styles[content.type] : ""
			}`}
		>
			{content.media && content.media.length > 0 && (
				<motion.div className={Styles.mediaOfCard}>
					{content.media.map((m, mindex) =>
						m.type === "image" ? (
							<Image
								key={mindex}
								loading="lazy"
								src={
									process.env.NEXT_PUBLIC_API_URL +
									m.url
								}
								alt={m.altText || "Media Image"}
								className={Styles.mediaImage}
								width={300}
								height={300}
							/>
						) : null
					)}
				</motion.div>
			)}

			<>
				<h3 className={Styles.cardTitle}>{content.title}</h3>
				<p className={Styles.cardInfo}>{content.body}</p>
			</>
		</motion.div>
	);
}
