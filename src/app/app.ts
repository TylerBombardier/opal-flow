import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraphService } from './services/graph-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('opal-flow');
}
