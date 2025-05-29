import { ApiError } from 'next/dist/server/api-utils';
import { ContentDataInterface } from '../../../components/formContent/formContent';
export interface MediaInterface {
    id: number;
    contentId: number;
    url: string;
    type: string;
	content:ContentDataInterface[]
    altText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    duration: number | null;
    fileSize: number | null;
    thumbnailUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

export async function GetMedia():Promise<
	MediaInterface[] | { error: boolean;  message: string }
> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/media/`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
			}
		);
		const data = await response.json();
		return data as MediaInterface[];
	} catch (error: unknown) {
			console.error("Error al obtener las secciones", error);
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