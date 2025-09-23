"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Row } from "@/app/control-panel/page"
import { Download } from "lucide-react"

interface ExportJsonDialogProps {
  rows: Row[]
  children: React.ReactNode
}

export function ExportJsonDialog({ rows, children }: ExportJsonDialogProps) {
  const [mapName, setMapName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleExport = () => {
    if (!mapName.trim()) return

    const exportData = {
      mapName: mapName.trim(),
      createdAt: new Date().toISOString(),
      totalRows: rows.length,
      totalSeats: rows.reduce((acc, row) => acc + row.seats.length, 0),
      rows: rows.map((row) => ({
        id: row.id,
        label: row.label,
        seats: row.seats.map((seat) => ({
          id: seat.id,
          number: seat.number,
          status: seat.status,
        })),
      })),
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${mapName.trim().replace(/[^a-zA-Z0-9]/g, "_")}_seat_map.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setIsOpen(false)
    setMapName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar Mapa de Asientos
          </DialogTitle>
          <DialogDescription>
            Ingresa un nombre para tu mapa de asientos antes de exportar el archivo JSON.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="map-name">Nombre del Mapa</Label>
            <Input
              id="map-name"
              placeholder="Ej: Teatro Principal, Sala A, Auditorio..."
              value={mapName}
              onChange={(e) => setMapName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && mapName.trim()) {
                  handleExport()
                }
              }}
            />
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Filas:</strong> {rows.length}
            </p>
            <p>
              <strong>Asientos totales:</strong> {rows.reduce((acc, row) => acc + row.seats.length, 0)}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={!mapName.trim()}>
            <Download className="w-4 h-4 mr-2" />
            Exportar JSON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
