"use client";
import React, { useEffect, useState } from "react";
import Styles from "./css/formContent.module.css";
import Input from "@/components/inputs/input";
import Label from "@/components/label/label";
import { GetSections } from "@/pages/api/section/GetSections";
import Swal from "sweetalert2";
import { CreateContent } from "@/pages/api/content/CreateContent";

const inputsContent = [
	{
		label: "Título",
		type: "text",
		name: "title",
		id: "title",
	},
	{
		label: "Descripción",
		type: "text",
		name: "body",
		id: "body",
	},
	{
		label: "Tipo",
		type: "select",
		name: "type",
		id: "type",
	},
	{
		label: "orden",
		type: "number",
		name: "order",
		id: "order",
	},
	{
		label: "Sección",
		type: "select",
		name: "sectionId",
		id: "sectionId",
	},
];

const typeContent = [
	{ name: "Card", value: "card" },
	{ name: "card horizontal", value: "cardFlex" },
	{ name: "Carrusel", value: "carousel" },
	{ name: "imagen", value: "image" },
	{ name: "video", value: "video" },
	{ name: "texto", value: "text" },
];
export interface SectionInterface {
	id: number;
	title: string;
	description: string;
	distribution: string;
	isPublished: boolean;
	order: number;
	animationClass?: string;
	slug: string;
	isActive: boolean;
	createdAt: string; // o Date si lo parseas
	updatedAt: string; // o Date si lo parseas
	userId: number;
}
export interface ContentDataInterface {
	id: number;
	title: string;
	body: string;
	type: string;
	order: number;
	sectionId: number;
	isActive: boolean;
	createdAt: string; // o Date si lo parseas
	updatedAt: string; // o Date si lo parseas
}
export default function FormContent() {
	const [sections, setSections] = useState<SectionInterface[]>([]);
	const [inputs, setInputs] = useState({
		title: "",
		body: "",
		type: "",
		order: 0,
		sectionId: "",
	});
	const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
		e.preventDefault();
		const {name,value}=e.target;

		setInputs({
			...inputs,
			[name]:value
		})

	}
	const handleSubmit =  async (e:React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		const dataSend = {
			...inputs,
			order: parseInt(inputs.order.toString()),
			sectionId: parseInt(inputs.sectionId.toString()),
			isActive: true,

		}
		const response = await CreateContent(dataSend);
		if(response instanceof Response){
			const result = await response.json();
			if(response.status === 201 || response.status === 200){
				Swal.fire({
					icon: "success",
					title: "Contenido creado",
					text: JSON.stringify(`${result.message}. Ve a Media para agregarle imagenes!`),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
					width: 400,
					customClass:{
						popup: 'swal-custom-height'
					},
					timerProgressBar: true,
				})
			}else{
				Swal.fire({
					icon: "error",
					title: "Error",
					text:typeof result.message === "string" ? result.message : JSON.stringify(result.message),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#ffcc00",
					width: 400,
					customClass:{
						popup: 'swal-custom-height'
					},
					timerProgressBar: true,
				})
			}
		}
	}
	console.log(inputs)
	useEffect(() => {
		GetSections().then((res) => {
			if (Array.isArray(res)) {
				setSections(res);
			} else {
				console.log(res.error)
				Swal.fire({
					icon: "error",
					title: "Error",
					text: JSON.stringify(res.message),
					confirmButtonText: "Aceptar",
					confirmButtonColor: "#3085d6",
					width: 400,
					customClass:{
						popup: 'swal-custom-height'
					},
					timer: 5000,
					timerProgressBar: true,
				})
		}})
	}, []);
	return (
		<div className={Styles.formContentContainer}>
			<h2 className={Styles.textContent}>
				Registrar Contenido
			</h2>
			<form action="POST" onSubmit={handleSubmit} className={Styles.formContentForm}>
				<div className={Styles.formContentInputContainer}>
					{inputsContent.map((input, index) => {
						if (input.type === "select") {
							return (
								<div
									key={index}
									className={
										Styles.formContainerSelect
									}
								>
									<Label
										htmlFor={input.id}
										name={input.label}
									/>
									<select
										title={input.name}
										name={input.name}
										id={input.id}
										className={Styles.select}
										onChange={handleChange}
										{...(input.name === "sectionId"
											? { value: inputs.sectionId }
											: { value: inputs.type })}
									>
										<option value="">
											{" "}
											-- Selecciona una opcion
											--{" "}
										</option>
										{input.name === "type"
											? typeContent.map(
													(
														typeContent,
														index
													) => {
														return (
															<option
																key={
																	index
																}
																value={
																	typeContent.value
																}
															>
																{
																	typeContent.name
																}
															</option>
														);
													}
										)
											: sections.map(
													(
														section,
														index
													) => {
														return (
															<option
																key={
																	index
																}
																value={
																	section.id
																}
															>
																{
																	section.title
																}
															</option>
														);
													}
											)}
									</select>
								</div>
							);
						} else {
							return (
								<div
									key={index}
									className={
										Styles.formContainerInput
									}
								>
									<Label
										htmlFor={input.id}
										name={input.label}
									/>
									<Input
										type={input.type}
										name={input.name}
										id={input.id}
										onChange={handleChange}
										placeholder={input.label}

									/>
								</div>
							);
						}
					})}
				</div>
				<button type="submit" className={Styles.buttonSend}>
					Enviar
				</button>
			</form>
		</div>
	);
}
