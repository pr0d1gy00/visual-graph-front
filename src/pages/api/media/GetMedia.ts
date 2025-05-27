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
		console.log('response', data[0].content.length);
		return data as MediaInterface[];
	} catch (error:any) {
		console.error("Error al obtener las secciones", error);
		const msg =
			error && error.message && typeof error.message === "string" && error.message.length > 0
				? error.message !== 'Failed to fetch'
					? error.message
					: 'Error de red o el servidor no responde. Error al obtener las secciones'
				: error && typeof error === "string"
		return { error: true, message: msg };
	}

}