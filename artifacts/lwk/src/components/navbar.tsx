import * as React from "react"
import { Link, useLocation } from "wouter"
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { items: cartItems, setIsOpen: setCartOpen } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [location] = useLocation()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/collections/latest", label: "Latest Drop" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "Atelier" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-500 ease-out border-b border-transparent",
        isScrolled || mobileMenuOpen ? "bg-background/95 backdrop-blur-md border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <button 
            className="md:hidden mr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-xs uppercase tracking-widest hover:text-primary transition-colors",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] uppercase mix-blend-difference">
            LWK
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          <Link href="/shop" className="hidden sm:flex text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" className="text-muted-foreground hover:text-primary transition-colors relative">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-mono">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setCartOpen(true)}
            className="text-muted-foreground hover:text-primary transition-colors relative"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-mono">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 top-20 bg-background border-t border-border transition-transform duration-300 ease-in-out px-6 py-8 flex flex-col gap-6",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="text-2xl uppercase tracking-wider text-primary"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-4 text-sm text-muted-foreground uppercase tracking-widest">
          <Link href="/wishlist">Wishlist ({wishlistItems.length})</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </header>
  )
}
