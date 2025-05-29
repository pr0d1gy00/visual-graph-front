export async function DeleteRelations(id: number) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/relation/deleteRelationsContent/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});


		return response
	} catch (error:any) {
		console.error("Error al obtener los contenidos", error);
		const msg =
			error && error.message && typeof error.message === "string" && error.message.length > 0
				? error.message !== 'Failed to fetch'
					? error.message
					: 'Error de red o el servidor no responde. Error al obtener los contenidos'
				: error && typeof error === "string"
		return { error: true, message: msg };
	}
}