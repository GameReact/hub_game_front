import {Canvas} from '@react-three/fiber'
import {CameraControls, Center, Cloud, OrbitControls, Plane, Sky, Stars, Text3D} from '@react-three/drei'
import TicTacToeGame from "../../components/TicTacToeGame";
import {useEffect, useRef, useState} from "react";
import "../../styles/tic_tac_toe.css"

const TicTacToe: React.FunctionComponent = () => {

    const [color, setColor] = useState("red")
    const [init, setInit] = useState<boolean>(false)

    useEffect(() => {
        if (!init) {
            changeColor()
            setInit(true)
        }
    })

    const changeColor = () => {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        setColor(randomColor)
    }


    return (
        <div className="tic-tac-toe">
            <div id="canvas-container">
                <Canvas id="canvas">
                    <Center position={[0, 5, 0]}>
                        <Text3D font="/font/Inter_Bold.json" size={undefined} height={undefined}
                                bevelEnabled={false} bevelOffset={undefined} bevelSize={undefined}
                                bevelThickness={undefined} curveSegments={undefined}>
                            O_O Tic Tac Toe ♥
                        </Text3D>
                    </Center>
                    <TicTacToeGame color={color}/>
                    <ambientLight intensity={0.1} />
                    <directionalLight color={color} position={[0, 0, 5]} />
                    <Stars/>
                    <Sky distance={450000} sunPosition={[0, 0.5, 5]} inclination={0} azimuth={0.25} />
                    <CameraControls distance={10} />
                </Canvas>
            </div>
        </div>
    )
}

export default TicTacToe