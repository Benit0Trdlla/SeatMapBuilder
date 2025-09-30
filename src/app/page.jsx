import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Grid3x3, Tags, Download, Upload, MousePointerClick, Trash2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Grid3x3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Seat Map Builder</span>
          </div>
          <Link href="/control-panel">
            <Button variant="outline">Abrir Builder</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Gestión de asientos simplificada
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
            Crea mapas de asientos de forma visual
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Diseña y administra la disposición de asientos para teatros, cines, eventos y más con una interfaz intuitiva
            y poderosa
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/control-panel">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Comenzar ahora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Todo lo que necesitas para gestionar asientos
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Herramientas poderosas diseñadas para hacer tu trabajo más fácil y eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Grid3x3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Visualización interactiva</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ve tu mapa de asientos en tiempo real con una interfaz clara y fácil de entender
            </p>
            <div className="mt-6">
              <img
                src="/interactive-seat-map-grid-visualization-with-color.jpg"
                alt="Visualización de mapa"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MousePointerClick className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Creación rápida</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crea filas individuales o múltiples con solo unos clics. Define la cantidad de asientos por fila
            </p>
            <div className="mt-6">
              <img
                src="/user-interface-for-creating-multiple-rows-of-seats.jpg"
                alt="Creación de filas"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Tags className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Etiquetado flexible</h3>
            <p className="text-muted-foreground leading-relaxed">
              Selecciona múltiples filas y asígnalas etiquetas personalizadas para organizar tu espacio
            </p>
            <div className="mt-6">
              <img
                src="/seat-rows-with-custom-labels-like-vip--general--ba.jpg"
                alt="Etiquetado de filas"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Exportar JSON</h3>
            <p className="text-muted-foreground leading-relaxed">
              Guarda tu configuración completa en formato JSON para respaldo o integración con otros sistemas
            </p>
            <div className="mt-6">
              <img
                src="/json-export-dialog-with-file-download-icon-and-cod.jpg"
                alt="Exportar JSON"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Importar JSON</h3>
            <p className="text-muted-foreground leading-relaxed">
              Carga configuraciones previas desde archivos JSON con validación automática del esquema
            </p>
            <div className="mt-6">
              <img
                src="/file-upload-interface-with-drag-and-drop-area-for-.jpg"
                alt="Importar JSON"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trash2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Gestión segura</h3>
            <p className="text-muted-foreground leading-relaxed">
              Elimina filas con confirmación para evitar errores. Selección múltiple para operaciones en lote
            </p>
            <div className="mt-6">
              <img
                src="/confirmation-dialog-for-deleting-selected-rows-wit.jpg"
                alt="Gestión segura"
                className="w-full h-auto rounded-lg border border-border/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="bg-primary/5 rounded-3xl p-12 md:p-20 text-center border border-primary/20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Comienza a crear tu mapa de asientos hoy
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            No se requiere instalación. Empieza a diseñar tu disposición de asientos en segundos
          </p>
          <Link href="/control-panel">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Abrir Builder
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Grid3x3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Seat Map Builder</span>
            </div>
            <p className="text-sm text-muted-foreground">Sistema de gestión de asientos intuitivo y poderoso</p>
          </div>
        </div>
      </footer>
    </div>
  )
}