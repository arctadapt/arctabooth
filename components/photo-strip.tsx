"use client"

import { useRef, useEffect } from "react"
import type { templates } from "@/lib/templates"

interface PhotoStripProps {
  photos: string[]
  template: (typeof templates)[0]
}

export default function PhotoStrip({ photos, template }: PhotoStripProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Adjust container height based on width to maintain aspect ratio
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        // Untuk 3 foto persegi dengan sedikit ruang di antara
        containerRef.current.style.height = `${width * 3.2}px`
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  if (photos.length < 3) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[300px] mx-auto"
      style={{ backgroundColor: template.backgroundColor }}
    >
      <div
        id="photo-strip"
        className="w-full h-full relative overflow-hidden"
        style={{
          backgroundColor: template.backgroundColor,
          borderRadius: template.borderRadius,
          border: template.border,
          backgroundImage: template.backgroundImage,
          backgroundSize: template.backgroundSize,
        }}
      >
        {/* Template Header */}
        {template.showHeader && (
          <div
            className="absolute top-0 left-0 right-0 z-10 p-4 text-center"
            style={{
              color: template.headerTextColor,
              fontFamily: template.fontFamily,
            }}
          >
            <h2 className="text-xl font-bold">{template.headerText}</h2>
          </div>
        )}

        {/* Photos */}
        <div className="flex flex-col h-full">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative flex-1"
              style={{
                padding: template.spacing,
                backgroundColor: "transparent",
              }}
            >
              <div
                className="w-full aspect-square relative overflow-hidden"
                style={{
                  borderRadius: template.photoBorderRadius,
                  border: template.photoBorder,
                  boxShadow: template.photoShadow,
                }}
              >
                {/* Gunakan key yang unik berdasarkan URL foto untuk memaksa re-render saat foto berubah */}
                <img
                  key={photo}
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  style={{
                    filter: template.photoFilter,
                  }}
                />

                {template.showPhotoNumber && (
                  <div
                    className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: template.photoNumberBgColor,
                      color: template.photoNumberColor,
                    }}
                  >
                    {index + 1}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Template Footer */}
        {template.showFooter && (
          <div
            className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center"
            style={{
              color: template.footerTextColor,
              fontFamily: template.fontFamily,
            }}
          >
            <p className="text-sm">{template.footerText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

