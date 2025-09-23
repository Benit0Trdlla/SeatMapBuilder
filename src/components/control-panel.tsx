"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RowLabelingDialog } from "@/components/row-labeling-dialog"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import type { Row } from "@/app/panel-control/page"
import { Plus, RotateCcw, Tag, Trash2 } from "lucide-react"

interface ControlPanelProps {
  rows: Row[]
  setRows: (rows: Row[]) => void
  selectedRows: string[]
  setSelectedRows: (selectedRows: string[]) => void
}

export function ControlPanel({ rows, setRows, selectedRows, setSelectedRows }: ControlPanelProps) {
  const [newRowLabel, setNewRowLabel] = useState("")
  const [seatsPerRow, setSeatsPerRow] = useState(5)
  const [multipleRows, setMultipleRows] = useState(1)

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const getLabelByIndex = (index: number): string => {
    let label = ""
    while (index >= 0) {
      label = alphabet[index % alphabet.length] + label
      index = Math.floor(index / alphabet.length) - 1
    }
    return label
  }

  // Generate next available row label
  const getNextRowLabel = () => {
    const existingLabels = rows.map((row) => row.label)

    let index = 0
    while (true) {
      const label = getLabelByIndex(index)
      if (!existingLabels.includes(label)) {
        return label
      }
      index++
    }
  }

  const createSingleRow = () => {
    const label = newRowLabel || getNextRowLabel()
    const newRow: Row = {
      id: Date.now().toString(),
      label,
      selected: false,
      seats: Array.from({ length: seatsPerRow }, (_, index) => ({
        id: `${label}${index + 1}`,
        number: index + 1,
        status: "available" as const,
      })),
    }

    setRows([...rows, newRow])
    setNewRowLabel("")
  }

  const createMultipleRows = () => {
    const newRows: Row[] = []
    const existingLabels = rows.map((row) => row.label)

    // encontrar el índice de la startingLabel
    let startIndex = 0
    while (getLabelByIndex(startIndex) !== (newRowLabel || getNextRowLabel())) {
      startIndex++
    }

    for (let i = 0; i < multipleRows; i++) {
      const label = getLabelByIndex(startIndex + i)

      if (existingLabels.includes(label)) continue

      const newRow: Row = {
        id: `${Date.now()}-${i}`,
        label,
        selected: false,
        seats: Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
          id: `${label}${seatIndex + 1}`,
          number: seatIndex + 1,
          status: "available" as const,
        })),
      }
      newRows.push(newRow)
    }

    setRows([...rows, ...newRows])
    setNewRowLabel("")
  }


  const addSeatsToRow = (rowId: string, numberOfSeats: number) => {
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const currentMaxSeat = Math.max(...row.seats.map((seat) => seat.number), 0)
          const newSeats = Array.from({ length: numberOfSeats }, (_, index) => ({
            id: `${row.label}${currentMaxSeat + index + 1}`,
            number: currentMaxSeat + index + 1,
            status: "available" as const,
          }))
          return {
            ...row,
            seats: [...row.seats, ...newSeats],
          }
        }
        return row
      }),
    )
  }

  const removeSeatsFromRow = (rowId: string, numberOfSeats: number) => {
    setRows(
      rows.map((row) => {
        if (row.id === rowId) {
          const updatedSeats = row.seats.slice(0, -numberOfSeats)
          return {
            ...row,
            seats: updatedSeats,
          }
        }
        return row
      }),
    )
  }

  const clearAllSelections = () => {
    setRows(
      rows.map((row) => ({
        ...row,
        selected: false,
        seats: row.seats.map((seat) => ({
          ...seat,
          status: seat.status === "selected" ? "available" : seat.status,
        })),
      })),
    )
    setSelectedRows([])
  }

  return (
    <div className="space-y-4">
      {/* Create Single Row */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Crear Fila Individual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="row-label">Etiqueta de Fila</Label>
            <Input
              id="row-label"
              placeholder={`Siguiente: ${getNextRowLabel()}`}
              value={newRowLabel}
              onChange={(e) => setNewRowLabel(e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seats-per-row">Asientos por Fila</Label>
            <Input
              id="seats-per-row"
              type="number"
              min="1"
              max="50"
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <Button onClick={createSingleRow} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Crear Fila
          </Button>
        </CardContent>
      </Card>

      {/* Create Multiple Rows */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Crear Múltiples Filas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="multiple-rows">Número de Filas</Label>
            <Input
              id="multiple-rows"
              type="number"
              min="1"
              max="26"
              value={multipleRows}
              onChange={(e) => setMultipleRows(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="starting-label">Etiqueta Inicial</Label>
            <Input
              id="starting-label"
              placeholder={`Desde: ${getNextRowLabel()}`}
              value={newRowLabel}
              onChange={(e) => setNewRowLabel(e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seats-per-row">Asientos por Fila</Label>
            <Input
              id="seats-per-row"
              type="number"
              min="1"
              max="50"
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <Button onClick={createMultipleRows} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Crear {multipleRows} Filas
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Row Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gestión de Filas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Filas seleccionadas:</span>
            <Badge variant="secondary">{selectedRows.length}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Asientos seleccionados:</span>
            <Badge variant="secondary">
              {rows.reduce((acc, row) => acc + row.seats.filter((seat) => seat.status === "selected").length, 0)}
            </Badge>
          </div>

          {selectedRows.length > 0 && (
            <div className="space-y-2">
              <RowLabelingDialog selectedRows={selectedRows} rows={rows} setRows={setRows}>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Tag className="w-4 h-4 mr-2" />
                  Etiquetar Filas
                </Button>
              </RowLabelingDialog>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    selectedRows.forEach((rowId) => addSeatsToRow(rowId, 1))
                  }}
                >
                  +1 Asiento
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    selectedRows.forEach((rowId) => removeSeatsFromRow(rowId, 1))
                  }}
                >
                  -1 Asiento
                </Button>
              </div>

              <DeleteConfirmationDialog
                selectedRows={selectedRows}
                rows={rows}
                setRows={setRows}
                setSelectedRows={setSelectedRows}
              >
                <Button size="sm" variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar Filas
                </Button>
              </DeleteConfirmationDialog>
            </div>
          )}

          <Button onClick={clearAllSelections} variant="outline" className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpiar Selecciones
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total de filas:</span>
            <Badge variant="outline">{rows.length}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total de asientos:</span>
            <Badge variant="outline">{rows.reduce((acc, row) => acc + row.seats.length, 0)}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Disponibles:</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {rows.reduce((acc, row) => acc + row.seats.filter((seat) => seat.status === "available").length, 0)}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Seleccionados:</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {rows.reduce((acc, row) => acc + row.seats.filter((seat) => seat.status === "selected").length, 0)}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Ocupados:</span>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              {rows.reduce((acc, row) => acc + row.seats.filter((seat) => seat.status === "occupied").length, 0)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
