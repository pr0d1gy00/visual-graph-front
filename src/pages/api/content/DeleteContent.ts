export async function DeleteContent(id: number){
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/content/deleteContent/${id}`,
			{
				method: "DELETE",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (error) {
		console.error("Error al eliminar la sección:", error);
		return { error: true, message: error || "Error desconocido" };
	}
}