import { ApiError } from "next/dist/server/api-utils";

export async function DeleteRelations(id: number) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/relation/deleteRelationsContent/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});


		return response
	} catch (error: unknown) {
				console.error("Error al eliminar las relaciones", error);
				const msg =
					error && typeof error === "object" && error !== null && "message" in error && typeof (error as ApiError).message === "string" && (error as ApiError).message.length > 0
						? (error as ApiError).message !== 'Failed to fetch'
							? (error as ApiError).message
							: 'Error de red o el servidor no responde. Error al obtener los contenidos'
						: typeof error === "string"
							? error
							: "Error desconocido";
				return { error: true, message: msg };
			}
}