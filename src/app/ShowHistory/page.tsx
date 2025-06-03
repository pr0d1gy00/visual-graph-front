'use client'
import  { useState} from "react";
import Modal from "react-modal";
import Carousel from "@/components/carousel/Carousel";

export default function Page() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
<Modal
	isOpen={isOpen}
	onRequestClose={() => setIsOpen(false)}
	{...(typeof window !== "undefined" && document.getElementById("__next")
		? { appElement: document.getElementById("__next") as HTMLElement }
		: {})}

	contentLabel="Historial"
	  ariaHideApp={false}

	style={{
		content: { maxWidth: "600px", margin: "auto" },
	}}
>
				<button onClick={() => setIsOpen(false)}>
					Cerrar
				</button>
				<Carousel />
			</Modal>
		</>
	);
}
