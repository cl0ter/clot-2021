import { createContext, RefObject, useCallback, useEffect, useState } from 'react'
import { Lang, SlidesContent, Texts } from './types'
import texts from '../public/texts.json'

const cacheVideos = (res: SlidesContent, box: RefObject<HTMLDivElement>) =>
  new Promise<void>((resolve) => {
    const urls = [...res.back.map(({ video }) => video), ...res.front.map(({ video }) => video)]

    let loaded = 0
    const increase = (evt: Event) => {
      loaded++
      // console.log('loaded %o/%o evt: %o', loaded, urls.length, evt)
      if (loaded === urls.length) {
        box.current!.innerHTML = ''
        resolve()
      }
    }

    urls.forEach((url) => {
      const videoNode = document.createElement('video')
      videoNode.addEventListener('canplaythrough', increase)
      videoNode.addEventListener('error', increase)
      videoNode.preload = 'auto'
      videoNode.muted = true
      videoNode.defaultMuted = true
      videoNode.playsInline = true
      videoNode.src = url
      videoNode.load()

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

    const req = () =>
      new Promise<void>(async (resolve) => {
        try {
          const contentRes = await fetch(`${process.env.PUBLIC_URL}/content.json`)
          let contentJson = await contentRes.json()

          contentJson[lang].back.forEach((item: any) => {
            item.video = `${process.env.PUBLIC_URL}/${item.video}`
          })
          contentJson[lang].front.forEach((item: any) => {
            item.video = `${process.env.PUBLIC_URL}/${item.video}`
          })

          await cacheVideos(contentJson[lang], box)
          setSlides(contentJson[lang])

          const textsRes = await fetch(`${process.env.PUBLIC_URL}/texts.json`)
          const textsJson = await textsRes.json()

          setTexts(textsJson[lang])
          resolve()
        } catch (reason) {
          console.error('Failed to load and parse content.json or texts.json: %o', reason)
        }
      })

    const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

    const beginLoading = async () => {
      await Promise.all([req(), delay()])
      setLoaded(true)
    }

    beginLoading()
  }, [box, lang])

  return [slides, texts, loaded] as [SlidesContent, Texts, boolean]
}

const defaultLang = Lang.EN

type TextsJsonType = {
  en: Partial<typeof texts['en']>
  ru: Partial<typeof texts['ru']>
}

const LangContext = createContext<TextsJsonType[typeof defaultLang]>({})

const useLang = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const paramLang = new URLSearchParams(window.location.search).get('lang')
    const langs = {
      ru: Lang.RU,
      en: Lang.EN
    }
    if (paramLang && paramLang in langs) {
      return langs[paramLang as keyof typeof langs]
    }

    return defaultLang
  })
  const toggleLang = useCallback(() => {
    setLang((lang) => (lang === Lang.EN ? Lang.RU : Lang.EN))
  }, [setLang])

  return [lang, toggleLang] as [Lang, () => void]
}

const useQr = () => {
  const [qrVisible, setQrVisible] = useState(false)
  const hide = useCallback(() => setQrVisible(false), [])
  const show = useCallback(() => setQrVisible(true), [])

  return [qrVisible, show, hide] as [boolean, () => void, () => void]
}

export { LangContext, useLang, useSlides, useQr }
