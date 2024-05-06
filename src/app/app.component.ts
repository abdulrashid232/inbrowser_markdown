import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { HeaderComponent } from './header/header.component';
import { BodyContentComponent } from "./body-content/body-content.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FormsModule, CommonModule, MarkdownModule, HeaderComponent, BodyContentComponent]
})
export class AppComponent {
  title = 'inbrowser_markdown';

  // markdown ='';
}
