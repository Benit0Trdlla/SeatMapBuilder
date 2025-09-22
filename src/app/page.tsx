"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SeatMap } from "@/components/seat-map"
import { ControlPanel } from "@/components/control-panel"
import { ExportJsonDialog } from "@/components/export-json-dialog"
import { MapPin, Download } from "lucide-react"

export interface Seat {
  id: string
  number: number
  status: "available" | "selected" | "occupied"
}

export interface Row {
  id: string
  label: string
  seats: Seat[]
  selected: boolean
}

export default function Page() {
  const [rows, setRows] = useState<Row[]>([
    {
      id: "1",
      label: "A",
      selected: false,
      seats: [
        { id: "A1", number: 1, status: "available" },
        { id: "A2", number: 2, status: "available" },
        { id: "A3", number: 3, status: "occupied" },
        { id: "A4", number: 4, status: "available" },
        { id: "A5", number: 5, status: "available" },
      ],
    },
    {
      id: "2",
      label: "B",
      selected: false,
      seats: [
        { id: "B1", number: 1, status: "available" },
        { id: "B2", number: 2, status: "selected" },
        { id: "B3", number: 3, status: "available" },
        { id: "B4", number: 4, status: "occupied" },
        { id: "B5", number: 5, status: "available" },
      ],
    },
  ])

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sistema de Gestión de Asientos</h1>
              <p className="text-muted-foreground">Administra filas y asientos</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel rows={rows} setRows={setRows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
          </div>

          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Mapa de Asientos
                  </span>
                  <ExportJsonDialog rows={rows}>
                    <Button variant="outline" className="hover:cursor-pointer">
                      <Download className="w-5 h-5" />
                      Descargar
                    </Button>
                  </ExportJsonDialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SeatMap rows={rows} setRows={setRows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="seat seat-available">A</div>
                <span className="text-sm text-muted-foreground">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="seat seat-selected">B</div>
                <span className="text-sm text-muted-foreground">Seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="seat seat-occupied">C</div>
                <span className="text-sm text-muted-foreground">Ocupado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
