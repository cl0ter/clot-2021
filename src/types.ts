export type Slide = {
  title: string
  description: string
  video: string
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
