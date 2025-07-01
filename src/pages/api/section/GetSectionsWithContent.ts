import { ApiError } from "next/dist/server/api-utils";

export interface Media {
    id: number;
    contentId: number;
    url: string;
    type: string;
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

export interface Content {
    id: number;
    sectionId: number;
    title: string;
    body: string;
    type: string;
    order: number;
    animationClass: string | null;
    styleConfig: string; // Puedes tipar esto mejor si sabes la estructura
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    media: Media[];
}

export interface SectionInterfaceWithContent {
    id: number;
    title: string;
    description: string;
    distribution: string;
    isPublished: boolean;
    order: number;
    animationClass: string | null;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
    contents: Content[];
}
export async function GetSectionsWithContent(): Promise<
	SectionInterfaceWithContent[] | { error: boolean;  message: string }
> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/section/getSectionWithContents`,
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

		return data as SectionInterfaceWithContent[];
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
