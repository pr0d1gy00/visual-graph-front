"use client";
import Styles from './css/listSwipeableMedia.module.css';
import React from "react";
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useEffect, useState } from "react";
import { GetMedia, MediaInterface } from "@/pages/api/media/GetMedia";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { DeleteSection } from "@/pages/api/section/DeleteSection";
import Image from "next/image";
export default function ListSwipeableMedia() {
	const [media, setMedia] = useState<MediaInterface[]>([]);

	const handleDelete = async (id: number) => {
		const response = await DeleteSection(id);
		if (response instanceof Response) {
			if (response.ok) {
				Swal.fire({
					icon: "success",
					title: "Eliminado",
					text: "Eliminado correctamente",
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
					customClass: {
						popup: "swal-custom-height",
					},
				});
				const updateMedias = await GetMedia();
				if (Array.isArray(updateMedias)) {
					setMedia(updateMedias);
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: JSON.stringify(updateMedias.message),
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
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "No se pudo eliminar",
				});
			}
		}
	};

	const trailingActions = (id: number) => (
		<TrailingActions>
			<FaTrash
				style={{
					color: "white",
					fontSize: "3rem",
				}}
			/>
			<SwipeAction
				destructive={true}
				onClick={() => {
					Swal.fire({
						title: "¿Estás seguro?",
						text: "	Esta acción no se puede deshacer",
						icon: "warning",
						showCancelButton: true,
						confirmButtonText: "Eliminar",
						confirmButtonColor: "#ffcc00",
						cancelButtonText: "Cancelar",
						customClass: {
							popup: "swal-custom-height",
						},
					}).then(async (result) => {
						if (result.isConfirmed) {
							handleDelete(id);
						} else {
							const filterMedia= media.filter(
								(medias) => medias.id !== id
							);
							setMedia(filterMedia);
							setTimeout(async () => {
								const updatedMedias =
									await GetMedia();
								if (Array.isArray(updatedMedias)) {
									setMedia(updatedMedias);
								}
							}, 200);
						}
					});
				}}
			>
				Delete
			</SwipeAction>
		</TrailingActions>
	);
	useEffect(() => {
		GetMedia().then((res) => {
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
			<h2 className={Styles.textContent}>
				Administra tus Contenidos
			</h2>
			<div className={Styles.mediaListContainer}>
				<div className={Styles.mediaListDescription}>
					<p>
						Agrega, edita o elimina contenidos de tu
						visualizador.
					</p>
					<p>
						Recuerda que puedes agregar contenido a cada
						sección.
					</p>
				</div>
				<SwipeableList fullSwipe={true}>
					{media.map((mediaMap) => (
						<SwipeableListItem
							trailingActions={trailingActions(
								mediaMap.id
							)}
							key={mediaMap.id}
							swipeStartThreshold={30}
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
									<Image src={process.env.NEXT_PUBLIC_API_URL + mediaMap.url} width={600} height={600} alt={mediaMap.altText ?? ''}/>
								</div>
								<div className={Styles.mediaInfoContainer}>
									<div
										className={
											Styles.mediaInfoContainer
										}
									>
										<h3>
											Titulo:{" "}
											{mediaMap.altText}
										</h3>
									</div>
									<div
										className={
											Styles.mediaInfoContainer
										}
									>
										<p><span>Contenido asociado:</span></p>
										{mediaMap.content.length >= 0 ? mediaMap.content?.map((content,index)=>{
											return (
												<p key={index}>
													{content.title}{" "}
												</p>
											);
										})
										: <p>No hay contenido asociado</p>}

									</div>
								</div>

							</div>
						</SwipeableListItem>
					))}
				</SwipeableList>
			</div>
		</>
	);
}
