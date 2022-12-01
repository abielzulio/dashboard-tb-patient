/* Static data about product */

interface Product {
  name: string
  description: {
    short: string
    long: string
  }
  tagline: string
  keywords: string
  url: string
  img: string
  author: string
  favicon: string
}

export const product: Product = {
  name: "Dashboard Tren Kondisi Pasien",
  description: {
    short: "Tugas Akhir — Abiel Zulio M",
    long: "Tugas Akhir — Abiel Zulio M",
  },
  tagline: "Dashboard Tren Kondisi Pasien",
  keywords: "wicara, pasien tuberkulosis, dashboard pemantau",
  url: "https://tugas-akhir-one.vercel.app/",
  img: "/img/og.png",
  author: "Abiel Zulio M",
  favicon: "/img/favicon.png",
}
