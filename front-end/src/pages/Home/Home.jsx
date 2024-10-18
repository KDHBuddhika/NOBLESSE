import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	useGLTF,
	OrbitControls,
	PerspectiveCamera,
	Environment,
} from "@react-three/drei";
import maskPath from "../../assets/3d/mask.glb";
import vasePath from "../../assets/3d/vase.glb";
import sculpturePath from "../../assets/3d/sculpture.glb";
import microphonePath from "../../assets/3d/microphone.glb";
import ringPath from "../../assets/3d/ring.glb";
import logo from "../../assets/images/noblesselogo.png";
import "./home.css";

function Home() {
	const [currentModel, setCurrentModel] = useState(1);
	function Model() {
		const mesh = useRef();

		const { scene: mask } = useGLTF(maskPath);
		const { scene: vase } = useGLTF(vasePath);
		const { scene: sculpture } = useGLTF(sculpturePath);
		const { scene: microphone } = useGLTF(microphonePath);
		const { scene: ring } = useGLTF(ringPath);

		useFrame(() => {
			if (mesh.current) {
				mesh.current.rotation.y -= 0.01;
			}
		});
		const modelMap = {
			1: {
				object: mask,
				scale: 90,
				position: [0, -3, 0],
				rotation: [-0.5, 0, 0],
			},
			2: {
				object: sculpture,
				scale: 0.007,
				position: [0, -0.3, 0],
				rotation: [-0.5, 0, 0],
			},
			3: {
				object: vase,
				scale: 0.13,
				position: [0, -1.5, 0],
				rotation: [0, 0, 0],
			},
			4: {
				object: ring,
				scale: 6,
				position: [0, 0, 0],
				rotation: [-0.5, 0, 0],
			},
			5: {
				object: microphone,
				scale: 0.2,
				position: [0, 0, 0],
				rotation: [-0.3, 0, 0],
			},
		};

		const { object, scale, position, rotation } = modelMap[currentModel];

		return (
			<primitive
				ref={mesh}
				object={object}
				scale={scale}
				position={position}
				rotation={rotation}
				name="model"
			/>
		);
	}

	return (
		<>
			<div
				id="carousel-container"
				className="w-full bg-primaryWhite relative h-[600px]  overflow-clip"
			>
				<div id="3dObject" className="w-1/2 h-full absolute -z-2 right-4">
					<Canvas>
						<PerspectiveCamera makeDefault position={[0, 2.5, 5]} fov={50} />
						<Model />
						<Environment preset="sunset" />
						<OrbitControls
							enableZoom={false}
							enablePan={false}
							enableRotate={false}
						/>
					</Canvas>
				</div>
				<div
					id="carousel-cover"
					className="h-full w-4/5 absolute bg-primaryBlue/10  transform -translate-x-52 skew-x-[30deg] backdrop-blur-sm z-1"
				></div>
				<h1 className="w-1/2 text-primaryBlue text-center text-4xl font-Montserrat absolute left-[100px] top-52">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et impedi
				</h1>
				<button className="text-primaryBlue text-2xl font-Montserrat font-semibold absolute left-[380px] top-[350px] p-4 w-52 border-primaryBlue border-[3px] bg-primaryWhite hover:bg-primaryBlue hover:text-primaryWhite transition-colors duration-300 ">
					Auction
				</button>
			</div>
			<div
				id="carousel-controller"
				className="w-full h-20 bg-primaryWhite flex justify-center items-center"
			>
				<button
					onClick={() => setCurrentModel(1)}
					className="w-4 h-4 border border-primaryBlue rounded-full m-2"
				></button>
				<button
					onClick={() => setCurrentModel(2)}
					className="w-4 h-4 border border-primaryBlue rounded-full m-2"
				></button>
				<button
					onClick={() => setCurrentModel(3)}
					className="w-4 h-4 border border-primaryBlue rounded-full m-2"
				></button>
				<button
					onClick={() => setCurrentModel(4)}
					className="w-4 h-4 border border-primaryBlue rounded-full m-2"
				></button>
				<button
					onClick={() => setCurrentModel(5)}
					className="w-4 h-4 border border-primaryBlue rounded-full m-2"
				></button>
			</div>
			<div className="w-full flex flex-col justify-center items-center">
				<img src={logo} alt="" className="h-28 w-auto m-16" />
				<h1 className="w-3/4 text-primaryBlue text-center text-3xl font-Montserrat m-10">
					Noblesse is a Trusted Auction Paltform Offering Secure, Transparent
					Transactions for Authentic Items Ensuring a Seamless and Satisfying
					Auction Experience.
				</h1>
				<button className="text-primaryBlue text-xl font-Montserrat font-semibold m-10 p-2 w-40 border-primaryBlue border-[3px] bg-primaryWhite hover:bg-primaryBlue hover:text-primaryWhite transition-colors duration-300">
					About Us
				</button>
			</div>
			<div
				id="itemContainer"
				className="w-full h-[600px] bg-[url('https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg')] bg-cover bg-center mt-24 mb-4"
			>
				<div
					id="itemCover"
					className="w-full h-full bg-primaryBlack/50 backdrop-blur-sm p-16"
				>
					<div
						id="firstItemContainer"
						className="w-full h-1/3 flex justify-between items-center"
					>
						<h1 className="text-primaryWhite font-Montserrat text-5xl font-bold">
							Vintage Camilion
						</h1>
						<div className="">
							<h2 className="text-primaryWhite font-Montserrat text-4xl font-bold mb-4">
								12:00 AM
							</h2>
							<p className="text-primaryWhite font-Montserrat text-2xl font-semibold">
								December 24, 2024 UTC
							</p>
						</div>
					</div>
					<div
						id="secondItemContainer"
						className="w-full h-1/3 flex justify-between items-center"
					>
						<h1 className="text-primaryWhite font-Montserrat text-2xl font-medium w-1/2 text-pretty">
							Elegent Camilion Sitting On Top of a Flower Looking at You And
							Having Your Backs Tilted Up By The Light. Gazing At You. Looking
							At You.
						</h1>
						<div className="mr-10">
							<p className="text-primaryWhite font-Montserrat text-3xl font-semibold mb-4">
								Starting From
							</p>
							<h2 className="text-primaryWhite font-Montserrat text-4xl font-bold">
								$500.00
							</h2>
						</div>
					</div>
					<div
						id="thirdItemContainer"
						className="w-1/3 h-1/3 flex justify-between items-center"
					>
						<button className="text-primaryWhite font-Montserrat text-2xl font-medium border-[3px] border-white bg-black/20 p-2 w-48">
							Explore
						</button>
						<button className="text-primaryWhite font-Montserrat text-2xl font-medium border-[3px] border-white bg-black/20 p-2 w-48">
							Similar Items
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
