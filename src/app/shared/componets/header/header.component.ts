import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string; //se coloca el simbolo de admiracion para que no detect el error por no inicializar la variable 
  @Input() backButton!: string; // boton para volver a la pagina, en el apartado de Registro
  

  constructor() { }

  ngOnInit() {}

}
