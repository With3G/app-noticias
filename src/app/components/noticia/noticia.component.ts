import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// Importamos la librería platform:
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, 
              private actionSheetController: ActionSheetController, 
              private socialSharing: SocialSharing, 
              private dataLocalService: DataLocalService,
              private platform: Platform ) { } // Creamos el objeto platform.

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    let guardarBorrarBtn;
    if(this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    }else{ 
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => { 
          // Ahora llamamos nuestro nuevo método en lugar de ejecutar el share directamente:
          this.compartirNoticia();
          
        }
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelar');
        }
      }
    ]
    });

    await actionSheet.present();
  }

  // Creamos un método para compartir noticia:
  compartirNoticia(){
    // Comprobamos la plataforma:
    if(this.platform.is('cordova')){ // Si es cordova ejecutamos el share de cordova.
      this.socialSharing.share(
        this.noticia.title, 
        this.noticia.source.name, 
        '',
        this.noticia.url 
      );
    }else{ // Si es un navegador utilizaremos el web API:
      if(navigator['share']){
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url
        })
        .then(()=> console.log('Compartido correctamente'))
        .catch((error)=> console.log('Error al compartir', error));
      }else { // Si el navegador no soporta la opción de compartir lanzamos un mensaje:
        console.log('El navegador no soporta la opción compartir');
      }
    }
    
  }

}
