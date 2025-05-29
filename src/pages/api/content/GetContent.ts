import { ContentDataInterface } from '../../../components/formContent/formContent';


export interface ApiError {
  success?: boolean; // Puede no estar presente en algunos errores
  message: string;
  error?: string;    // Puede estar presente si el backend lo envía
  statusCode?: number; // Puede estar presente si el backend lo envía
}
export async function GetContent(): Promise<
 ContentDataInterface[] | { error: boolean;  message: string }
>  {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/content/`,{
			method:"GET",
			mode:"cors",
			credentials:"same-origin",
			headers:{
				"Content-type":"application/json"
			}
		})
		const data = await response.json();

		return data as ContentDataInterface[]
	} catch (error: unknown) {
        console.error("Error al obtener los contenidos", error);
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