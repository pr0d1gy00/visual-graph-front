import React from "react";
import Styles from "./css/form.module.css";
import Input from "@/components/inputs/input";
import Label from "@/components/label/label";
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
		options: [{ name: "Flex", value: "flex" }],
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
	return (
		<div className={Styles.formContainer}>
			<h2 className={Styles.textForm}>Registrar Sección</h2>
			<form action="POST" className={Styles.form}>
				{inputs.map((input, index) =>
					input.typeBox === "input" ? (
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
							>
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
				)}
			</form>
		</div>
	);
}
