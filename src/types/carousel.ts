export type SlideType = 'hook' | 'content' | 'cta'

export interface CarouselSlide {
  type: SlideType
  title: string
  text: string
}

export interface GeneratedCarousel {
  slides: CarouselSlide[]
}

export type CarouselStyleId = 'midnight' | 'sunset' | 'mint' | 'paper'

export interface CarouselStyle {
  id: CarouselStyleId
  label: string
  gradient: [string, string]
  textColor: string
  accentColor: string
  previewClass: string
}

export interface SavedCarousel {
  id: string
  topic: string
  styleId: CarouselStyleId
  slides: CarouselSlide[]
  createdAt: string
}
