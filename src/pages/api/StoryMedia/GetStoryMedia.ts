import { ApiError } from 'next/dist/server/api-utils';
export interface StoryMediaInterface {
  id: number;
  storyId: number;
  url: string;
  type: string;
  duration: number | null;
  order: number;
  story: {
    id: number;
    title: string;
    isActive: boolean;
    createdAt: string;    // ISO date string
    expiresAt: string;    // ISO date string
    userId: number;
  };
}

export async function GetStoriesMedia():Promise<
	StoryMediaInterface[] | { error: boolean;  message: string }
> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/storiesMedia/`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
			}
		);
		const data = await response.json();
		return data as StoryMediaInterface[];
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