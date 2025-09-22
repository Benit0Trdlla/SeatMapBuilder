"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import type { Row } from "@/app/panel-control/page"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteConfirmationDialogProps {
  selectedRows: string[]
  rows: Row[]
  setRows: (rows: Row[]) => void
  setSelectedRows: (selectedRows: string[]) => void
  children: React.ReactNode
}

export function DeleteConfirmationDialog({
  selectedRows,
  rows,
  setRows,
  setSelectedRows,
  children,
}: DeleteConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedRowsData = rows.filter((row) => selectedRows.includes(row.id))
  const totalSeats = selectedRowsData.reduce((acc, row) => acc + row.seats.length, 0)
  const occupiedSeats = selectedRowsData.reduce(
    (acc, row) => acc + row.seats.filter((seat) => seat.status === "occupied").length,
    0,
  )

  const handleDelete = () => {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)))
    setSelectedRows([])
    setIsOpen(false)
  }

  if (selectedRows.length === 0) {
    return null
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Confirmar Eliminación
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>¿Estás seguro de que deseas eliminar las siguientes filas?</p>

            <div className="bg-muted p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Filas a eliminar:</span>
                <Badge variant="destructive">{selectedRows.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedRowsData.map((row) => (
                  <Badge key={row.id} variant="outline" className="text-xs">
                    {row.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-800">Total de asientos:</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {totalSeats}
                </Badge>
              </div>
              {occupiedSeats > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-800">Asientos ocupados:</span>
                  <Badge variant="destructive" className="text-xs">
                    {occupiedSeats}
                  </Badge>
                </div>
              )}
            </div>

            {occupiedSeats > 0 && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ Advertencia: Hay {occupiedSeats} asientos ocupados que se perderán permanentemente.
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer. Todos los datos de las filas seleccionadas se eliminarán
              permanentemente.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar {selectedRows.length} {selectedRows.length === 1 ? "Fila" : "Filas"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
