export interface GalleryImage {
  src: string
  alt: string
  title: string
  description: string
  category: string
  year: string
  university: string
  height: number
}

export const galleryImages: GalleryImage[] = [
  {
    src: "/media/gallery/ceremony-1.jpg",
    alt: "Ceremonia de apertura V-CNVTE 2024",
    title: "Ceremonia de Apertura",
    description: "Inicio oficial de la quinta edición de CNVTE",
    category: "2024",
    year: "2024",
    university: "UMNG",
    height: 300
  },
  {
    src: "/media/gallery/presentation-1.jpg",
    alt: "Presentación de proyecto VR",
    title: "Proyecto de Realidad Virtual",
    description: "Equipo presentando su innovador juego educativo en VR",
    category: "presentations",
    year: "2024",
    university: "Universidad Nacional",
    height: 400
  },
  {
    src: "/media/gallery/workshop-1.jpg",
    alt: "Taller de Unity",
    title: "Taller de Desarrollo en Unity",
    description: "Participantes aprendiendo técnicas avanzadas de Unity",
    category: "workshops",
    year: "2024",
    university: "Uniandes",
    height: 250
  },
  {
    src: "/media/gallery/winners-2023.jpg",
    alt: "Ganadores IV-CNVTE 2023",
    title: "Ceremonia de Premiación 2023",
    description: "Los ganadores de la cuarta edición recibiendo sus premios",
    category: "2023",
    year: "2023",
    university: "UMNG",
    height: 350
  },
  {
    src: "/media/gallery/demo-1.jpg",
    alt: "Demostración de juego educativo",
    title: "Demo de Juego Educativo",
    description: "Estudiantes probando un juego de matemáticas interactivo",
    category: "presentations",
    year: "2024",
    university: "Javeriana",
    height: 320
  },
  {
    src: "/media/gallery/networking-1.jpg",
    alt: "Sesión de networking",
    title: "Networking entre Participantes",
    description: "Intercambio de ideas entre equipos de diferentes universidades",
    category: "2024",
    year: "2024",
    university: "Rosario",
    height: 280
  },
  {
    src: "/media/gallery/judges-1.jpg",
    alt: "Panel de jueces evaluando",
    title: "Evaluación de Proyectos",
    description: "Jueces expertos evaluando los proyectos finalistas",
    category: "2023",
    year: "2023",
    university: "UMNG",
    height: 300
  },
  {
    src: "/media/gallery/ar-demo.jpg",
    alt: "Demostración de realidad aumentada",
    title: "Proyecto de Realidad Aumentada",
    description: "Innovadora aplicación educativa usando AR",
    category: "presentations",
    year: "2024",
    university: "Universidad Nacional",
    height: 380
  },
  {
    src: "/media/gallery/team-work.jpg",
    alt: "Equipos trabajando",
    title: "Desarrollo Colaborativo",
    description: "Equipos trabajando intensamente en sus proyectos",
    category: "2024",
    year: "2024",
    university: "Uniandes",
    height: 260
  },
  {
    src: "/media/gallery/exhibition-1.jpg",
    alt: "Exhibición de proyectos",
    title: "Feria de Proyectos",
    description: "Exposición de todos los proyectos participantes",
    category: "ceremonies",
    year: "2023",
    university: "UMNG",
    height: 340
  }
]