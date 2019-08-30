
// Exportamos todas las interfaces para poder utilizarlas:
// Añadimos las interfaces que vamos a utilizar:
export interface RespuestaTopHeadlines {
    status: string;
    totalResults: number;
    articles: Article[];
}

// Ahora creamos la interfaz para el tipo de dato Article[]:
export interface Article {
    source: Source;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
}

// Y creamos la interfaz para el tipo de dato Source:
export interface Source {
    id?: string;
    name: string;
}