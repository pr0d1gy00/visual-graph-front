"use client";
import Styles from "./css/listSwipeableStoriesMedia.module.css";
import React from "react";
import {
	SwipeableList,
	SwipeableListItem,

} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { motion } from "motion/react";
import { GetStoriesMedia, StoryMediaInterface } from "@/pages/api/StoryMedia/GetStoryMedia";

export default function ListSwipeableStoriesMedia() {
	const [media, setMedia] = useState<StoryMediaInterface[]>([]);

	// const handleDelete = async (id: number) => {
	// 	const response = await DeleteSection(id);
	// 	if (response instanceof Response) {
	// 		if (response.ok) {
	// 			Swal.fire({
	// 				icon: "success",
	// 				title: "Eliminado",
	// 				text: "Eliminado correctamente",
	// 				confirmButtonText: "Aceptar",
	// 				confirmButtonColor: "#ffcc00",
	// 				customClass: {
	// 					popup: "swal-custom-height",
	// 				},
	// 			});
	// 			const updateMedias = await GetStoriesMedia();
	// 			if (Array.isArray(updateMedias)) {
	// 				setMedia(updateMedias);
	// 			} else {
	// 				Swal.fire({
	// 					icon: "error",
	// 					title: "Error",
	// 					text: JSON.stringify(updateMedias.message),
	// 					confirmButtonText: "Aceptar",
	// 					confirmButtonColor: "#3085d6",
	// 					width: 400,
	// 					customClass: {
	// 						popup: "swal-custom-height",
	// 					},
	// 					timer: 5000,
	// 					timerProgressBar: true,
	// 				});
	// 			}
	// 		} else {
	// 			Swal.fire({
	// 				icon: "error",
	// 				title: "Error",
	// 				text: "No se pudo eliminar",
	// 			});
	// 		}
	// 	}
	// };

	// const trailingActions = (id: number) => (
	// 	<TrailingActions>
	// 		<FaTrash
	// 			style={{
	// 				color: "white",
	// 				fontSize: "3rem",
	// 			}}
	// 		/>
	// 		<SwipeAction
	// 			destructive={true}
	// 			onClick={() => {
	// 				Swal.fire({
	// 					title: "¿Estás seguro?",
	// 					text: "	Esta acción no se puede deshacer",
	// 					icon: "warning",
	// 					showCancelButton: true,
	// 					confirmButtonText: "Eliminar",
	// 					confirmButtonColor: "#ffcc00",
	// 					cancelButtonText: "Cancelar",
	// 					customClass: {
	// 						popup: "swal-custom-height",
	// 					},
	// 				}).then(async (result) => {
	// 					if (result.isConfirmed) {
	// 						handleDelete(id);
	// 					} else {
	// 						const filterMedia = media.filter(
	// 							(medias) => medias.id !== id
	// 						);
	// 						setMedia(filterMedia);
	// 						setTimeout(async () => {
	// 							const updatedMedias =
	// 								await GetStoriesMedia();
	// 							if (Array.isArray(updatedMedias)) {
	// 								setMedia(updatedMedias);
	// 							}
	// 						}, 200);
	// 					}
	// 				});
	// 			}}
	// 		>
	// 			Delete
	// 		</SwipeAction>
	// 	</TrailingActions>
	// );
	console.log(media);
	useEffect(() => {
		GetStoriesMedia().then((res) => {
			if (Array.isArray(res)) {
				setMedia(res);
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
		});
	}, []);

	return (
		<>
			<motion.h2
				className={Styles.textContent}
				initial={{ opacity: 0, y: -30 }}
				whileInView={{ opacity: 1, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					type: "spring",
					stiffness: 60,
				}}
			>
				Administra tus Contenidos
			</motion.h2>
			<div className={Styles.mediaListContainer}>
				<div className={Styles.mediaListDescription}>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.5,
							type: "spring",
							stiffness: 60,
						}}
					>
						<p>
							Agrega, edita o elimina contenidos de tu
							visualizador.
						</p>
						<p>
							Recuerda que puedes agregar contenido a
							cada sección.
						</p>
					</motion.div>
				</div>
				<SwipeableList fullSwipe={true}>
					{media.length > 0 ? (
						media.map((mediaMap) => (
							<SwipeableListItem
								// trailingActions={trailingActions(
								// 	mediaMap.id
								// )}
								key={mediaMap.id}
								swipeStartThreshold={30}
							>
								<motion.div
									key={mediaMap.id}
									className={Styles.media}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{
										once: false,
										amount: 0.2,
									}}
									transition={{
										duration: 0.4,
										type: "spring",
										stiffness: 60,
									}}
									whileHover={{
										scale: 1.02,
										boxShadow:
											"0 8px 24px rgba(0,0,0,0.13)",
									}}
								>
									<div
										key={mediaMap.id}
										className={Styles.media}
									>
										<div
											className={
												Styles.mediaImageContainer
											}
										>
											<Image
												loading="lazy"
												src={
													process.env
														.NEXT_PUBLIC_API_URL +
													mediaMap.url
												}
												width={600}
												height={600}
												alt={
													""
												}
											/>
										</div>
										<div
											className={
												Styles.mediaInfoContainer
											}
										>
											<div
												className={
													Styles.mediaInfoContainer
												}
											>
												<h3>
													{mediaMap.story.title}
												</h3>
											</div>
											<div
												className={
													Styles.mediaInfoContainer
												}
											>
												<p>
													<span>
														historia
														asociada:
													</span>
												</p>
												<p
													key={
														mediaMap
															.story
															.id
													}
												>
													{
														mediaMap
															.story
															.title
													}{" "}
												</p>
												<p
													key={
														mediaMap
															.story
															.id
													}
												>
													{
														mediaMap
															.story
															.createdAt
													}{" "}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							</SwipeableListItem>
						))
					) : (
						<motion.div
							className={Styles.noMedia}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								type: "spring",
								stiffness: 60,
							}}
						>
							<p>No hay medias disponibles</p>
						</motion.div>
					)}
				</SwipeableList>
			</div>
		</>
	);
}
