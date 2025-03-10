export const templates = [
  {
    id: "classic",
    name: "Classic",
    backgroundColor: "#ffffff",
    borderRadius: "0px",
    border: "1px solid #000000",
    spacing: "8px",
    photoBorderRadius: "0px",
    photoBorder: "1px solid #000000",
    photoShadow: "none",
    photoFilter: "none",
    showHeader: true,
    headerText: "PHOTO BOOTH",
    headerTextColor: "#000000",
    showFooter: true,
    footerText: "memories captured",
    footerTextColor: "#000000",
    fontFamily: "Arial, sans-serif",
    showPhotoNumber: false,
    photoNumberBgColor: "#000000",
    photoNumberColor: "#ffffff",
  },
  {
    id: "vintage",
    name: "Vintage",
    backgroundColor: "#f5e8c9",
    borderRadius: "0px",
    border: "4px solid #8b4513",
    spacing: "16px",
    photoBorderRadius: "0px",
    photoBorder: "4px solid #8b4513",
    photoShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
    photoFilter: "sepia(0.5)",
    showHeader: true,
    headerText: "MEMORIES",
    headerTextColor: "#8b4513",
    showFooter: true,
    footerText: "captured moments",
    footerTextColor: "#8b4513",
    fontFamily: "Courier New, monospace",
    showPhotoNumber: true,
    photoNumberBgColor: "#8b4513",
    photoNumberColor: "#f5e8c9",
  },
  {
    id: "modern",
    name: "Modern",
    backgroundColor: "#000000",
    borderRadius: "16px",
    border: "none",
    spacing: "4px",
    photoBorderRadius: "8px",
    photoBorder: "none",
    photoShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    photoFilter: "none",
    showHeader: true,
    headerText: "PHOTO STRIP",
    headerTextColor: "#ffffff",
    showFooter: true,
    footerText: "created with arctabooth",
    footerTextColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
    showPhotoNumber: false,
    photoNumberBgColor: "#ffffff",
    photoNumberColor: "#000000",
  },
  {
    id: "colorful",
    name: "Colorful",
    backgroundColor: "linear-gradient(to bottom, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd)",
    borderRadius: "12px",
    border: "2px solid #ffffff",
    spacing: "12px",
    photoBorderRadius: "8px",
    photoBorder: "4px solid #ffffff",
    photoShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    photoFilter: "brightness(1.1)",
    showHeader: true,
    headerText: "FUN MEMORIES",
    headerTextColor: "#ffffff",
    showFooter: true,
    footerText: "smile!!",
    footerTextColor: "#ffffff",
    fontFamily: "Comic Sans MS, cursive",
    showPhotoNumber: true,
    photoNumberBgColor: "#ffffff",
    photoNumberColor: "#ff9a9e",
  },
  {
    id: "minimal",
    name: "Minimal",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    border: "none",
    spacing: "2px",
    photoBorderRadius: "0px",
    photoBorder: "none",
    photoShadow: "none",
    photoFilter: "none",
    showHeader: false,
    headerText: "",
    headerTextColor: "#000000",
    showFooter: false,
    footerText: "",
    footerTextColor: "#000000",
    fontFamily: "Arial, sans-serif",
    showPhotoNumber: false,
    photoNumberBgColor: "#000000",
    photoNumberColor: "#ffffff",
  },
  {
    id: "polaroid",
    name: "Polaroid",
    backgroundColor: "#ffffff",
    borderRadius: "0px",
    border: "none",
    spacing: "24px",
    photoBorderRadius: "0px",
    photoBorder: "12px solid #ffffff",
    photoShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    photoFilter: "contrast(1.1)",
    showHeader: false,
    headerText: "",
    headerTextColor: "#000000",
    showFooter: true,
    footerText: "shake it like a polaroid picture",
    footerTextColor: "#888888",
    fontFamily: "Courier New, monospace",
    showPhotoNumber: false,
    photoNumberBgColor: "#000000",
    photoNumberColor: "#ffffff",
  },
]

// Tambahkan tipe untuk filter foto
export type PhotoFilter = {
  id: string
  name: string
  filter: string
}

export const photoFilters: PhotoFilter[] = [
  { id: "normal", name: "Normal", filter: "none" },
  { id: "grayscale", name: "B&W", filter: "grayscale(100%)" },
  { id: "sepia", name: "Sepia", filter: "sepia(100%)" },
  { id: "vintage", name: "Vintage", filter: "sepia(50%) contrast(110%)" },
  { id: "fade", name: "Fade", filter: "brightness(110%) contrast(90%) saturate(70%)" },
  { id: "warm", name: "Warm", filter: "saturate(150%) brightness(105%) sepia(20%)" },
  { id: "cool", name: "Cool", filter: "saturate(140%) hue-rotate(180deg) brightness(105%)" },
  { id: "dramatic", name: "Dramatic", filter: "contrast(120%) brightness(90%) saturate(150%)" },
]

