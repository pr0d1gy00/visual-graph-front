'use client'
import React, { useEffect, useState } from 'react'
import Styles from './css/formRelationsContents.module.css'
import Label from '@/components/label/label'
import { ContentDataInterface } from '../formContent/formContent'
import { GetContent } from '@/pages/api/content/GetContent'
import Swal from 'sweetalert2'
import { CreateRelations } from '@/pages/api/relationsContents/CreateRelations'

const inputs = [
	{ label:'Contenido', type:'select', name:'parentContentId', id:'parentContentId' },
	{ label:'Sub-Contenido', type:'select', name:'childContentId', id:'childContentId' },
]

export interface RelationContentInterface {
	parentContentId: string;
	childContentId: string;
}

export default function FormRelationsContents() {
	const [contents, setContents] = useState<ContentDataInterface[]>([])
	const [selectedContent, setSelectedContent] = useState<RelationContentInterface>({
		parentContentId: '',
		childContentId: ''
	});
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setSelectedContent((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedContent.parentContentId || !selectedContent.childContentId) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Por favor, completa todos los campos.",
				confirmButtonText: "Aceptar",
				confirmButtonColor: "#ffcc00",
				width: 400,
				customClass: {
					popup: "swal-custom-height",
				},
				timer: 5000,
				timerProgressBar: true,
			});
			return;
		}
		const dataSend = {
			parentContentId: parseInt(selectedContent.parentContentId),
			childContentId: parseInt(selectedContent.childContentId),
		};
		const response = await CreateRelations(dataSend);
			if (response instanceof Response) {
						const result = await response.json();
						if (response.status === 201 || response.status === 200) {
							Swal.fire({
								icon: "success",
								title: "Contenido creado",
								text: JSON.stringify(
									`${result.message}.!`
								),
								confirmButtonText: "Aceptar",
								confirmButtonColor: "#ffcc00",
								width: 400,
								customClass: {
									popup: "swal-custom-height",
								},
								timerProgressBar: true,
							});
							setSelectedContent({
								parentContentId: '',
								childContentId: ''
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
	}

	useEffect(()=>{
		GetContent().then((res)=>{
			if (Array.isArray(res)) {
							setContents(res);
						} else {
							console.log(res.error);
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


	},[])



	return (
		<div className={Styles.formRelationsContainer}>
			<h2 className={Styles.textRelations}>Crea los contenidos a mostrar</h2>
			<form action="POST" onSubmit={handleSubmit} className={Styles.formRelations}>
				<div className={Styles.formRelationsInputContainer}>
					{inputs.map((input, index) => {
						if (input.type === 'select') {
						return (
							<div
								key={index}
								className={Styles.containerSelect}
							>
								<Label
									htmlFor={input.id}
									name={input.label}
								/>
								<select title={input.name} name={input.name} id={input.id} className={Styles.select}
									{...(input.name === 'parentContentId' ? { value: selectedContent.parentContentId } : { value: selectedContent.childContentId })}

									onChange={handleChange}
								>
									<option value=""> -- Selecciona una opción -- </option>
									{input.name === 'parentContentId' && contents.map((content) => (
										<option key={content.id} value={content.id}>
											{content.title} - {content.body}
										</option>
									))}
									{input.name === 'childContentId' && contents.map((content) => (
										<option key={content.id} value={content.id}>
											{content.title} - {content.body}
										</option>

									))

									}
									{input.name === 'childContentId' && contents.flatMap((content) =>
										(content.media ?? []).map((media) => (
											<option key={media.id} value={media.id}>
												{media.altText} - imagen
											</option>
										))
									)}

								</select>
							</div>
						)}

					})}
				</div>
				<button type="submit" className={Styles.buttonSend}>
					Enviar
				</button>
			</form>
		</div>
	)
}
