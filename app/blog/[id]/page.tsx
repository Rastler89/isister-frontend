import Link from "next/link"
import { petService } from "../../../services/petService"
import styles from '../../../styles/blog.module.css'
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { BlogCTA } from "../../../components/blog-cta"

// Definir las categorías del blog
const categories = [
  { id: "all", name: "Todos" },
  { id: "health", name: "Salud y bienestar" },
  { id: "nutrition", name: "Nutrición" },
  { id: "training", name: "Entrenamiento" },
  { id: "care", name: "Cuidados básicos" },
  { id: "emergency", name: "Emergencias" },
]

interface PostProps {
    params: Promise<{ id: string }>
}


export const BlogPostPage = async ({ params }: PostProps) => {
    const { id } = await params

    try {
        const article = await petService.getArticle(id)

        // Encontrar la categoría del artículo
        const category = categories.find((cat) => cat.id == article.category)

        // Encontrar artículos relacionados || Feature
        //const relatedArticles = article.relatedArticles ? articles.filter((a) => article.relatedArticles?.includes(a.id)) : []
        
        return (
            <div className="container py-8 px-4 md:px-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/blog" className="inline-flex items-center text-green-600 hover:text-green-700">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al blog
                    </Link>
                </div>

                <article className="prose prose-green max-w-none">
                    <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">{category?.name}</Badge>

                    <h1 className="text-4xl font-bold mb-4 mt-2">{article.title}</h1>

                    <div className="flex items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <time dateTime={article.date_publish}>{new Date(article.date_publish).toLocaleDateString()}</time>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.reading_time} min. de lectura</span>
                    </div>
                    </div>

                    <div className="mb-8">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${article.cover_image}`}
                        alt={article.title}
                        className="w-full h-auto rounded-lg object-cover"
                    />
                    </div>

                    <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: article.content }} />

                    {/*<div className="border-t border-b py-6 my-8 flex flex-col sm:flex-row items-center gap-4">
                    <img
                        src={article.author.image || "/placeholder.svg"}
                        alt={article.author.name}
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                        <h3 className="font-semibold">{article.author.name}</h3>
                        <p className="text-muted-foreground">{article.author.role}</p>
                    </div>
                    <div className="ml-auto">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Compartir
                        </Button>
                    </div>
                    </div>*/}

                    {/*relatedArticles.length > 0 && (
                    <div className="my-12">
                        <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                        {relatedArticles.map((related) => (
                            <div
                            key={related.id}
                            className="border border-green-100 rounded-lg p-4 hover:bg-green-50/50 transition-colors"
                            >
                            <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100">
                                {categories.find((cat) => cat.id === related.category)?.name}
                            </Badge>
                            <h3 className="font-bold mb-2">
                                <Link href={`/blog/${related.id}`} className="hover:text-green-600">
                                {related.title}
                                </Link>
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{related.excerpt}</p>
                            <div className="text-xs text-muted-foreground">
                                {new Date(related.date).toLocaleDateString()} · {related.readTime} de lectura
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    )*/}
                </article>

                <BlogCTA
                    title={article.cta_title}
                    description={article.cta_text}
                    buttonText="Probar gratis"
                    buttonLink="/auth/register"
                    variant="compact"
                />
            </div>
        )
    } catch (error) {
        console.error("Error fetching article:", error)
        //TODO: Manejar el error de manera adecuada, tal vez redirigir a una página de error o mostrar un mensaje al usuario
    }
}

export default BlogPostPage