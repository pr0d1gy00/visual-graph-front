import { ContentDataInterface } from '../../../components/formContent/formContent';

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