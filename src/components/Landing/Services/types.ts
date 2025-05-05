// Single service item 
export interface Service {
    title: string
    description: string
    bgColor: string
  }
  
  // All the rows of services
  export interface ServicesData {
    row1: Service[]
    row2: Service[]
  }
  