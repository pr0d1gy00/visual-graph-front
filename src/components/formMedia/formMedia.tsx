"use client";
import React, { useEffect, useState } from "react";
import Styles from "./css/formMedia.module.css";
import Input from "@/components/inputs/input";
import Label from "@/components/label/label";
import { GetContent } from "@/pages/api/content/GetContent";
import Swal from "sweetalert2";
import { CreateMedia } from "@/pages/api/media/CreateMedia";
import { GetMedia, MediaInterface } from "@/pages/api/media/GetMedia";
import Image from "next/image";

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
		label: "Texto alternativo",
		type: "text",
		name: "altText",
		id: "altText",
	},
	{
		label: "Contenido",
		type: "select",
		name: "contentId",
		id: "contentId",
	},
];
export interface formValueInterface {
	image: string;
	type: string;
	altText: string;
	contentId: string;
}
export default function FormMedia() {
	const [formValues, setFormValues] = useState<formValueInterface>({
		image: "",
		type: "",
		altText: "",
		contentId: "",
	});
	const [content, setContent] = useState<any[]>([]);
	const [image, setImage] = useState<MediaInterface[]>([]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
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
					altText: "",
					contentId: "",
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
		GetContent().then((res) => {
			if (Array.isArray(res)) {
				setContent(res);
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
		GetMedia().then((res) => {
			if (Array.isArray(res)) {
				setImage(res);
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
			<h2 className={Styles.formMediaText}>
				Añadele imagenes a tus contenido
			</h2>
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
							<div
								key={index}
								className={Styles.containerInput}
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
							</div>
						) : (
							<div className={Styles.containerSelect}>
								<Label
									htmlFor={input.id}
									className={Styles.labelSelect}
									name={input.label}
								/>
								<select
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
										: content.map((content) => {
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
								</select>
							</div>
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
						/>
					)}
				</div>
				<button type="submit" className={Styles.buttonSend}>
					Enviar
				</button>
				{/* <div>
						{image.map((img, index) => {
							return (
								<div key={index} className={Styles.containerImage}>
									<img
										src={`${process.env.NEXT_PUBLIC_API_URL}${img.url}`}
										alt={img.altText || "Imagen"}
										className={Styles.image}
									/>
					</div>
							);
						})}
					</div> */}
			</form>
		</div>
	);
}
