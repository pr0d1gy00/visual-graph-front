'use client'
import React, {Dispatch} from 'react'
import Styles from './css/carousel.module.css'
import { motion } from "motion/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import ImageHeaderCarousel from "../../../public/visual-graph-horizontal.png";
import { StoryMediaInterface } from '@/pages/api/StoryMedia/GetStoryMedia';

interface CarouselProps {
	media: StoryMediaInterface[]
	setShowHistory: Dispatch<React.SetStateAction<boolean>>;
	setSelectedIndex: Dispatch<React.SetStateAction<number>>;
	setSelectedImage: Dispatch<React.SetStateAction<StoryMediaInterface | null>>;
	selectedIndex: number;
	selectedImage: StoryMediaInterface | null;
	previous: () => void;
	next: () => void;
}

export default function CarouselComponent({media,setShowHistory,setSelectedIndex,setSelectedImage,selectedImage,selectedIndex,previous,next}: CarouselProps) {
	console.log(selectedImage)

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
						<div
							className={
								Styles.carouselThumbnailsHeader
							}
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
								className={`${
									Styles.carouselThumbnail
								} ${
									selectedIndex === index
										? Styles.selected
										: ""
								}`}
								onClick={() => {
									setSelectedIndex(index);
									setSelectedImage(image);
								}}
								whileTap={{ scale: 0.9 }}
								aria-label={`Select image ${
									index + 1
								}`}
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
									<p
										className={
											Styles.thumbnailTitle
										}
									>
										{image.story.title}
									</p>
									<p
										className={
											Styles.thumbnailDate
										}
									>
										{new Date(
											image.story.createdAt
										).toLocaleDateString(
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
									{new Date(
										image.story.createdAt
									).toLocaleDateString("es-ES", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									})}
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
						{selectedImage?.url && (
  <Image
    src={`${process.env.NEXT_PUBLIC_API_URL}${selectedImage.url.startsWith("/") ? selectedImage.url : "/" + selectedImage.url}`}
    alt="carousel"
    width={500}
    height={500}
    className={Styles.carouselImage}
  />
)}

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
	)
}
