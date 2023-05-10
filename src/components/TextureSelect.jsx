import { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore.js'
import * as images from '../images/images.js'
import { useKeyboard } from '../hooks/useKeyboard'

export function TextureSelect () {
  const [visible, setVisible] = useState(false)
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])
  const { dirt, grass, glass, wood, log } = useKeyboard()

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 2000)

    setVisible(true)

    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [texture])

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log
    }
    const pressedTexture = Object.entries(textures).find(([k, v]) => v)
    if (pressedTexture) {
      setTexture(pressedTexture[0])
    }
  }, [setTexture, dirt, grass, glass, wood, log])

  return visible && (
    <div className='texture-selector'>
      {
        Object
          .entries(images)
          .map(([imgKey, img]) => {
            return (
              <img
                className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
                key={imgKey}
                src={img}
                alt={imgKey}
              />
            )
          })
      }
    </div>
  )
}
