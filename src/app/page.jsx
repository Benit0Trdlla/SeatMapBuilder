import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
    return (
        <div className="text-center">
            <h1 className="text-center font-bold text-4xl p-4">¡Bienvenido/a!</h1>
            <p>Al Editor visual para dibujar un mapa de asientos, con creación/edición de filas y asientos,
                etiquetado rápido, exportación e importación en JSON.</p>
            <div className="flex justify-center items-center p-6 gap-3">
                <Link href={"/panel-control"}><Button>Crear nuevo mapa</Button></Link>
                <Button>Importar JSON (Mapa existente)</Button>
            </div>
        </div>
    );
}