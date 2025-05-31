"use client";
import React, { useState } from "react";
import Input from "@/components/inputs/input";
import Styles from "./css/formStory.module.css";
import Label from "@/components/label/label";
import { CreateStory } from "@/pages/api/story/CreateStory";
import Swal from "sweetalert2";
import { motion } from "motion/react";
const inputsForm = [
	{
		label: "Titulo",
		name: "title",
		type: "text",
		placeholder: "Título",
		id: "title",
		typeBox: "input",
	},
];

export default function FormStory() {
	const [inputs, setInputs] = useState({
		title: "",
	});
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault();
		const { name, value } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const dataToSend = {
			title: inputs.title,
			userId: 1,
		};
		console.log(dataToSend);

		const response = await CreateStory(dataToSend);
		if (response instanceof Response) {
			const result = await response.json();
			console.log(result);
			if (response.status === 201 || response.status === 200) {
				Swal.fire({
					icon: "success",
					title: "Felicitaciones!",
					text: `${result.message}. Ve a Historia Media para crear media de tu historia`,
					iconColor: "#ffcc00",
					width: "500",
					confirmButtonColor: "#ffcc00",
					heightAuto: false,
					customClass: {
						popup: "swal-custom-height",
					},
				});

				setInputs({
					title: "",
				});
			} else {
				Swal.fire({
					icon: "error",
					iconColor: "#ffcc00",
					title: "Oh no!",
					text:
						typeof result.message === "string"
							? result.message
							: JSON.stringify(result.message),
					customClass: {
						popup: "swal-custom-height",
					},
				});
			}
		}
	};

	console.log(inputs);
	return (
		<div className={Styles.formContainer}>
			<motion.h2
				className={Styles.formMediaText}
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
				Crea una historia
			</motion.h2>
			<form
				action="POST"
				onSubmit={handleSubmit}
				className={Styles.formMedia}
			>
				<div className={Styles.formStoryInputsContainer}>
					{inputsForm.map((input, index) => {
						return (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: -20 }}
								transition={{
									duration: 0.3,
									delay: index * 0.1,
								}}
								key={index}
								className={Styles.formContainerInput}
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
							</motion.div>
						);
					})}
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
