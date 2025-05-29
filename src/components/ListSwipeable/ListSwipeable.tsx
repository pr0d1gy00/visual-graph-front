"use client";
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useEffect, useState } from "react";
import { GetSections } from "@/pages/api/section/GetSections";
import { SectionInterface } from "@/components/formContent/formContent";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import styles from "./css/listSwipeable.module.css";
import { DeleteSection } from "@/pages/api/section/DeleteSection";
import Image from "next/image";
import { motion } from "motion/react";

export default function ListSwipeable() {
	const [sections, setSections] = useState<SectionInterface[]>([]);

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
				const updatedSections = await GetSections();
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
		<TrailingActions
		>
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
									await GetSections();
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
		GetSections().then((res) => {
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
				className={styles.textSection}
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					type: "spring",
					stiffness: 60,
				}}
				whileInView={{ opacity: 1, y: 0 }}
			>
				Administra tus secciones
			</motion.h2>
			<div className={styles.sectionListContainer}>
				<div className={styles.sectionListDescription}>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.5,
							type: "spring",
							stiffness: 60,
						}}
					>
						<p>
							Agrega, edita o elimina secciones de tu
							visualizador.
						</p>
						<p>
							Recuerda que puedes agregar contenido a
							cada sección.
						</p>
					</motion.div>
				</div>
				<SwipeableList fullSwipe={true}>
					{sections.map((section) => (
						<SwipeableListItem
							trailingActions={trailingActions(
								section.id
							)}
							key={section.id}
							swipeStartThreshold={30}
						>
							<motion.div
								key={section.id}
								className={styles.section}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									type: "spring",
									stiffness: 60,
								}}
								whileInView={{ opacity: 1, y: 0 }}
								whileHover={{
									scale: 1.02,
									boxShadow:
										"0 8px 24px rgba(0,0,0,0.13)",
								}}
							>
								<div
									key={section.id}
									className={styles.section}
								>
									<div
										className={
											styles.sectionInfoContainer
										}
									>
										<Image
											className={
												styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/2800039-Photoroom.png"
											alt="icon Title"
										/>
										<h3>
											Titulo: {section.title}
										</h3>
									</div>
									<div
										className={
											styles.sectionInfoContainer
										}
									>
										<Image
											className={
												styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/images-Photoroom.png"
											alt="icon Description"
										/>

										<p>
											Descripción:{" "}
											{section.description}
										</p>
									</div>
									<div
										className={
											styles.sectionInfoContainer
										}
									>
										<Image
											className={
												styles.iconSectionList
											}
											width={"200"}
											height={"200"}
											src="/ChatGPT Image 23 may 2025, 01_22_33 p.m.-Photoroom.png"
											alt="Icon Description"
										/>
										<p>
											Distribución:{" "}
											{section.distribution}
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
