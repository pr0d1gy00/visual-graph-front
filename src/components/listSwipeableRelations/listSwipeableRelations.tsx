"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import Swal from "sweetalert2";
import Image from "next/image";
import Styles from "./css/listSwipeableRelations.module.css";
import {
	GetRelations,
	RelationInterface,
} from "@/pages/api/relationsContents/GetRelations";
import { DeleteRelations } from "@/pages/api/relationsContents/DeleteRelations";
import "react-swipeable-list/dist/styles.css";
import { motion } from "motion/react";

export default function ListSwipeableRelations() {
	const [relations, setRelations] = useState<RelationInterface[]>(
		[]
	);

	const handleDelete = async (id: number) => {
		const response = await DeleteRelations(id);
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
				const updatedRelations = await GetRelations();
				if (Array.isArray(updatedRelations)) {
					setRelations(updatedRelations);
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: JSON.stringify(
							updatedRelations.message
						),
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
							const filterRelations = relations.filter(
								(relations) => relations.id !== id
							);
							setRelations(filterRelations);
							setTimeout(async () => {
								const updatedRelations =
									await GetRelations();
								if (Array.isArray(updatedRelations)) {
									setRelations(updatedRelations);
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
		GetRelations().then((res) => {
			console.log(res);
			if (Array.isArray(res)) {
				setRelations(res);
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
				animate={{ opacity: 1, y: 0 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					type: "spring",
					stiffness: 60,
				}}
			>
				Administra tus Contenidos
			</motion.h2>
			<div className={Styles.relationListContainer}>
				<div className={Styles.relationListDescription}>
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
					{relations.map((content) => (
						<SwipeableListItem
							trailingActions={trailingActions(
								content.id
							)}
							key={content.id}
							swipeStartThreshold={30}
						>
							<motion.div
								key={content.id}
								className={Styles.relation}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
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
								whileInView={{ opacity: 1, y: 0 }}
							>
								<div
									key={content.id}
									className={Styles.relation}
								>
									<div
										className={
											Styles.relationInfoContainer
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
										<h3>
											Contenido:{" "}
											{
												content.parentContent
													.title
											}
										</h3>
									</div>
									<div
										className={
											Styles.relationInfoContainer
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
											Sub-contenido:{" "}
											{
												content.childContent
													.title
											}
										</p>
									</div>
									<div
										className={
											Styles.relationInfoContainer
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
											tipo contenido:{" "}
											{
												content.parentContent
													.type
											}
										</p>
									</div>
									<div
										className={
											Styles.relationInfoContainer
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
											tipo sub-contenido:{" "}
											{
												content.childContent
													.type
											}
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
