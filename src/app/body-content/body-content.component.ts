import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-body-content',
    standalone: true,
    templateUrl: './body-content.component.html',
    styleUrl: './body-content.component.css',
    imports: [MarkdownModule, FormsModule,CommonModule]
})
export class BodyContentComponent {
    markdown = '';
    documents:[]= []

    selectedDocument: any;
    previewShow:boolean = false;
    

    constructor( private elementRef: ElementRef, private dataService: DataService) {}

    showPreview(){
          const textInput = document.getElementById('textInput');
          const verticalLine = document.getElementById('vertical-line');
          this.previewShow = !this.previewShow; 
          if (this.previewShow) {
              textInput.style.display = 'none';   
              verticalLine.style.display = 'none';   
          } else {
              textInput.style.display = 'block';   
              verticalLine.style.display = 'block';   
          }
      
      
    }

     
      adjustTextareaHeight() {
        const textarea = this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px';

        // this.adjustVerticalLineHeight();
      }
      adjustVerticalLineHeight() {
        const textareaHeight = document.querySelector('.textarea-container');
        const verticalLine = document.querySelector('.vertical-line');
        verticalLine.setAttribute('height', `${textareaHeight}px`);
      }
      
      ngOnInit() {
        this.dataService.fetchData().subscribe((note)=>{
          this.documents = note;
          console.log(this.documents);

          // this.documents.forEach((doc:any)=>{
          //   console.log(doc.content);
          // });

          this.dataService.selectedDocument$.subscribe((document)=>{
            this.selectedDocument = document;
          });
        })
        this.adjustTextareaHeight();
        this.adjustVerticalLineHeight();
      }
      


}
