import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { routes } from './app.routes'; // Import your routes configuration

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'swk5-nextstop';
}
