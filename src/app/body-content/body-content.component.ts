import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-body-content',
    standalone: true,
    templateUrl: './body-content.component.html',
    styleUrl: './body-content.component.css',
    imports: [MarkdownModule, FormsModule]
})
export class BodyContentComponent {
    markdown = '';

    constructor( private elementRef: ElementRef) {}



     
      adjustTextareaHeight() {
        const textarea = this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px';

        // this.adjustVerticalLineHeight();
      }
      adjustVerticalLineHeight() {
        const textareaHeight = document.querySelector('.textarea-container').clientHeight;
        const verticalLine = document.querySelector('.vertical-line');
        verticalLine.setAttribute('height', `${textareaHeight}px`);
      }
      
      ngOnInit() {
        this.adjustTextareaHeight();
        this.adjustVerticalLineHeight();
      }
      


}
