
import { Metadata } from 'next'
import Blog from './Blog'



// Datos de ejemplo para los artículos

export const metadata: Metadata = {
    title: 'Blog de Isister',
    description: 'Consejos, guías y recursos para el cuidado óptimo de tus mascotas',
}

export const BlogPage = () => {
    return (
        <Blog />
    )
}
export default BlogPage