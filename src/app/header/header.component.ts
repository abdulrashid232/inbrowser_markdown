// Inside header.component.ts

import { Component } from '@angular/core';
import { BodyContentComponent } from "../body-content/body-content.component";
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { Document } from '../service/document';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [BodyContentComponent, CommonModule]
})
export class HeaderComponent {
  documents: any[] = []

  selectedDocument: any;
  


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe((note) => {
      this.documents = note;

    });
    this.dataService.selectedDocument$.subscribe((document) => {
      this.selectedDocument = document;
    });
  }
  createNewDocument() {
    const newDocument: Document = {
      createdAt: `${new Date().toLocaleDateString()}`,
      name: "New Document",
      content: ""
    };
    this.documents.push(newDocument);
    this.dataService.setSelectedDocument(newDocument);
  }

  openNav() {
    const sidebar = document.getElementById("Sidebar");
    const header = document.querySelector("header");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const save_Delete_Div = document.getElementById("save&deleteDocument");
    const contentContainer = document.getElementById("contentContainer");

    sidebar.style.width = "250px";
    header.style.marginLeft = "250px";
    menuButton.classList.add('hidden');
    closeButton.classList.remove('hidden');
    closeButton.classList.add('flex');
    save_Delete_Div.classList.add('hidden');
    // contentContainer.style.marginLeft = "20%"; 
    contentContainer.style.transform = "translateX(250px)";
  }

  closeNav() {
    const sidebar = document.getElementById("Sidebar");
    const header = document.querySelector("header");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const save_Delete_Div = document.getElementById("save&deleteDocument");
    const contentContainer = document.getElementById("contentContainer");

    sidebar.style.width = "0";
    header.style.marginLeft = "0";
    menuButton.classList.remove('hidden');
    closeButton.classList.remove('flex');
    closeButton.classList.add('hidden');
    save_Delete_Div.classList.remove('hidden');
    contentContainer.style.transform = "translateX(0)";
  }

  viewDocument(document: any) {
    this.dataService.setSelectedDocument(document);
    console.log(document);
  }

  
  saveChanges() {
    if (this.selectedDocument) {

      const nameInput = document.querySelector('.nameInput') as HTMLInputElement;
      const index = this.documents.findIndex(doc => doc === this.selectedDocument);
      if (index !== -1) {
        this.documents[index].content = this.selectedDocument.content;
        if( nameInput.value){
          this.documents[index].name = this.selectedDocument.name = nameInput.value;
        }
        console.log(this.documents[index]);
        
        
        // this.dataService.updateDocument(this.documents[index]);
      }
      nameInput.value = '';
    }

  }
}
