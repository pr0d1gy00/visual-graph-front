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