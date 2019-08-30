import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() noticias: Article[] = [];
  // Creamos un input para comprobar si estamos en favoritos y lo definimos en false:
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
