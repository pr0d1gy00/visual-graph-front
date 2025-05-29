import { ApiError } from "next/dist/server/api-utils";

export interface ContentDataInterface {
    id: number;
    sectionId: number;
    title: string;
    body: string;
    type: string;
    order: number;
    animationClass: string | null;
    styleConfig: string | null; // Puedes tipar esto mejor si sabes la estructura
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface RelationInterface {
    id: number;
    parentContentId: number;
    childContentId: number;
    relationType: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    parentContent: ContentDataInterface;
    childContent: ContentDataInterface;
}

export async function GetRelations() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/relation/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
			const data = await response.json();

				return data as RelationInterface[]
			} catch (error: unknown) {
                        console.error("Error al obtener las relaciones", error);
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