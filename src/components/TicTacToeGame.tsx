import {useThree} from '@react-three/fiber'
import React, {useEffect, useState} from "react";
import {BoxGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, Vector3} from "three";
import {Center, Text3D} from "@react-three/drei";
import {useNavigate} from "react-router-dom";

type Params = {
    color: string
}

const TicTacToeGame: React.FunctionComponent<Params> = ({color}) => {

    // Player 1 (cross), Player 2 (round)
    enum PLAYER {
        UNPLAYED,
        PLAYER_1,
        PLAYER_2
    }

    enum TYPE_LINE {
        HORIZONTAL,
        VERTICAL,
        DIAGONAL
    }

    const linePosition = 1.2
    const lineHeight = 6
    const cubePosition = 2.3

    // Use this hook to access all the state of the canvas
    const state = useThree()
    const navigate = useNavigate()

    const [init, setInit] = useState<boolean>(false)
    const [player, setPLayer] = useState<PLAYER>(PLAYER.PLAYER_1)
    // Store the actual game
    const [game, setGame] = useState<number[][]>([
        [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED],
        [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED],
        [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED]])
    // Store all uuid of new mesh created
    const [playerMesh, setPlayerMesh] = useState<string[]>([])
    const [aPlayerWin, setAPlayerWin] = useState<boolean>(false)

    useEffect(() => {
        if (!init) {
            setInit(true)
            createBoard()
            // resetVariable()
            // createCross(0, 0, 0)
            // createWinningLine(cubePosition, 0, 0, TYPE_LINE.VERTICAL)
        }
    })

    // We can use this hook the move mesh
    // useFrame(() => {
    // });

    //region creation function
    /**
     * This function permit to create a cylinder
     *
     * @param x :: position
     * @param y :: position
     * @param z :: position
     */
    function createCylinder(x: number, y: number, z: number): void {
        console.log('create Cylinder')
        const geometry = new CylinderGeometry(0.7, 0.7, 0.3);
        const material = new MeshBasicMaterial({color: color});
        const cylinder = new Mesh(geometry, material);
        // Set position
        cylinder.position.set(x, y, z)
        // Rotation of PI/2 cause by default it's the wrong rotation for the game
        cylinder.rotateX(Math.PI / 2)
        // Store uuid
        playerMesh.push(cylinder.uuid)
        // Add cylinder to the scene
        state.scene.add(cylinder)
    }

    /**
     * This function permit to create a cross
     *
     * @param x :: position
     * @param y :: position
     * @param z :: position
     */
    function createCross(x: number, y: number, z: number): void {
        console.log('create Cross')
        // A cross is composed of two line (two box geometry)
        // First line
        const geometry = new BoxGeometry(1.5, 0.3, 0.3);
        const material = new MeshBasicMaterial({color: color});
        const line1 = new Mesh(geometry, material);
        line1.position.set(x, y, z)
        line1.rotateZ(Math.PI / 4)
        // Second line
        const line2 = new Mesh(geometry, material)
        line2.position.set(x, y, z)
        line2.rotateZ(-Math.PI / 4)
        // Create a group
        const group = new Group();
        group.add(line1)
        group.add(line2)
        // Store the uuid
        playerMesh.push(group.uuid)
        // Add the group to the scene
        state.scene.add(group)
    }

    /**
     * This functions permit to create the winning line
     *
     * @param x
     * @param y
     * @param z
     * @param typeLine
     * @param angle
     */
    function createWinningLine(x: number, y: number, z: number, typeLine: TYPE_LINE, angle?: number): void {
        let size
        if (angle && typeLine.valueOf() === TYPE_LINE.DIAGONAL) {
            size = Math.sqrt(lineHeight * lineHeight + lineHeight * lineHeight)
        } else {
            size = lineHeight
        }
        let geometry
        if (typeLine.valueOf() === TYPE_LINE.HORIZONTAL) {
            geometry = new BoxGeometry(size, 0.1, 0.1)
        } else {
            geometry = new BoxGeometry(0.1, size, 0.1)
        }
        const material = new MeshBasicMaterial({color: '#FF0000'})
        const winningLine = new Mesh(geometry, material)
        winningLine.position.set(x, y, z)
        if (angle) {
            winningLine.rotateZ(angle)
        }
        // Store the uuid
        playerMesh.push(winningLine.uuid)

        state.scene.add(winningLine)
    }

    /**
     * This function will create an empty board (only the line)
     */
    function createBoard(): void {

        const lineDepth = 0.3
        const lineWidth = 0.5

        const verticalLine = new BoxGeometry(lineWidth, lineHeight, lineDepth)
        const horizontalLine = new BoxGeometry(lineHeight, lineWidth, lineDepth)
        const material = new MeshBasicMaterial({color: color})

        // Create two vertical Mesh
        const verticalLineLeftMesh = new Mesh(verticalLine, material)
        verticalLineLeftMesh.position.set(-linePosition, 0, 0)
        const verticalLineRightMesh = new Mesh(verticalLine, material)
        verticalLineRightMesh.position.set(linePosition, 0, 0)

        // Create two horizontal Mesh
        const horizontalLineTopMesh = new Mesh(horizontalLine, material)
        horizontalLineTopMesh.position.set(0, linePosition, 0)
        const horizontalLineBottomMesh = new Mesh(horizontalLine, material)
        horizontalLineBottomMesh.position.set(0, -linePosition, 0)

        const group = new Group()
        group.add(verticalLineRightMesh)
        group.add(verticalLineLeftMesh)
        group.add(horizontalLineTopMesh)
        group.add(horizontalLineBottomMesh)

        state.scene.add(group)
    }

    //endregion

    //region player functions
    /**
     *
     * @param position
     */
    function playerAction(position: Vector3): void {
        if (!position) {
            console.error('position not provided')
            return
        }
        if (player.valueOf() === PLAYER.PLAYER_1.valueOf()) {
            console.log('player 1 action')
            createCross(position.x, position.y, position.z)
            savePlayerAction(position, PLAYER.PLAYER_1)
            const player1Win = aPLayerWin(PLAYER.PLAYER_1)
            if (player1Win) {
                setAPlayerWin(true)
            } else {
                setPLayer(PLAYER.PLAYER_2)
            }
        } else if (player.valueOf() === PLAYER.PLAYER_2.valueOf()) {
            console.log('player 2 action')
            createCylinder(position.x, position.y, position.z)
            savePlayerAction(position, PLAYER.PLAYER_2)
            const player2Win = aPLayerWin(PLAYER.PLAYER_2)
            if (player2Win) {
                setAPlayerWin(true)
            } else {
                setPLayer(PLAYER.PLAYER_1)
            }
        }
    }

    /**
     * This function will check if a given player win
     * @param player
     */
    function aPLayerWin(player: PLAYER): boolean {
        // Check vertical and horizontal win
        console.log('check horizontal and vertical win')
        for (let i = 0; i < 3; i++) {
            let horizontalWin = true
            let verticalWin = true
            for (let j = 0; j < 3; j++) {
                // Check vertical win
                if (game[i][j] !== player.valueOf()) {
                    horizontalWin = false
                }
                if (game[j][i] !== player.valueOf()) {
                    verticalWin = false
                }
                if (!horizontalWin && !verticalWin) {
                    break
                }
            }
            if (horizontalWin || verticalWin) {
                console.log('horizontal Win ', horizontalWin)
                console.log('vertical win', verticalWin)
                console.log('player win ,', player)
                if (verticalWin) {
                    createWinningLine(cubePosition * (i - 1), 0, 0, TYPE_LINE.VERTICAL)
                }
                if (horizontalWin) {
                    createWinningLine(0, -cubePosition * (i - 1), 0, TYPE_LINE.HORIZONTAL)
                }
                return true
            }
        }
        // Check diagonals win
        let diagonals1Win = true
        let diagonals2Win = true
        console.log('Check diagonals wins')
        for (let i = 0; i < 3; i++) {
            if (game[i][i] !== player.valueOf()) {
                diagonals1Win = false
            }
            if (game[i][2 - i] !== player.valueOf()) {
                diagonals2Win = false
            }
        }
        if (diagonals1Win || diagonals2Win) {
            console.log('diagonals 1 ', diagonals1Win)
            console.log('diagonals 2 ', diagonals2Win)
            console.log('player win ,', player)
            if (diagonals1Win) {
                createWinningLine(0, 0, 0, TYPE_LINE.DIAGONAL, Math.PI / 4)
            } else if (diagonals2Win) {
                createWinningLine(0, 0, 0, TYPE_LINE.DIAGONAL, -Math.PI / 4)
            }
            return true
        }
        console.log('none player win return false')
        return false
    }

    /**
     * This function will save the action of the player
     * @param position
     * @param player
     */
    function savePlayerAction(position: Vector3, player: PLAYER): void {
        let x
        let y
        if (position.y === cubePosition) { // TOP
            y = 0
        } else if (position.y === 0) { // MIDDLE
            y = 1
        } else if (position.y === -cubePosition) { // BOTTOM
            y = 2
        }
        if (position.x === -cubePosition) { // LEFT
            x = 0
        } else if (position.x === 0) { // MIDDLE
            x = 1
        } else if (position.x === cubePosition) { // RIGHT
            x = 2
        }
        console.log('coord : x:' + x + ' y :' + y)
        if (x !== undefined && y !== undefined) {
            game[y][x] = player.valueOf()
        }
        console.log(game)
    }

    //endregion

    //region reset functions
    /**
     * This function will reset the game. This reset all the mesh created by user and all variable
     */
    function resetGame(): void {
        console.log('enter method reset game ')
        playerMesh.map(uuid => {
            console.log('uuid : ', uuid)
            const object = state.scene.getObjectByProperty('uuid', uuid)
            if (object) {
                // First remove all children from the object
                if (object.children) {
                    object.children.map(children => {
                        state.scene.remove(children)
                    })
                }
                // Remove object
                state.scene.remove(object)
                console.log('remove the object :', object)
            }
        })
        resetVariable()
    }

    function resetVariable(): void {
        setPlayerMesh([])
        setGame([
            [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED],
            [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED],
            [PLAYER.UNPLAYED, PLAYER.UNPLAYED, PLAYER.UNPLAYED]])
        setPLayer(PLAYER.PLAYER_1)
        setAPlayerWin(false)
    }

    //endregion

    function leave(): void {
        navigate("/")
    }

    return (
        <>
            <group>
                {/* Box */}
                {/* TOP LINE */}
                {/* Top Left box */}
                {game[0][0] === 0 && !aPlayerWin ?
                    <mesh position={[-cubePosition, cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(-cubePosition, cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Top Middle Box */}
                {game[0][1] === 0 && !aPlayerWin ?
                    <mesh position={[0, cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(0, cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Top Right Box */}
                {game[0][2] === 0 && !aPlayerWin ?
                    <mesh position={[cubePosition, cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(cubePosition, cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* MIDDLE LINE */}
                {/* Middle Left box */}
                {game[1][0] === 0 && !aPlayerWin ?
                    <mesh position={[-cubePosition, 0, 0]}
                          onClick={() => playerAction(new Vector3(-cubePosition, 0, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Middle Box */}
                {game[1][1] === 0 && !aPlayerWin ?
                    <mesh position={[0, 0, 0]} onClick={() => playerAction(new Vector3(0, 0, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Middle Right Box */}
                {game[1][2] === 0 && !aPlayerWin ?
                    <mesh position={[cubePosition, 0, 0]}
                          onClick={() => playerAction(new Vector3(cubePosition, 0, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* BOTTOM LINE */}
                {/* Bottom Left box */}
                {game[2][0] === 0 && !aPlayerWin ?
                    <mesh position={[-cubePosition, -cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(-cubePosition, -cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Bottom Middle Box */}
                {game[2][1] === 0 && !aPlayerWin ?
                    <mesh position={[0, -cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(0, -cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
                {/* Bottom Right Box */}
                {game[2][2] === 0 && !aPlayerWin ?
                    <mesh position={[cubePosition, -cubePosition, 0]}
                          onClick={() => playerAction(new Vector3(cubePosition, -cubePosition, 0))}>
                        <boxGeometry args={[1.2, 1.2, 0.3]}/>
                        <meshPhongMaterial color="#ff0000" opacity={0} transparent/>
                    </mesh>
                    :
                    <></>
                }
            </group>
            {aPlayerWin ?
                <Center position={[0, -5, 0]}>
                    <Text3D font="/font/Inter_Bold.json" size={undefined} height={undefined}
                            bevelEnabled={false} bevelOffset={undefined} bevelSize={undefined}
                            bevelThickness={undefined} curveSegments={undefined}>
                        {player.valueOf() === PLAYER.PLAYER_1 ?
                            'Joueur 1 à gagné' :
                            player.valueOf() === PLAYER.PLAYER_2 ?
                                'Joueur 2 à gagné' :
                                ''}
                    </Text3D>
                </Center>
                :
                <></>
            }
            <group>
                <Center position={[8, 2, 0]}>
                    <Text3D font="/font/Inter_Bold.json" size={undefined} height={undefined}
                            bevelEnabled={false} bevelOffset={undefined} bevelSize={undefined}
                            bevelThickness={undefined} curveSegments={undefined}
                            onClick={leave}>
                        Quitter
                    </Text3D>
                </Center>
                {aPlayerWin ?
                    <Center position={[8, 0, 0]}>
                        <Text3D font="/font/Inter_Bold.json" size={undefined} height={undefined}
                                bevelEnabled={false} bevelOffset={undefined} bevelSize={undefined}
                                bevelThickness={undefined} curveSegments={undefined}
                                onClick={resetGame}>
                            Réinitialiser
                        </Text3D>
                    </Center>
                    :
                    <></>
                }

            </group>
        </>

    )
}

export default TicTacToeGame