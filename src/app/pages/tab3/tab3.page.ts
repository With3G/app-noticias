import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // Cargamos el atributo:
  sliderOpts = { // Bloqueamos que se pueda hacer slide a la izquierda o derecha:
    allowSlidePrev: false,
    allowSlideNext: false
  };
  constructor(public dataLocalService: DataLocalService) {}

}
