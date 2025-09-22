"use client"

import { cn } from "@/lib/utils"
import type { Seat } from "@/app/page"

interface SeatComponentProps {
  seat: Seat
  onClick: () => void
  disabled?: boolean
}

export function SeatComponent({ seat, onClick, disabled = false }: SeatComponentProps) {
  const getSeatStatusColor = (status: Seat["status"]) => {
    switch (status) {
      case "available":
        return "seat-available"
      case "selected":
        return "seat-selected"
      case "occupied":
        return "seat-occupied"
      default:
        return "seat-available"
    }
  }

  const getSeatStatusText = (status: Seat["status"]) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "selected":
        return "Seleccionado"
      case "occupied":
        return "Ocupado"
      default:
        return "Disponible"
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || seat.status === "occupied"}
      className={cn("seat", getSeatStatusColor(seat.status), disabled && "opacity-50 cursor-not-allowed")}
      title={`Asiento ${seat.number} - ${getSeatStatusText(seat.status)}`}
    >
      {seat.number}
    </button>
  )
}
