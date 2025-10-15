export interface University {
  name: string
  city: string
  logo: string
  image: string
  description: string
}

export const universities: University[] = [
  {
    name: "Universidad Militar Nueva Granada",
    city: "Bogotá",
    logo: "/media/logos/UMNG.png",
    image: "/media/universities/umng-campus.jpg",
    description: "Institución de educación superior que forma profesionales íntegros con pensamiento crítico, liderazgo y compromiso social, contribuyendo al desarrollo del país."
  },
  {
    name: "Universidad ECCI",
    city: "Bogotá",
    logo: "/media/logos/ECCI.png",
    image: "/media/universities/unal-campus.jpg",
    description: "La universidad más importante de Colombia, reconocida por su excelencia académica y su contribución a la investigación y desarrollo tecnológico."
  },
  {
    name: "Institución Universitaria Pascual Bravo",
    city: "Medellín",
    logo: "/media/logos/PASCUALBRAVO.png",
    image: "/media/universities/uniandes-campus.jpg",
    description: "Universidad privada de investigación que se destaca por su innovación, calidad académica y formación de líderes transformadores."
  },
  {
    name: "Universidad EAFIT",
    city: "Medellín",
    logo: "/media/logos/EAFIT.png",
    image: "/media/universities/javeriana-campus.jpg",
    description: "Institución católica de educación superior comprometida con la formación integral de personas y la construcción de una sociedad justa."
  },
  {
    name: "Universidad Tecnologica de Pereira",
    city: "Pereira",
    logo: "/media/logos/UTP.png",
    image: "/media/universities/rosario-campus.jpg",
    description: "Universidad con más de 360 años de historia, enfocada en la excelencia académica y la formación de ciudadanos éticos y competentes."
  },
  {
    name: "Universidad Escuela Colombiana de Ingeniería Julio Garavito",
    city: "Bogotá",
    logo: "/media/logos/JULIOGARAVITO.png",
    image: "/media/universities/rosario-campus.jpg",
    description: "Universidad con más de 360 años de historia, enfocada en la excelencia académica y la formación de ciudadanos éticos y competentes."
  },
  {
    name: "Universidad de Antioquia",
    city: "Medellín",
    logo: "/media/logos/UDEA.png",
    image: "/media/universities/rosario-campus.jpg",
    description: "Universidad con más de 360 años de historia, enfocada en la excelencia académica y la formación de ciudadanos éticos y competentes."
  },
  {
    name: "Universidad Autónoma de Occidente",
    city: "Cali",
    logo: "/media/logos/AUTONOMA.png",
    image: "/media/universities/rosario-campus.jpg",
    description: "Universidad con más de 360 años de historia, enfocada en la excelencia académica y la formación de ciudadanos éticos y competentes."
  },
  {
    name: "Universidad de La Sabana",
    city: "Chía",
    logo: "/media/logos/SABANA.png",
    image: "/media/universities/unal-campus.jpg",
    description: "La universidad pública más importante de Colombia, reconocida por su excelencia académica e investigación de alto nivel."
  },
  {
    name: "Universidad EIA",
    city: "Envigado",
    logo: "/media/logos/EIA.jpg",
    image: "/media/universities/unal-campus.jpg",
    description: "La universidad pública más importante de Colombia, reconocida por su excelencia académica e investigación de alto nivel."
  },
]