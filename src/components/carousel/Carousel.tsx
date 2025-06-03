import React, { useEffect, useState } from "react";
import Styles from "./css/carousel.module.css";
import {
	GetStoriesMedia,
	StoryMediaInterface,
} from "@/pages/api/StoryMedia/GetStoryMedia";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import ImageHeaderCarousel from "../../../public/visual-graph-horizontal.png";

export default function Carousel({setShowHistory}: { setShowHistory: React.Dispatch<React.SetStateAction<boolean>>}) {
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
		}, 15000);

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
		setSelectedImage(images[nextIndex]);
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
				<div className={Styles.carouselThumbnailsHeaderNoMedia}>
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
				<p className={Styles.noImageText}>No hay imágenes para mostrar.</p>
			</div>
		);
	}
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
			{media.length === 0 && (
				<motion.div
					className={Styles.noMediaMessage}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 60,
					}}
				>
					<motion.div
					className={Styles.carouselThumbnails}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 60,
					}}
				>
					<div className={Styles.carouselThumbnailsHeader}>
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
						<Image
							src={ImageHeaderCarousel}
							alt="Visual Graph Logo"
							width={100}
							height={100}
							className={Styles.logoImage}
						/>
					</div>
							<motion.h2
				className={Styles.carouselTitle}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					duration: 0.5,
					type: "spring",
					stiffness: 60,
				}}
			>
				Todas las historias
			</motion.h2>
					{media.map((image, index) => (
						<motion.button
							key={image.id}
							className={`${Styles.carouselThumbnail} ${
								selectedIndex === index
									? Styles.selected
									: ""
							}`}
							onClick={() => {
								setSelectedIndex(index);
								setSelectedImage(image);
							}}
							whileTap={{ scale: 0.9 }}
							aria-label={`Select image ${index + 1}`}
							aria-live="polite"
							aria-atomic="true"
							aria-controls="carousel-image"
							aria-describedby="carousel-description"
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
								alt={`Thumbnail ${index + 1}`}
								width={100}
								height={100}
								className={Styles.thumbnailImage}
							/>
							<div className={Styles.thumbnailInfo}>
								<p className={Styles.thumbnailTitle}>
									{image.story.title}
								</p>
								<p className={Styles.thumbnailDate}>
									{new Date(image.story.createdAt).toLocaleDateString(
										"es-ES",
										{
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										}
									)}
								</p>
							</div>
						</motion.button>
					))}
				</motion.div>
					<p>No hay imágenes para mostrar.</p>
				</motion.div>
			)}


			<motion.div
				className={Styles.carouselImageContainer}
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -50 }}
				transition={{
					duration: 0.5,
					type: "spring",
					stiffness: 60,
				}}
				style={{ width: "100%", height: "auto" }}
			>



				<motion.div
					className={Styles.carouselThumbnails}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 60,
					}}
				>
					<div className={Styles.carouselThumbnailsHeader}>
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
						<Image
							src={ImageHeaderCarousel}
							alt="Visual Graph Logo"
							width={100}
							height={100}
							className={Styles.logoImage}
						/>
					</div>
							<motion.h2
				className={Styles.carouselTitle}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					duration: 0.5,
					type: "spring",
					stiffness: 60,
				}}
			>
				Todas las historias
			</motion.h2>
					{media.map((image, index) => (
						<motion.button
							key={image.id}
							className={`${Styles.carouselThumbnail} ${
								selectedIndex === index
									? Styles.selected
									: ""
							}`}
							onClick={() => {
								setSelectedIndex(index);
								setSelectedImage(image);
							}}
							whileTap={{ scale: 0.9 }}
							aria-label={`Select image ${index + 1}`}
							aria-live="polite"
							aria-atomic="true"
							aria-controls="carousel-image"
							aria-describedby="carousel-description"
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
								alt={`Thumbnail ${index + 1}`}
								width={100}
								height={100}
								className={Styles.thumbnailImage}
							/>
							<div className={Styles.thumbnailInfo}>
								<p className={Styles.thumbnailTitle}>
									{image.story.title}
								</p>
								<p className={Styles.thumbnailDate}>
									{new Date(image.story.createdAt).toLocaleDateString(
										"es-ES",
										{
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										}
									)}
								</p>
							</div>
						</motion.button>
					))}
				</motion.div>

			<div>
					<div className={Styles.carouselImageWrapper}>
						<motion.button
							className={Styles.carouselButtonLeft}
							onClick={previous}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							aria-label="Previous image"
							aria-live="polite"
							aria-atomic="true"
							aria-controls="carousel-image"
							aria-describedby="carousel-description"
						>
							<FiChevronLeft
								width={60}
								height={60}
								className={Styles.iconArrow}
							/>
						</motion.button>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${selectedImage?.url}`}
							loading="lazy"
							alt="carousel"
							width={500}
							height={500}
							className={Styles.carouselImage}
						/>

						<motion.button
							className={Styles.carouselButtonRight}
							onClick={next}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							aria-label="Previous image"
							aria-live="polite"
							aria-atomic="true"
							aria-controls="carousel-image"
							aria-describedby="carousel-description"
						>
							<FiChevronRight
								width={60}
								height={60}
								className={Styles.iconArrow}
							/>
						</motion.button>
					</div>

					<motion.div
						className={Styles.carouselDescription}
						id="carousel-description"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{
							duration: 0.5,

							type: "spring",
							stiffness: 60,
						}}
					>
						<p className={Styles.carouselDescriptionText}>
							{selectedImage?.story.title}
						</p>
					</motion.div>
			</div>


			</motion.div>
		</motion.div>
	);
}
