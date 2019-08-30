import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
// Importamos la librería toastcontroller:
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  // creamos el objeto toast:
  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
   }

  // Creamos el metodo del toast que recibirá un mensaje:
  async presentToast(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    // presentamos el toast:
    toast.present();
  }

  guardarNoticia(noticia: Article){
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
    // Cargamos el mensaje en el toast:
    this.presentToast('Añadido a favoritos');

  }

  async cargarFavoritos(){
  const favoritos = await this.storage.get('favoritos');
  
  if(favoritos){
    this.noticias = favoritos;
  }

  }

  borrarNoticia (noticia: Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    // Cargamos el mensaje en el toast:
    this.presentToast('Eliminado de favoritos');
  }


}
