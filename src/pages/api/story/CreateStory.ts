
export async function CreateStory(data:{title:string,userId:number}) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/stories/createStory`, {
			method: "POST",
			mode: "cors",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				{
					data
				}
			),
		});
		return response;

	} catch (error) {
	console.error("Error al crear el contenido:", error);
		return { error: true, message: error || "Error desconocido" };
	}
}