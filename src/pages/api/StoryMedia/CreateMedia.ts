import { formValueInterface } from "@/components/formStoryMedia/formStoryMedia";

function base64ToBlob(base64: string): Blob {
	const arr = base64.split(',');
	const mime = arr[0].match(/:(.*?);/)?.[1] || '';
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

export async function CreateMedia(data:formValueInterface) {
	const formData = new FormData();

	let fileToSend: Blob | string = data.image;
	if (typeof data.image === "string" && data.image.startsWith("data:image")) {
		fileToSend = base64ToBlob(data.image);
	}

	formData.append("file", fileToSend);
	formData.append("data", JSON.stringify({
		storyId: Number(data.storyId),
		type: data.type,
	}));

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visualgraph/storiesMedia/uploadMediaStory`,{
			method: "POST",
			mode: "cors",

			credentials:"same-origin",
			body: formData

		})

		return response;
	} catch (error) {
		console.error("Error al crear la media para la historia:", error);
		return { error: true, message: error || "Error desconocido" };
	}
}