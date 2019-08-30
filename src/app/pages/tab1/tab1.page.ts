import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    // Llamamos el metodo cargar noticias:
    this.cargarNoticias();

  }

  // Implementamos el evento de cargar noticias y cargamos las noticias nuevamente:
  loadData(event){
    // Le pasamos el evento infinite scroll:
    this.cargarNoticias(event);
  }

  // Creamos un nuevo método para no replicar la carga de noticias:
  cargarNoticias(event?){ // El método recibirá opcionalmente el evento infinite scroll
    this.noticiasService.getTopHeadlines().subscribe( resp =>{
      console.log('Noticias: ', resp);

      // Si no existen más articulos cancelamos el infinite scroll antes de volver a llamarlo:
      if(resp.articles.length === 0){
        // cancelamos la carga y luego lo damos por completo el evento:
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...resp.articles); 

      // Ahora comprobamos si existe el evento:
      if (event) {
        // Y si es así completamos la carga:
        event.target.complete();
      }
    });
  }

}
