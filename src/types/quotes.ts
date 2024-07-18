export type Quote = {
  id: number
  createdAt: string
  updatedAt: string
  author: { name: string }
  text: string
  origin: string
  popularity: number
  tags: string[]
  distance: number
}
