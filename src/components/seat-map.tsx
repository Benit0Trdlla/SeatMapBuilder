"use client"

import { useState } from "react"
import type { Row } from "@/app/panel-control/page"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface SeatMapProps {
  rows: Row[]
  setRows: (rows: Row[]) => void
  selectedRows: string[]
  setSelectedRows: (selectedRows: string[]) => void
}

export function SeatMap({ rows, setRows, selectedRows, setSelectedRows }: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [multiSelectMode, setMultiSelectMode] = useState(false)

  const handleSeatClick = (rowId: string, seatId: string) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              seats: row.seats.map((seat) =>
                seat.id === seatId
                  ? {
                      ...seat,
                      status:
                        seat.status === "available"
                          ? "selected"
                          : seat.status === "selected"
                            ? "available"
                            : seat.status,
                    }
                  : seat,
              ),
            }
          : row,
      ),
    )
  }

  const handleRowSelection = (rowId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowId])
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId))
    }

    // Update row selection state
    setRows(rows.map((row) => (row.id === rowId ? { ...row, selected: checked } : row)))
  }

  const isRowSelected = (rowId: string) => selectedRows.includes(rowId)

  const selectAllRows = () => {
    const allRowIds = rows.map((row) => row.id)
    setSelectedRows(allRowIds)
    setRows(rows.map((row) => ({ ...row, selected: true })))
  }

  const deselectAllRows = () => {
    setSelectedRows([])
    setRows(rows.map((row) => ({ ...row, selected: false })))
  }

  return (
    <div className="space-y-6">
      {/* Stage indicator */}
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-8 py-3 rounded-lg border-2 border-dashed border-primary/30">
          <span className="text-lg font-semibold text-foreground">ESCENARIO</span>
        </div>
      </div>

      {/* Multi-selection controls */}
      {rows.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Selección múltiple:</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={selectAllRows}>
                Seleccionar Todas
              </Button>
              <Button size="sm" variant="outline" onClick={deselectAllRows}>
                Deseleccionar Todas
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedRows.length} de {rows.length} filas seleccionadas
          </div>
        </div>
      )}

      {/* Seat map */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-200",
              isRowSelected(row.id) ? "row-selected" : "border-border bg-card",
            )}
          >
            <div className="flex items-center gap-4">
              {/* Row selection checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isRowSelected(row.id)}
                  onCheckedChange={(checked) => handleRowSelection(row.id, checked as boolean)}
                />
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center font-bold text-lg text-foreground">
                  {row.label}
                </div>
              </div>

              {/* Seats */}
              <div className="flex gap-2 flex-wrap">
                {row.seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(row.id, seat.id)}
                    className={cn(
                      "seat",
                      seat.status === "available" && "seat-available",
                      seat.status === "selected" && "seat-selected",
                      seat.status === "occupied" && "seat-occupied",
                    )}
                    disabled={seat.status === "occupied"}
                    title={`Asiento ${seat.id} - ${seat.status === "available" ? "Disponible" : seat.status === "selected" ? "Seleccionado" : "Ocupado"}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>

              {/* Row info */}
              <div className="ml-auto text-sm text-muted-foreground">
                <div>Fila {row.label}</div>
                <div>{row.seats.length} asientos</div>
                <div className="text-xs mt-1">
                  <span className="text-green-600">
                    {row.seats.filter((s) => s.status === "available").length} disp.
                  </span>
                  {" | "}
                  <span className="text-blue-600">{row.seats.filter((s) => s.status === "selected").length} sel.</span>
                  {" | "}
                  <span className="text-red-600">{row.seats.filter((s) => s.status === "occupied").length} ocup.</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🪑</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No hay filas creadas</h3>
          <p className="text-muted-foreground">Usa el panel de control para crear tu primera fila de asientos</p>
        </div>
      )}
    </div>
  )
}
