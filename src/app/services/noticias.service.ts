import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
  headlinesPage = 0;
  // Creamos dos atributos que contendrán la categoría seleccionada y la página:
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery(query: string){
    query = this.apiUrl + query + '&apiKey=' + this.apiKey;
    return this.http.get<RespuestaTopHeadlines>(query);

  }


  getTopHeadlines(){
    this.headlinesPage ++;
    return this.ejecutarQuery(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria(categoria: string){
    // Cada vez que hacemos infinite scroll ejecuta nuevamente la carga, pues vamos a verificar que permanezca en la misma categoría:
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else { // Si no es la misma página (la primera vez no lo será) guardaremos la categoría en donde nos encontramos:
      this.categoriaActual = categoria;
    }
    // modificamos categorias por this.categoriasPage y también mandamos ahora también la página:
    return this.ejecutarQuery(`/top-headlines?country=us&category=${this.categoriaActual}&page=${this.categoriaPage}`)
  }

}
