import { Layout } from "@/components/layout"
import { Link } from "wouter"
import { useListProducts, useListCollections } from "@workspace/api-client-react"
import { ArrowRight } from "lucide-react"
import heroImg from "@assets/generated_images/hero.jpg"
import dropImg from "@assets/generated_images/drop.jpg"
import journal1Img from "@assets/generated_images/journal-1.jpg"

export default function Home() {
  const { data: featuredProducts } = useListProducts({ sort: "trending" })
  const { data: collections } = useListCollections({ isFeatured: true })

  const heroImage = heroImg
  const collectionImage = collections?.[0]?.heroImage || journal1Img

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[600px] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <img 
            src={heroImage} 
            alt="LWK Hero" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="container relative mx-auto px-6 z-10">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase mb-6 max-w-3xl leading-[0.9]">
            Silence<br/>Speaks.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 tracking-wide font-light">
            Luxury without noise. Own less. Wear better.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link 
              href="/shop" 
              className="bg-foreground text-background px-8 py-4 uppercase tracking-widest text-sm hover:bg-muted-foreground transition-colors"
            >
              Explore Collection
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 uppercase tracking-widest text-sm border border-border hover:border-foreground transition-colors"
            >
              The Atelier
            </Link>
          </div>
        </div>
      </section>

      {/* Categories / Entries */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Tees', href: '/shop?category=tees', image: dropImg },
              { title: 'Hoodies', href: '/shop?category=hoodies', image: heroImg },
              { title: 'Bottoms', href: '/shop?category=cargo-pants', image: journal1Img }
            ].map((cat) => (
              <Link key={cat.title} href={cat.href} className="group relative aspect-[3/4] overflow-hidden bg-background block">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 filter grayscale"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Category</span>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl tracking-widest uppercase">{cat.title}</h3>
                    <ArrowRight className="h-6 w-6 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {collections && collections.length > 0 && (
        <section className="py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Featured Drop</span>
              <h2 className="text-4xl md:text-6xl tracking-tight uppercase leading-none">
                {collections[0].name}
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                {collections[0].description}
              </p>
              <Link 
                href={`/collections/${collections[0].slug}`}
                className="inline-flex items-center gap-4 uppercase tracking-widest text-sm border-b border-primary pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
              >
                View Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 aspect-square lg:aspect-[4/5] overflow-hidden">
              <img 
                src={collectionImage} 
                alt={collections[0].name}
                className="w-full h-full object-cover filter grayscale"
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Marquee / Grid */}
      <section className="py-32 bg-background border-t border-border">
        <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
          <h2 className="text-2xl tracking-widest uppercase">Select Pieces</h2>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            View All
          </Link>
        </div>
        
        <div className="container mx-auto px-6 overflow-x-auto pb-8 snap-x">
          <div className="flex gap-6 w-max">
            {featuredProducts?.slice(0, 4).map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="w-[300px] md:w-[400px] group snap-start block"
              >
                <div className="aspect-[3/4] bg-card mb-6 overflow-hidden relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-background px-3 py-1 text-[10px] uppercase tracking-widest font-mono">
                      New
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-sm uppercase tracking-wide group-hover:text-muted-foreground transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm font-mono">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story block */}
      <section className="py-32 container mx-auto px-6 border-t border-border text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl tracking-tight uppercase leading-tight mb-8">
          Not for everyone.<br/>Exactly for you.
        </h2>
        <p className="text-muted-foreground text-lg mb-12 font-light">
          We reject the noise of seasonal trends. Every piece is engineered with precision, 
          using structural fabrics and architectural silhouettes. It's not about being seen; 
          it's about being recognized by those who know.
        </p>
        <Link 
          href="/about" 
          className="uppercase tracking-widest text-sm border-b border-primary pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
        >
          Discover The Process
        </Link>
      </section>
    </Layout>
  )
}
