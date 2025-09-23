"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { Row } from "@/app/control-panel/page"
import { Tag, Check } from "lucide-react"

interface RowLabelingDialogProps {
  selectedRows: string[]
  rows: Row[]
  setRows: (rows: Row[]) => void
  children: React.ReactNode
}

export function RowLabelingDialog({ selectedRows, rows, setRows, children }: RowLabelingDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newLabels, setNewLabels] = useState<Record<string, string>>({})

  const selectedRowsData = rows.filter((row) => selectedRows.includes(row.id))

  const handleLabelChange = (rowId: string, newLabel: string) => {
    setNewLabels((prev) => ({
      ...prev,
      [rowId]: newLabel.toUpperCase(),
    }))
  }

  const applyLabels = () => {
    setRows(
      rows.map((row) => {
        if (selectedRows.includes(row.id) && newLabels[row.id]) {
          return {
            ...row,
            label: newLabels[row.id],
            seats: row.seats.map((seat) => ({
              ...seat,
              id: `${newLabels[row.id]}${seat.number}`,
            })),
          }
        }
        return row
      }),
    )
    setNewLabels({})
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Etiquetar Filas Seleccionadas
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Filas seleccionadas:</span>
            <Badge variant="secondary">{selectedRows.length}</Badge>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {selectedRowsData.map((row) => (
              <div key={row.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center font-bold text-sm">
                  {row.label}
                </div>
                <div className="flex-1">
                  <Label htmlFor={`label-${row.id}`} className="text-sm">
                    Nueva etiqueta:
                  </Label>
                  <Input
                    id={`label-${row.id}`}
                    value={newLabels[row.id] || ""}
                    onChange={(e) => handleLabelChange(row.id, e.target.value)}
                    placeholder={row.label}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={applyLabels} className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Aplicar Cambios
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
