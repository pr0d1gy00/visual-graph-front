export interface CreateSectionDataInterface{
	title: string;
  description: string;
  distribution: string;
  isPublished: boolean;
  order: number;
  isActive?: boolean;
  userId?:number
}

export async function CreateSection(data:CreateSectionDataInterface){
	try{
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/section/createSection`,{
			method:'POST',
			mode:'cors',
			credentials:'same-origin',
			headers:{
				'Content-Type':'application/json',
			},
			body:JSON.stringify(data)
		})
		return response
	}catch(error){
		console.error("Error al crear la sección:", error);
        return { error: true, message: error || "Error desconocido" };
	}
}