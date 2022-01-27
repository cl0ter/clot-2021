export type Slide = {
  title: string
  description: string
  video: string
}

export type SlidesContent = {
  back: Slide[]
  front: Slide[]
}

export enum SlideTheme {
  DARK,
  LIGHT
}

export enum StoreLinkType {
  APP_STORE,
  APPLE_TV
}

export type LinkList = {
  title: string
  list: {
    text: string
    url: string
    unavailable?: boolean
  }[]
}

export type Texts = {
  [key: string]: string
}

export enum Lang {
  RU = 'ru',
  EN = 'en'
}
