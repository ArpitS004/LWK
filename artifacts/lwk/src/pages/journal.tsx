import { Layout } from "@/components/layout"
import journal1Img from "@assets/generated_images/journal-1.jpg"
import journal2Img from "@assets/generated_images/journal-2.jpg"
import atelierImg from "@assets/generated_images/atelier.jpg"
import heroImg from "@assets/generated_images/hero.jpg"

export default function Journal() {
  const posts = [
    {
      title: "Edition 01: The Brutalist Form",
      category: "Lookbook",
      date: "OCT 2023",
      image: journal1Img
    },
    {
      title: "Hardware & Weight: The New Accessories",
      category: "Process",
      date: "SEP 2023",
      image: journal2Img
    },
    {
      title: "Inside the Atelier",
      category: "Behind the scenes",
      date: "AUG 2023",
      image: atelierImg
    },
    {
      title: "Edition 00: Origin",
      category: "Lookbook",
      date: "JUL 2023",
      image: heroImg
    }
  ]

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 md:py-24">
        <header className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase mb-6">
            Journal
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg font-light">
            Visual essays, lookbooks, and thoughts from inside the studio.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {posts.map((post, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-card mb-6 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover filter grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                    {post.category}
                  </span>
                  <h2 className="text-xl uppercase tracking-widest group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase">{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}
