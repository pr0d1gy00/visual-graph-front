import React, { useEffect, useState } from "react";
import Styles from "./css/carousel.module.css";
import {
	GetStoriesMedia,
	StoryMediaInterface,
} from "@/pages/api/StoryMedia/GetStoryMedia";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import { FiX } from "react-icons/fi";
import CarouselComponent from "./CarouselComponent";

export default function Carousel({
	setShowHistory,
}: {
	setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [media, setMedia] = useState<StoryMediaInterface[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedImage, setSelectedImage] =
		useState<StoryMediaInterface | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMedia = async () => {
			const res = await GetStoriesMedia();
			if (Array.isArray(res)) {
				setMedia(res);
				setSelectedIndex(0);
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: JSON.stringify(res.message),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#3085d6",
					width: 400,
					customClass: {
						popup: "swal-custom-height",
					},
					timer: 5000,
					timerProgressBar: true,
				});
			}
			setLoading(false);
		};
		fetchMedia();
	}, []);
	useEffect(() => {
		if (media.length > 0) {
			setSelectedImage(media[selectedIndex]);
		}
	}, [media, selectedIndex]);

	useEffect(() => {
		if (media.length === 0) return;

		const interval = setInterval(() => {
			setSelectedIndex((prevIndex) =>
				prevIndex < media.length - 1 ? prevIndex + 1 : 0
			);
		}, 30000);

		return () => clearInterval(interval);
	}, [media, selectedIndex]);
	const selectedNewImage = (
		index: number,
		images: StoryMediaInterface[],
		next = true
	) => {
		const condition = next
			? selectedIndex < images.length - 1
			: selectedIndex > 0;
		console.log(condition);
		const nextIndex = next
			? condition
				? selectedIndex + 1
				: 0
			: condition
			? selectedIndex - 1
			: images.length - 1;
		setSelectedIndex(nextIndex);
	};

	const previous = () => {
		console.log("desde previous");
		selectedNewImage(selectedIndex, media, false);
	};

	const next = () => {
		selectedNewImage(selectedIndex, media, true);
	};
	if (loading) {
		return (
			<div className={Styles.carouselContainer}>
				<div className={Styles.loader}></div>
			</div>
		);
	}
	if (media.length === 0) {
		return (
			<div className={Styles.carouselContainer}>
				<div
					className={Styles.carouselThumbnailsHeaderNoMedia}
				>
					<motion.button
						className={Styles.closeButton}
						onClick={() => {
							setShowHistory(false);
							setSelectedIndex(0);
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Close carousel"
						aria-live="polite"
						aria-atomic="true"
						aria-controls="carousel-image"
						aria-describedby="carousel-description"
					>
						<FiX
							width={30}
							height={30}
							className={Styles.iconClose}
						/>
					</motion.button>
				</div>
				<p className={Styles.noImageText}>
					No hay imágenes para mostrar.
				</p>
			</div>
		);
	}
	console.log(media)
	return (
		<motion.div
			className={Styles.carouselContainer}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				type: "spring",
				stiffness: 60,
			}}
		>
			{media.length > 0 && (
				<CarouselComponent selectedImage={selectedImage} media={media} selectedIndex={selectedIndex} setSelectedImage={setSelectedImage} setSelectedIndex={setSelectedIndex} setShowHistory={setShowHistory } previous={previous} next={next}/>
			)}

		</motion.div>
	);
}
