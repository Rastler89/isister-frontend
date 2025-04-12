'use client'

import { Dog, Cat, Apple, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { BlogCTA } from '../../components/blog-cta'
import { useEffect, useState } from 'react'
import { petService } from '../../services/petService'

// Definir las categorías del blog
const categories = [
  { id: 'all', name: 'Todos', icon: <Dog className='h-4 w-4' /> },
  { id: 'health', name: 'Salud y bienestar', icon: <Stethoscope className='h-4 w-4' /> },
  { id: 'nutrition', name: 'Nutrición', icon: <Apple className='h-4 w-4' /> },
  { id: 'training', name: 'Entrenamiento', icon: <Dog className='h-4 w-4' /> },
  { id: 'care', name: 'Cuidados básicos', icon: <Cat className='h-4 w-4' /> },
  { id: 'emergency', name: 'Emergencias', icon: <AlertCircle className='h-4 w-4' /> },
]

// Datos de ejemplo para los artículos


export const BlogPage = () => {
    const [articles, setArticles] = useState();
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        // Simulando una llamada a la API para obtener artículos
        try {
            const response = await petService.getArticles();
            setArticles(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    useEffect(() => {
        fetchArticles();
    },[]);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='loader'></div>
            </div>
        )
    }

    return (
        <div className='container py-8 px-4 md:px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
            <div>
            <h1 className='text-3xl font-bold tracking-tight'>Blog de Isister</h1>
            <p className='text-muted-foreground'>Consejos, guías y recursos para el cuidado óptimo de tus mascotas</p>
            </div>
        </div>

        <Tabs defaultValue='all' className='space-y-8'>
            <div className='overflow-auto pb-2'>
            <TabsList className='inline-flex h-auto p-1 bg-green-50'>
                {categories.map((category) => (
                <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className='flex items-center gap-2 data-[state=active]:bg-green-300/50 px-3 py-1.5 text-sm'
                >
                    {category.icon}
                    {category.name}
                </TabsTrigger>
                ))}
            </TabsList>
            </div>

            {/* Contenido para 'Todos' */}
            <TabsContent value='all' className='space-y-8'>
            {/* Artículo destacado */}
            {articles
                .filter((article) => article.featured)
                .map((article) => (
                <Card key={article.id} className='overflow-hidden border-green-100'>
                    <div className='md:flex'>
                    <div className='md:w-1/3'>
                        <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${article.cover_image}`}
                        alt={article.title}
                        className='h-full w-full object-cover'
                        />
                    </div>
                    <div className='md:w-2/3 p-6'>
                        <Badge className='mb-2 bg-green-100 text-green-700 hover:bg-green-100'>
                        {categories.find((cat) => cat.id === article.category)?.name}
                        </Badge>
                        <h2 className='text-2xl font-bold mb-2'>{article.title}</h2>
                        <p className='text-muted-foreground mb-4'>{article.description}</p>
                        <div className='flex justify-between items-center'>
                        <div className='text-sm text-muted-foreground'>
                            {new Date(article.date_publish).toLocaleDateString()} · {article.reading_time} min. de lectura
                        </div>
                        <Button asChild className='bg-green-600 hover:bg-green-700'>
                            <Link href={`/blog/${article.slug}`}>
                            Leer más <ArrowRight className='ml-2 h-4 w-4' />
                            </Link>
                        </Button>
                        </div>
                    </div>
                    </div>
                </Card>
                ))}

            {/* Grid de artículos */}
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {articles
                .filter((article) => !article.featured)
                .map((article) => (
                    <Card
                    key={article.id}
                    className='overflow-hidden border-green-100 hover:border-green-200 transition-all'
                    >
                    <div className='aspect-video relative'>
                        <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${article.cover_image}`}
                        alt={article.title}
                        className='h-full w-full object-cover'
                        />
                    </div>
                    <CardContent className='p-6'>
                        <Badge className='mb-2 bg-green-100 text-green-700 hover:bg-green-100'>
                        {categories.find((cat) => cat.id === article.category)?.name}
                        </Badge>
                        <CardTitle className='text-xl mb-2'>{article.title}</CardTitle>
                        <CardDescription className='mb-4'>{article.description}</CardDescription>
                        <div className='flex justify-between items-center'>
                        <div className='text-sm text-muted-foreground'>
                            {new Date(article.date_publish).toLocaleDateString()} · {article.reading_time} min. de lectura
                        </div>
                        </div>
                    </CardContent>
                    <CardFooter className='pt-0 pb-6 px-6'>
                        <Button
                        asChild
                        variant='outline'
                        className='w-full border-green-200 text-green-700 hover:bg-green-50'
                        >
                        <Link href={`/blog/${article.slug}`}>
                            Leer más <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
            </div>
            </TabsContent>

            {/* Contenido para cada categoría */}
            {categories
            .filter((cat) => cat.id !== 'all')
            .map((category) => (
                <TabsContent key={category.id} value={category.id} className='space-y-8'>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {articles
                    .filter((article) => article.category === category.id)
                    .map((article) => (
                        <Card
                        key={article.id}
                        className='overflow-hidden border-green-100 hover:border-green-200 transition-all'
                        >
                        <div className='aspect-video relative'>
                            <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${article.cover_image}`}
                            alt={article.title}
                            className='h-full w-full object-cover'
                            />
                        </div>
                        <CardContent className='p-6'>
                            <Badge className='mb-2 bg-green-100 text-green-700 hover:bg-green-100'>
                            {categories.find((cat) => cat.id === article.category)?.name}
                            </Badge>
                            <CardTitle className='text-xl mb-2'>{article.title}</CardTitle>
                            <CardDescription className='mb-4'>{article.description}</CardDescription>
                            <div className='flex justify-between items-center'>
                            <div className='text-sm text-muted-foreground'>
                                {new Date(article.date_publish).toLocaleDateString()} · {article.reading_time} min. de lectura
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter className='pt-0 pb-6 px-6'>
                            <Button
                            asChild
                            variant='outline'
                            className='w-full border-green-200 text-green-700 hover:bg-green-50'
                            >
                            <Link href={`/blog/${article.slug}`}>
                                Leer más <ArrowRight className='ml-2 h-4 w-4' />
                            </Link>
                            </Button>
                        </CardFooter>
                        </Card>
                    ))}
                </div>

                {articles.filter((article) => article.category === category.id).length === 0 && (
                    <div className='text-center py-12'>
                    <Dog className='mx-auto h-12 w-12 text-muted-foreground' />
                    <h3 className='mt-4 text-lg font-semibold'>No hay artículos en esta categoría</h3>
                    <p className='text-muted-foreground'>Estamos trabajando en nuevos contenidos. ¡Vuelve pronto!</p>
                    </div>
                )}
                </TabsContent>
            ))}
        </Tabs>

        <BlogCTA
            title='¿Quieres llevar un mejor control de la salud de tu mascota?'
            description='Registra vacunas, visitas al veterinario, peso y más con nuestra plataforma.'
            buttonText='Comenzar ahora'
            buttonLink='/auth/register'
        />
        </div>
    )
}

export default BlogPage