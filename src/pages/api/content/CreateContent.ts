export interface CreateContentDataInterface {
	sectionId: number;
	title: string;
	body: string;
	type: string;
	order: number;
	isActive: boolean;
}

export async function CreateContent(data:CreateContentDataInterface){
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/content/createContent`, {
			method: "POST",
			mode: "cors",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				data
			),
		});
		return response;
	} catch (error) {
		console.error("Error al crear el contenido:", error);
		return { error: true, message: error || "Error desconocido" };
	}
}