import { Layout } from "@/components/layout"
import atelierImg from "@assets/generated_images/atelier.jpg"
import dropImg from "@assets/generated_images/drop.jpg"

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <header className="mb-24 text-center">
          <h1 className="text-5xl md:text-8xl tracking-tighter uppercase mb-8">The Atelier</h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            LWK (Lowkey Always) was founded on the principle that true luxury doesn't need to shout.
          </p>
        </header>

        <div className="space-y-32">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-card overflow-hidden">
              <img 
                src={atelierImg} 
                alt="Atelier interior" 
                className="w-full h-full object-cover filter grayscale opacity-80"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl tracking-widest uppercase">Philosophy</h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:font-light">
                <p>We believe in the power of restraint. In a world saturated with logos, neon, and desperate grabs for attention, silence becomes the ultimate flex.</p>
                <p>Every garment we produce is an exercise in subtraction. We remove the unnecessary until only the essential remains: cut, drape, fabric, and hardware.</p>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-2xl tracking-widest uppercase">Construction</h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:font-light">
                <p>Our fabrics are custom-milled to exact specifications, favoring heavy-weight cottons, technical nylons, and structured wools that hold their architectural shape.</p>
                <p>Hardware is custom-cast in matte metallic finishes. Seams are reinforced. Washes are applied meticulously to create a lived-in, underground aesthetic straight from the rack.</p>
              </div>
            </div>
            <div className="aspect-square bg-card overflow-hidden order-1 md:order-2">
              <img 
                src={dropImg} 
                alt="Fabric detail" 
                className="w-full h-full object-cover filter grayscale opacity-80"
              />
            </div>
          </section>

          <section className="text-center py-12 border-t border-border">
            <h2 className="text-3xl tracking-widest uppercase mb-6">Exclusivity</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              We operate outside the traditional fashion calendar. We drop when a collection is ready. Quantities are strictly limited to maintain the integrity of our production process and the exclusivity of the brand.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
