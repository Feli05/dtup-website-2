// Data shapes for events
export interface EventItem {
    title: string
    desc: string
  }
  
  export interface YearBlock {
    year: string
    items: EventItem[]
  }
  
  export type EventsData = YearBlock[]
  