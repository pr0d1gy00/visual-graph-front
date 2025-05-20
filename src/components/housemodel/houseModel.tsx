"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Styles from "./css/houseModel.module.css";
import {
	GLTFLoader,
	OrbitControls,
	RoomEnvironment,
} from "three/examples/jsm/Addons.js";

export default function HouseModel() {
	const mountRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		const scene = new THREE.Scene();
		const sceneWidth = window.innerWidth;
		const sceneHeight = window.innerHeight;

		// RENDERER
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(sceneWidth, sceneHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		mount.appendChild(renderer.domElement);

		// ENVIRONMENT
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		scene.environment = pmremGenerator.fromScene(
			new RoomEnvironment(),
			0.04
		).texture;

		// CAMERA
		const camera = new THREE.PerspectiveCamera(
			60,
			sceneWidth / sceneHeight,
			0.1,
			1000
		);
		camera.position.set(3, 2, 1); // X=7 (lateral), Y=1.5 (altura), Z=0		scene.add(camera);

		// CONTROLS
		const controls = new OrbitControls(
			camera,
			renderer.domElement
		);
		controls.enableDamping = true;
		controls.target.set(0, 1.0, 0);
		controls.enableRotate = true;
		controls.enableZoom= false

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Luz suave
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(
			0xffffff,
			0.8
		);
		directionalLight.position.set(10, 20, 10);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 2048;
		directionalLight.shadow.mapSize.height = 2048;
		scene.add(directionalLight);

		// FLOOR (opcional pero ayuda visualmente)
		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(50, 50),
			new THREE.ShadowMaterial({ opacity: 0.25 })
		);
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = -0.01;
		floor.receiveShadow = true;
		scene.add(floor);

		// LOAD MODEL
		const loader = new GLTFLoader();
		loader.load("/RoomPractice.glb", (gltf) => {
			const model = gltf.scene;
			model.scale.set(1, 1, 1);
			model.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					(child as THREE.Mesh).castShadow = true;
					(child as THREE.Mesh).receiveShadow = true;
				}
			});
			scene.add(model);
		});

		// ANIMATION LOOP
		const animate = () => {
			controls.update();
			renderer.render(scene, camera);
		};
		renderer.setAnimationLoop(animate);

		// CLEANUP
		return () => {
			renderer.dispose();
			mount.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div ref={mountRef} className={Styles.sceneContainer}></div>
	);
}
