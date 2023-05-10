import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures.js'
import { useState } from 'react'
import { useStore } from '../hooks/useStore.js'

export function Cube ({ id, position, texture }) {
  // const [removeCube] = useStore(state => [state.removeCube])
  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[texture + 'Texture']

  const handlePointerMove = (event) => {
    event.stopPropagation()
    setIsHovered(true)
  }

  const handlePointerOut = (event) => {
    event.stopPropagation()
    setIsHovered(false)
  }

  const handleClick = (event) => {
    event.stopPropagation()

    const clickedFace = Math.floor(event.faceIndex / 2)
    const { x, y, z } = ref.current.position

    if (event.altKey) {
      removeCube(id)
    } else if (clickedFace === 0) {
      addCube(x + 1, y, z)
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z)
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z)
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z)
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1)
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1)
    }
  }

  return (
    <mesh ref={ref} onClick={handleClick} onPointerMove={handlePointerMove} onPointerOut={handlePointerOut}>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'} transparent attach='material' map={activeTexture}
        opacity={texture === 'glass' ? 0.6 : 1}
      />
    </mesh>
  )
}
