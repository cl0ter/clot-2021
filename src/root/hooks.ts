import { RefObject, useEffect, useState } from 'react'
import { Lang, SlidesContent, Texts } from '../types'

const cacheVideos = (res: SlidesContent, box: RefObject<HTMLDivElement>) =>
  new Promise<void>((resolve) => {
    const urls = [
      ...res.back.map(({ video }) => video),
      ...res.front.map(({ video }) => video)
    ]

    let loaded = 0
    const increase = () => {
      loaded++
      if (loaded === urls.length) {
        box.current!.innerHTML = ''
        resolve()
      }
    }

    urls.forEach((url) => {
      const videoNode = document.createElement('video')
      videoNode.preload = 'auto'
      videoNode.src = `${process.env.PUBLIC_URL}/${url}`
      videoNode.addEventListener('canplaythrough', increase)

      box.current!.append(videoNode)
    })
  })

const useSlides = (box: RefObject<HTMLDivElement>, lang: Lang) => {
  const [slides, setSlides] = useState<SlidesContent>({ front: [], back: [] })
  const [texts, setTexts] = useState<Texts>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!box.current) {
      return
    }

    setLoaded(false)

    const req = async () => {
      try {
        const contentRes = await fetch(`${process.env.PUBLIC_URL}/content.json`)
        const contentJson = await contentRes.json()
        console.log('json loaded %o', contentJson)

        await cacheVideos(contentJson[lang], box)
        setSlides(contentJson[lang])

        const textsRes = await fetch(`${process.env.PUBLIC_URL}/texts.json`)
        const textsJson = await textsRes.json()
        console.log('texts loaded %o', textsJson[lang])

        setTexts(textsJson[lang])

        setLoaded(true)
      } catch (reason) {
        console.error(
          'Failed to load and parse content.json or texts.json: %o',
          reason
        )
      }
    }

    req()
  }, [box, lang])

  return [slides, texts, loaded] as [SlidesContent, Texts, boolean]
}

export { useSlides }
