"use client"

import { useState } from "react"
import CameraView from "@/components/camera-view"
import PhotoStrip from "@/components/photo-strip"
import TemplateSelector from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { templates } from "@/lib/templates"
import LoadingSpinner from "@/components/loading-spinner"
import BrowserCheck from "@/components/browser-check"
import { RefreshCw } from "lucide-react"

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<"capture" | "customize" | "download">("capture")
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [finalImage, setFinalImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [retakeIndex, setRetakeIndex] = useState<number | null>(null)

  const handlePhotoCapture = (photoDataUrl: string) => {
    let newPhotos = [...photos]

    // Jika sedang mengulang foto tertentu
    if (retakeIndex !== null) {
      newPhotos[retakeIndex] = photoDataUrl
      setRetakeIndex(null)
    } else {
      // Jika mengambil foto baru
      newPhotos = [...photos, photoDataUrl]
    }

    setPhotos(newPhotos)

    if (newPhotos.length >= 3 && retakeIndex === null) {
      setCurrentStep("customize")
    }
  }

  const handleRetake = (index: number) => {
    setRetakeIndex(index)
  }

  const handleReset = () => {
    setPhotos([])
    setFinalImage(null)
    setCurrentStep("capture")
    setRetakeIndex(null)
  }

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template)
  }

  const handleCreateFinalImage = () => {
    const photoStripElement = document.getElementById("photo-strip")
    if (!photoStripElement) return

    setIsLoading(true)

    // Gunakan html2canvas untuk mengkonversi elemen DOM ke canvas
    import("html2canvas")
      .then((html2canvas) => {
        html2canvas
          .default(photoStripElement, {
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: selectedTemplate.backgroundColor.toString(),
            scale: 2, // Tingkatkan kualitas gambar
            onclone: (clonedDoc) => {
              // Pastikan gambar dalam clone memiliki waktu untuk dimuat
              const images = clonedDoc.getElementsByTagName("img")
              for (let i = 0; i < images.length; i++) {
                images[i].crossOrigin = "Anonymous"
              }
            },
          })
          .then((canvas) => {
            try {
              // Gunakan kualitas maksimum untuk PNG
              const imgData = canvas.toDataURL("image/png", 1.0)
              setFinalImage(imgData)
              setCurrentStep("download")
            } catch (err) {
              console.error("Error converting canvas to image:", err)
              alert("Terjadi kesalahan saat membuat gambar. Silakan coba lagi.")
            } finally {
              setIsLoading(false)
            }
          })
          .catch((err) => {
            console.error("Error creating image:", err)
            alert("Terjadi kesalahan saat membuat foto strip. Silakan coba lagi.")
            setIsLoading(false)
          })
      })
      .catch((err) => {
        console.error("Error loading html2canvas:", err)
        alert("Terjadi kesalahan saat memuat library. Silakan coba lagi.")
        setIsLoading(false)
      })
  }

  const handleDownload = () => {
    if (!finalImage) return

    try {
      // Buat elemen anchor untuk download
      const link = document.createElement("a")
      link.href = finalImage
      link.download = `photo-strip-${new Date().getTime()}.png`

      // Tambahkan ke DOM, klik, dan hapus
      document.body.appendChild(link)
      link.click()

      // Beri waktu sebelum menghapus elemen
      setTimeout(() => {
        document.body.removeChild(link)
      }, 100)
    } catch (err) {
      console.error("Error downloading image:", err)
      alert("Terjadi kesalahan saat mengunduh gambar. Silakan coba lagi.")
    }
  }

  // Menentukan foto mana yang sedang diambil
  const getCurrentPhotoIndex = () => {
    if (retakeIndex !== null) return retakeIndex
    return photos.length
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">arctabooth</h1>

        <BrowserCheck>
          {(currentStep === "capture" || retakeIndex !== null) && (
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 md:gap-6">
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg text-center">
                  {retakeIndex !== null ? (
                    <p className="text-base">Mengulang foto {retakeIndex + 1}</p>
                  ) : (
                    <>
                      <p className="text-base">Ambil 3 foto untuk membuat strip foto Anda</p>
                      <p className="text-sm text-muted-foreground">Foto {photos.length + 1} dari 3</p>
                    </>
                  )}
                </div>

                <CameraView onCapture={handlePhotoCapture} />

                <div className="flex justify-center">
                  {photos.length > 0 && !retakeIndex && (
                    <Button variant="outline" onClick={handleReset}>
                      Mulai Ulang
                    </Button>
                  )}
                  {retakeIndex !== null && (
                    <Button variant="outline" onClick={() => setRetakeIndex(null)}>
                      Batal Mengulang
                    </Button>
                  )}
                </div>
              </div>

              {/* Preview foto dalam format vertikal */}
              <div className="hidden md:block">
                <div className="bg-muted p-3 rounded-lg mb-3">
                  <h3 className="text-sm font-medium text-center">Preview Strip Foto</h3>
                </div>
                <div className="w-full max-w-[200px] mx-auto bg-white rounded-lg p-3 shadow-md">
                  <div className="space-y-3">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center relative
                          ${retakeIndex === index ? "ring-2 ring-primary" : ""}`}
                      >
                        {photos[index] ? (
                          <>
                            <img
                              key={photos[index]}
                              src={photos[index] || "/placeholder.svg"}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                            />
                            {/* Tombol Ulang */}
                            {!retakeIndex && currentStep === "capture" && (
                              <button
                                onClick={() => handleRetake(index)}
                                className="absolute bottom-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
                                aria-label="Ulang foto"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-muted-foreground text-sm">Foto {index + 1}</span>
                            <span className="text-xs text-muted-foreground mt-1">
                              {getCurrentPhotoIndex() === index ? (
                                <span className="text-primary font-medium">Mengambil...</span>
                              ) : index < photos.length ? (
                                "Menunggu..."
                              ) : (
                                "Belum diambil"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tampilan mobile untuk preview foto */}
              <div className="block md:hidden">
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center relative
                        ${retakeIndex === index ? "ring-2 ring-primary" : ""}`}
                    >
                      {photos[index] ? (
                        <>
                          <img
                            key={photos[index]}
                            src={photos[index] || "/placeholder.svg"}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                          {/* Tombol Ulang untuk Mobile */}
                          {!retakeIndex && currentStep === "capture" && (
                            <button
                              onClick={() => handleRetake(index)}
                              className="absolute bottom-1 right-1 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
                              aria-label="Ulang foto"
                            >
                              <RefreshCw className="h-3 w-3" />
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {getCurrentPhotoIndex() === index ? (
                            <span className="text-primary">Ambil</span>
                          ) : (
                            `Foto ${index + 1}`
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === "customize" && retakeIndex === null && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-lg">Pilih template untuk strip foto Anda</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:order-2">
                  <TemplateSelector
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onSelect={handleTemplateSelect}
                  />

                  <div className="flex justify-center gap-4 mt-6">
                    <Button variant="outline" onClick={handleReset}>
                      Mulai Ulang
                    </Button>
                    <Button onClick={handleCreateFinalImage} disabled={isLoading}>
                      {isLoading ? <LoadingSpinner /> : "Buat Strip Foto"}
                    </Button>
                  </div>
                </div>

                <div className="md:order-1">
                  <PhotoStrip photos={photos} template={selectedTemplate} />
                </div>
              </div>
            </div>
          )}

          {currentStep === "download" && finalImage && retakeIndex === null && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-lg">Strip foto Anda siap!</p>
              </div>

              <div className="flex justify-center">
                <img
                  src={finalImage || "/placeholder.svg"}
                  alt="Strip foto final"
                  className="max-w-full max-h-[70vh] object-contain border border-gray-200 rounded-lg shadow-md"
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleReset}>
                  Buat Strip Baru
                </Button>
                <Button onClick={handleDownload}>Unduh Strip Foto</Button>
              </div>
            </div>
          )}
        </BrowserCheck>
      </div>
    </main>
  )
}

