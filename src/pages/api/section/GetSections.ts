import { SectionInterface } from "@/components/formContent/formContent";
import { ApiError } from "next/dist/server/api-utils";

export async function GetSections(): Promise<
	SectionInterface[] | { error: boolean;  message: string }
> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/section/`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();

		return data as SectionInterface[];
	} catch (error: unknown) {
				console.error("Error al obtener las secciones", error);
				const msg =
					error && typeof error === "object" && error !== null && "message" in error && typeof (error as ApiError).message === "string" && (error as ApiError).message.length > 0
						? (error as ApiError).message !== 'Failed to fetch'
							? (error as ApiError).message
							: 'Error de red o el servidor no responde. Error al obtener las secciones'
						: typeof error === "string"
							? error
							: "Error desconocido";
				return { error: true, message: msg };
			}
}
