import { Component } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent,RouterLink],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
