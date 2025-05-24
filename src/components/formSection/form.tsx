"use client";

import React, { FormEvent, useState } from "react";
import Styles from "./css/form.module.css";
import Input from "@/components/inputs/input";
import Label from "@/components/label/label";
import { CreateSection, CreateSectionDataInterface } from "@/pages/api/section/CreateSection";
import Swal from "sweetalert2";
const inputs = [
	{
		label: "Titulo",
		name: "title",
		type: "text",
		placeholder: "Título",
		id: "title",
		typeBox: "input",
	},
	{
		label: "Descripcion",

		name: "description",
		type: "text",
		placeholder: "Descripción",
		id: "description",
		typeBox: "input",
	},
	{
		label: "Distribución",

		name: "distribution",
		type: "text",
		placeholder: "Distribución",
		id: "distribution",
		typeBox: "select",
		options: [
			{ name: "Flex", value: "flex" },
			{ name: "Flex Column", value: "flex column" },
			{ name: "Grid", value: "grid" },
			{ name: "Hero", value: "hero" },
		],
	},
	{
		label: "Publicado?",

		name: "isPublished",
		type: "checkbox",
		placeholder: "",
		id: "isPublished",
		typeBox: "input",
	},
	{
		label: "Numero para mostrar en seccion",

		name: "order",
		type: "number",
		placeholder: "Orden",
		id: "order",
		typeBox: "input",
	},
	{
		label: "Activo",
		name: "isActive",
		type: "checkbox",
		placeholder: "",
		id: "isActive",
		typeBox: "input",
	},
];


export default function Form() {
	const initialState: CreateSectionDataInterface = {
		title: "",
		description: "",
		distribution: "",
		isPublished: false,
		order: 0,
	};
	const [formValues, setFormValues] = useState<CreateSectionDataInterface>(initialState);

	console.log(formValues);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value } = e.target;
		const isCheckbox = type === "checkbox";

		setFormValues((prev) => ({
			...prev,
			[name]:
				isCheckbox && e.target instanceof HTMLInputElement
					? e.target.checked
					: value,
		}));
	};

	const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		const dataTosend:CreateSectionDataInterface = {
			...formValues,
			order:Number(formValues.order)
		}
		const response = await CreateSection({
			...dataTosend,
			userId: 1,
			isActive: true,
		});
		if (response instanceof Response) {
			const result = await response.json();
			console.log(result)
			if(response.status === 201 || response.status === 200){
				Swal.fire({
					icon:"success",
					title:"Felicitaciones!",
					text:`${result.message}. Ve a Content para crear el contenido de tu sección`,
					iconColor:"#ffcc00",
					width:"500",
					confirmButtonColor:"#ffcc00",
					heightAuto:false,
					customClass: {
						popup: 'swal-custom-height'
					},

				})
				setFormValues(initialState)
			}else {
				Swal.fire({
					icon:"error",
					iconColor:"#ffcc00",
					title:"Oh no!",
					text:typeof result.message === "string" ? result.message : JSON.stringify(result.message),
					customClass: {
						popup: 'swal-custom-height'
					},

				})

			}
		}
	}

	return (
		<div className={Styles.formContainer}>
			<h2 className={Styles.textForm}>Registrar Sección</h2>
			<form action="POST" className={Styles.form} onSubmit={handleSubmit}>
				<div className={Styles.formInputsContainer}>
				{inputs
					.filter((input) => input.name !== "isActive")
					.map((input, index) =>{
						const name = input.name as keyof CreateSectionDataInterface;

						return input.typeBox === "input" ? (
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
									className={Styles.input}
									type={input.type}
									placeholder={input.placeholder}
									name={input.name}
									id={input.id}
									onChange={handleChange}
									{...(input.type === "checkbox"
										? { checked: Boolean(formValues[name]) }
										: { value: formValues[name] as string | number |undefined })}
								/>
							</div>
						) : (
							<div
								key={index}
								className={Styles.containerSelect}
							>
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
									value={formValues.distribution}
								>
									<option value="">
										{" "}
										-- Selecciona una opcion --
									</option>
									{input.options?.map((option) => (
										<option
											key={option.value}
											value={option.value}
											className={Styles.option}
										>
											{option.name}
										</option>
									))}
								</select>
							</div>
						)
					}
					)}
				</div>

					<button type="submit" className={Styles.buttonSend}>Enviar</button>
			</form>
		</div>
	);
}
