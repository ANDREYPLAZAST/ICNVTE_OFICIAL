export interface Sponsor {
  name: string
  logo: string
  website?: string
  category: 'gold' | 'silver' | 'bronze' | 'partner'
}

export const sponsors: Sponsor[] = [
  {
    name: "Microsoft",
    logo: "/media/sponsors/microsoft-logo.png",
    website: "https://microsoft.com",
    category: "gold"
  },
  {
    name: "Unity Technologies",
    logo: "/media/sponsors/unity-logo.png",
    website: "https://unity.com",
    category: "gold"
  },
  {
    name: "Epic Games",
    logo: "/media/sponsors/epic-logo.png",
    website: "https://epicgames.com",
    category: "silver"
  },
  {
    name: "Adobe",
    logo: "/media/sponsors/adobe-logo.png",
    website: "https://adobe.com",
    category: "silver"
  },
  {
    name: "NVIDIA",
    logo: "/media/sponsors/nvidia-logo.png",
    website: "https://nvidia.com",
    category: "bronze"
  },
  {
    name: "Intel",
    logo: "/media/sponsors/intel-logo.png",
    website: "https://intel.com",
    category: "bronze"
  },
  {
    name: "MinTIC",
    logo: "/media/sponsors/mintic-logo.png",
    website: "https://mintic.gov.co",
    category: "partner"
  },
  {
    name: "Colciencias",
    logo: "/media/sponsors/colciencias-logo.png",
    website: "https://minciencias.gov.co",
    category: "partner"
  }
]