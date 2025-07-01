"use client";
import React from "react";
import Styles from "./css/listSwipeableContent.module.css";
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useEffect, useState } from "react";
import { GetContent } from "@/pages/api/content/GetContent";
import { ContentDataInterface } from "@/components/formContent/formContent";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { motion } from "motion/react"
import { DeleteContent } from "@/pages/api/content/DeleteContent";



export default function ListSwipeableContent() {
	const [sections, setSections] = useState<ContentDataInterface[]>([]);

	const handleDelete = async (id: number) => {
		const response = await DeleteContent(id);
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
				const updatedSections = await GetContent();
				if (Array.isArray(updatedSections)) {
					setSections(updatedSections);
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: JSON.stringify(updatedSections.message),
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
							const filterSections = sections.filter(
								(sections) => sections.id !== id
							);
							setSections(filterSections);
							setTimeout(async () => {
								const updatedSections =
									await GetContent();
								if (Array.isArray(updatedSections)) {
									setSections(updatedSections);
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
		GetContent().then((res) => {
			console.log(res)
			if (Array.isArray(res)) {
				setSections(res);
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
				initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, type: "spring", stiffness: 60 }}>
				Administra tus Contenidos
			</motion.h2>
			<div className={Styles.contentListContainer}>
				<div className={Styles.contentListDescription}>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
					>
						<p>
							Agrega, edita o elimina contenidos de tu
							visualizador.
						</p>
						<p>
							Recuerda que puedes agregar contenido a cada
							sección.
						</p>
					</motion.div>
				</div>
				<SwipeableList fullSwipe={true}>
					{sections.map((content) => (
						<SwipeableListItem
							trailingActions={trailingActions(
								content.id
							)}
							key={content.id}
							swipeStartThreshold={30}
						>
							<motion.div
								key={content.id}
								className={Styles.content}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, type: "spring", stiffness: 60 }}
								whileInView={{ opacity: 1, y: 0 }}
								whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.13)" }}
							>
								<div
									key={content.id}
									className={Styles.content}
								>
									<div
										className={
											Styles.contentInfoContainer
										}
									>
										<Image
											className={
												Styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/2800039-Photoroom.png"
											alt="icon Title"
										/>
										<h3>Titulo: {content.title}</h3>
									</div>
									<div
										className={
											Styles.contentInfoContainer
										}
									>
										<Image
											className={
												Styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/images-Photoroom.png"
											alt="icon Description"
										/>

										<p>
											Descripción:{" "}
											{content.body}
										</p>
									</div>
									<div
										className={
											Styles.contentInfoContainer
										}
									>
										<Image
											className={
												Styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/ChatGPT Image 23 may 2025, 01_22_33 p.m.-Photoroom.png"
											alt="Icon Description"
										/>
										<p>
											Distribución:{" "}
											{content.type}
										</p>
									</div>
								</div>
							</motion.div>
						</SwipeableListItem>
					))}
				</SwipeableList>
			</div>
		</>
	);
}
