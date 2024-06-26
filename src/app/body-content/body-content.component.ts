import { Component, ElementRef } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-body-content',
  standalone: true,
  templateUrl: './body-content.component.html',
  styleUrl: './body-content.component.css',
  imports: [MarkdownModule, FormsModule, CommonModule]
})
export class BodyContentComponent {
  markdown = '';
  documents: any[] = []

  selectedDocument: any;
  previewShow: boolean = false;


  constructor(private elementRef: ElementRef, private dataService: DataService) { }

  ngOnInit() {

    this.fetchDocuments()
    this.dataService.selectedDocument$.subscribe((document) => {
      this.selectedDocument = document;
    });
  }

  showPreview() {
    const textInput = document.getElementById('textInput');
    const verticalLine = document.getElementById('line');
    this.previewShow = !this.previewShow;
    if (this.previewShow) {
      textInput.style.display = 'none';
      verticalLine.style.display = 'none';
    } else {
      textInput.style.display = 'block';
      verticalLine.style.display = 'block';
    }
  }
  mobileShowPreview(){
    console.log("clicked");
    const textInput = document.getElementById('textInput');
    const markDownPreview = document.getElementById('markDown-Preview');
    this.previewShow = !this.previewShow;
    if (this.previewShow) {
      textInput.style.display = 'none';
      markDownPreview.classList.add('show');
    } 
    else {
      textInput.style.display = 'block';
      markDownPreview.classList.remove('show');
    }
    
  }


  adjustTextareaHeight() {
    const textarea = this.elementRef.nativeElement.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      
    }

  }




  fetchDocuments() {
    this.dataService.fetchData().subscribe((documents) => {
      this.documents = documents;
    });
  }





}
