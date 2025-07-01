import React from "react";
import Styles from "./css/renderView.module.css";

import { motion } from "motion/react";
import { Content } from "@/pages/api/section/GetSectionsWithContent";
import Image from "next/image";

interface HeroProps {
	contents: Content[];
}
export default function HeroComponent({
	contents,
}: HeroProps) {
	return (
		<div className={Styles.heroContainer}>
			{contents.map((content,index)=>(
				<React.Fragment key={content.id}>
					{content.type === "image" ? null :(
						<motion.div
						initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              className={Styles.heroContent}
						>
              <p className={Styles.infoHero}>{content.body}</p>
						</motion.div>
					)}
					{content.media[0] && content.media.length > 0 && (
						<motion.div key={content.media[0]?.id ?? content.id}
              className={Styles.media}>
							<Image
	  key={content.media[0]?.id ?? content.id}
                loading="lazy"
                src={process.env.NEXT_PUBLIC_API_URL + content.media[0].url}
                alt={content.media[0].altText || "Media Image"}
                className={Styles.mediaImageHero}
                width={400}
                height={400}
							/>
						</motion.div>
					)}
				</React.Fragment>
			))}

		</div>
	);
}
