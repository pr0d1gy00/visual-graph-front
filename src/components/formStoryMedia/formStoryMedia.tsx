"use client";
import React, { useEffect, useState } from "react";
import Styles from "../formMedia/css/formMedia.module.css";
import Input from "@/components/inputs/input";
import Label from "@/components/label/label";
import Swal from "sweetalert2";
import { CreateMedia } from "@/pages/api/StoryMedia/CreateMedia";
import Image from "next/image";
import { motion } from "motion/react";
import { GetStories, StoriesInterface } from "@/pages/api/story/GetStories";

const inputs = [
	{
		label: "Media",
		type: "file",
		name: "image",
		id: "image",
	},
	{
		label: "Tipo de media",
		type: "select",
		name: "type",
		id: "type",
		options: [
			{ name: "Imagen", value: "image" },
			{ name: "Video", value: "video" },
		],
	},
	{
		label: "Historia",
		type: "select",
		name: "storyId",
		id: "storyId",
	},
];
export interface formValueInterface {
	image: string;
	type: string;
	storyId: string;
}
export default function FormStoryMedia() {
	const [formValues, setFormValues] = useState<formValueInterface>({
		image: "",
		type: "",
		storyId: "",
	});
	const [stories, setStories] = useState<StoriesInterface[]>(
		[]
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	console.log(formValues)
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const response = await CreateMedia(formValues);
		if (response instanceof Response) {
			const result = await response.json();
			if (response.status === 201 || response.status === 200) {
				Swal.fire({
					icon: "success",
					title: "Contenido creado",
					text: JSON.stringify(
						`${result.message}. Ve a Media para agregarle imagenes!`
					),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
					width: 400,
					customClass: {
						popup: "swal-custom-height",
					},
					timerProgressBar: true,
				});
				setFormValues({
					image: "",
					type: "",
					storyId: "",
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text:
						typeof result.message === "string"
							? result.message
							: JSON.stringify(result.message),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
					width: 400,
					customClass: {
						popup: "swal-custom-height",
					},
					timerProgressBar: true,
				});
			}
		}
	};

	useEffect(() => {
		GetStories().then((res) => {
			if (Array.isArray(res)) {
				setStories(res);
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: JSON.stringify(res.message),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
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
		<div className={Styles.formContainer}>
			<motion.h2
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3, delay: 0.1 }}
				className={Styles.formMediaText}
			>
				Añadele imagenes a tus historias
			</motion.h2>
			<form
				action="POST"
				encType="multipart/form-data"
				className={Styles.formMedia}
				onSubmit={handleSubmit}
			>
				<div className={Styles.formMediaInputsContainer}>
					{inputs.map((input, index) => {
						const name =
							input.name as keyof formValueInterface;
						return input.type !== "select" ? (
							<motion.div
								key={index}
								className={Styles.containerInput}
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -20 }}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
								}}
							>
								<Label
									htmlFor={input.id}
									className={Styles.labelInput}
									name={input.label}
								/>
								<Input
									type={input.type}
									name={input.name}
									id={input.id}
									placeholder={input.label}
									{...(input.name === "image"
										? {
												accept: "image/*",
												onChange: (e) => {
													const file =
														e.target
															.files?.[0];
													if (file) {
														const reader =
															new FileReader();
														reader.onload =
															(
																event
															) => {
																setFormValues(
																	{
																		...formValues,
																		image: event
																			.target
																			?.result as string,
																	}
																);
															};
														reader.readAsDataURL(
															file
														);
													}
												},
										  }
										: {
												value: formValues[
													name
												] as
													| string
													| number
													| undefined,
												onChange:
													handleChange,
										  })}
								/>
							</motion.div>
						) : (
							<motion.div
								className={Styles.containerSelect}
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -20 }}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
								}}
							>
								<Label
									htmlFor={input.id}
									className={Styles.labelSelect}
									name={input.label}
								/>
								<motion.select
									animate={{ opacity: 1, y: 0 }}
									initial={{ opacity: 0, y: -20 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
									title={input.name}
									name={input.name}
									id={input.id}
									className={Styles.select}
									onChange={handleChange}
									value={
										formValues[
											input.name as keyof typeof formValues
										] as string
									}
								>
									<option value="">
										-- Selecciona una opción --
									</option>
									{input.name === "type"
										? input.options?.map(
												(option) => {
													return (
														<option
															key={
																option.value
															}
															value={
																option.value
															}
															className={
																Styles.option
															}
														>
															{
																option.name
															}
														</option>
													);
												}
										  )
										: stories.map((content) => {
												return (
													<option
														key={
															content.id
														}
														value={
															content.id
														}
														className={
															Styles.option
														}
													>
														{
															content.title
														}
													</option>
												);
										  })}
								</motion.select>
							</motion.div>
						);
					})}
				</div>
				<div className={Styles.previewImageContainer}>
					{!formValues.image ? (
						<p className={Styles.textImage}>
							Previsualiza la imagen
						</p>
					) : (
						<Image
							src={formValues.image}
							className={Styles.previewImage}
							alt=""
							width={300}
							height={200}
							loading="lazy"
							unoptimized
						/>
					)}
				</div>
				<motion.button
					whileHover={{
						scale: 1.07,
						boxShadow: "0 4px 16px rgba(255,204,1,0.25)",
					}}
					whileTap={{ scale: 0.97 }}
					transition={{
						type: "spring",
						stiffness: 300,
					}}
					type="submit"
					className={Styles.buttonSend}
				>
					Enviar
				</motion.button>

			</form>
		</div>
	);
}
