"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import type { Row } from "@/app/control-panel/page"
interface ImportJsonDialogProps {
    children: React.ReactNode
    setRows: (rows: Row[]) => void
    setSelectedRows: (selectedRows: string[]) => void
}

interface ImportedData {
    name: string
    createdAt: string
    statistics: {
        totalRows: number
        totalSeats: number
        availableSeats: number
        selectedSeats: number
        occupiedSeats: number
    }
    rows: Row[]
}

export function ImportJsonDialog({ children, setRows, setSelectedRows }: ImportJsonDialogProps) {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)
    const [validationSuccess, setValidationSuccess] = useState<string | null>(null)
    const [isValidating, setIsValidating] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateJsonSchema = (data: any): { isValid: boolean; error?: string; mapName?: string } => {
        try {
            // Check if it's an object
            if (!data || typeof data !== "object") {
                return { isValid: false, error: "El archivo debe contener un objeto JSON válido" }
            }
            // Check required top-level properties
            if (!data.mapName || typeof data.mapName !== "string") {
                return { isValid: false, error: "Falta la propiedad 'name' o no es una cadena válida" }
            }

            if (!data.rows || !Array.isArray(data.rows)) {
                return { isValid: false, error: "Falta la propiedad 'rows' o no es un array válido" }
            }

            // Validate each row
            for (let i = 0; i < data.rows.length; i++) {
                const row = data.rows[i]

                if (!row.id || typeof row.id !== "string") {
                    return { isValid: false, error: `Fila ${i + 1}: falta 'id' o no es una cadena válida` }
                }

                if (!row.label || typeof row.label !== "string") {
                    return { isValid: false, error: `Fila ${i + 1}: falta 'label' o no es una cadena válida` }
                }

                // if (typeof row.selected !== "boolean") {
                //     return { isValid: false, error: `Fila ${i + 1}: 'selected' debe ser un booleano` }
                // }

                if (!row.seats || !Array.isArray(row.seats)) {
                    return { isValid: false, error: `Fila ${i + 1}: falta 'seats' o no es un array válido` }
                }

                // Validate each seat
                for (let j = 0; j < row.seats.length; j++) {
                    const seat = row.seats[j]

                    if (!seat.id || typeof seat.id !== "string") {
                        return { isValid: false, error: `Fila ${i + 1}, Asiento ${j + 1}: falta 'id' o no es una cadena válida` }
                    }

                    if (typeof seat.number !== "number") {
                        return { isValid: false, error: `Fila ${i + 1}, Asiento ${j + 1}: 'number' debe ser un número` }
                    }

                    if (!["available", "selected", "occupied"].includes(seat.status)) {
                        return {
                            isValid: false,
                            error: `Fila ${i + 1}, Asiento ${j + 1}: 'status' debe ser 'available', 'selected' o 'occupied'`,
                        }
                    }
                }
            }

            return { isValid: true, mapName: data.mapName }
        } catch (error) {
            return { isValid: false, error: "Error al validar el esquema JSON" }
        }
    }

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setSelectedFile(file)
        setValidationError(null)
        setValidationSuccess(null)
        setIsValidating(true)

        try {
            const text = await file.text()
            const data = JSON.parse(text)


            const validation = validateJsonSchema(data)

            if (validation.isValid) {
                setValidationSuccess(`Archivo válido: "${validation.mapName}"`)
            } else {
                setValidationError(validation.error || "Error de validación desconocido")
            }
        } catch (error) {
            setValidationError("El archivo no contiene JSON válido")
        } finally {
            setIsValidating(false)
        }
    }

    const handleImport = async () => {
        if (!selectedFile) return

        try {
            const text = await selectedFile.text()
            const data: ImportedData = JSON.parse(text)

            const validation = validateJsonSchema(data)
            if (!validation.isValid) {
                setValidationError(validation.error || "Error de validación")
                return
            }

            setSelectedRows([])
            setRows(
                data.rows.map((row) => ({
                    ...row,
                    selected: false, // Reset selection state
                })),
            )

            setOpen(false)
            setSelectedFile(null)
            setValidationError(null)
            setValidationSuccess(null)
        } catch (error) {
            setValidationError("Error al importar el archivo")
        }
    }

    const resetDialog = () => {
        setSelectedFile(null)
        setValidationError(null)
        setValidationSuccess(null)
        setIsValidating(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen)
                if (!newOpen) {
                    resetDialog()
                }
            }}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Importar Mapa desde JSON
                    </DialogTitle>
                    <DialogDescription>
                        Selecciona un archivo JSON con el esquema del mapa de asientos para importar. Esto reemplazará el mapa
                        actual.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="json-file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Haz clic para subir</span> o arrastra el archivo
                                </p>
                                <p className="text-xs text-muted-foreground">Solo archivos JSON</p>
                            </div>
                            <input
                                ref={fileInputRef}
                                id="json-file-upload"
                                type="file"
                                accept=".json"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </label>
                    </div>

                    {selectedFile && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span className="text-sm font-medium">{selectedFile.name}</span>
                                <span className="text-xs text-muted-foreground">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                            </div>
                        </div>
                    )}

                    {isValidating && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>Validando archivo...</AlertDescription>
                        </Alert>
                    )}

                    {validationError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{validationError}</AlertDescription>
                        </Alert>
                    )}

                    {validationSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{validationSuccess}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleImport} disabled={!selectedFile || !!validationError || isValidating}>
                        <Upload className="w-4 h-4 mr-2" />
                        Importar Mapa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
