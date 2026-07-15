import { Link } from "wouter"
import { useSubscribeNewsletter } from "@workspace/api-client-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowRight } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const subscribe = useSubscribeNewsletter()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        setSubscribed(true)
        setEmail("")
      }
    })
  }

  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-xl tracking-widest uppercase">LWK</h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            Silence speaks. Luxury without noise. <br/>
            Exclusive techwear-adjacent streetwear. Designed in the shadows.
          </p>
          <form onSubmit={handleSubscribe} className="flex max-w-sm pt-4">
            {subscribed ? (
              <p className="text-sm font-mono text-muted-foreground border-b border-border py-2">Subscribed to the inner circle.</p>
            ) : (
              <div className="relative w-full">
                <Input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-12 text-xs uppercase tracking-widest border-b border-border bg-transparent focus-visible:border-primary" 
                />
                <button 
                  type="submit" 
                  disabled={subscribe.isPending}
                  className="absolute right-0 top-0 bottom-0 px-3 hover:text-primary transition-colors text-muted-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Shop</h3>
          <ul className="space-y-3">
            <li><Link href="/shop" className="text-sm hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=tees" className="text-sm hover:text-primary transition-colors">Tees</Link></li>
            <li><Link href="/shop?category=hoodies" className="text-sm hover:text-primary transition-colors">Hoodies</Link></li>
            <li><Link href="/shop?category=cargo-pants" className="text-sm hover:text-primary transition-colors">Bottoms</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Atelier</h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About LWK</Link></li>
            <li><Link href="/journal" className="text-sm hover:text-primary transition-colors">Journal</Link></li>
            <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Policies</h3>
          <ul className="space-y-3">
            <li><Link href="/faq" className="text-sm hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="/shipping-returns" className="text-sm hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          © {new Date().getFullYear()} LOWKEY ALWAYS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest">Instagram</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
