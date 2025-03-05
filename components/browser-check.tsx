"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function BrowserCheck({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState(true)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkBrowserSupport = async () => {
      try {
        // Periksa apakah navigator.mediaDevices tersedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsSupported(false)
          return
        }

        // Coba meminta izin kamera untuk memastikan dukungan
        await navigator.mediaDevices.getUserMedia({ video: true })
        setIsSupported(true)
      } catch (err) {
        console.error("Browser tidak mendukung akses kamera:", err)
        setIsSupported(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkBrowserSupport()
  }, [])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Browser Tidak Didukung</h3>
        <p className="text-red-700 mb-4">
          Browser Anda tidak mendukung akses kamera yang diperlukan untuk aplikasi ini.
        </p>
        <p className="text-sm text-red-600">
          Silakan gunakan browser modern seperti Chrome, Firefox, Safari, atau Edge versi terbaru.
        </p>
      </div>
    )
  }

  return <>{children}</>
}

