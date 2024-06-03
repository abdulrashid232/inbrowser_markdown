import { Component, HostListener, OnDestroy } from '@angular/core';
import { BodyContentComponent } from "../body-content/body-content.component";
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { Document } from '../interfaces/document';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [BodyContentComponent, CommonModule]
})
export class HeaderComponent {
  documents: Document[] = [];
  selectedDocument: Document | null = null;
  isDarkTheme: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchDocuments();
    this.loadSelectedDocument();
    this.dataService.selectedDocument$.subscribe((document) => {
      this.selectedDocument = document;
      this.saveSelectedDocument();
    });
    this.loadTheme();
  }

  ngOnDestroy() {
    this.handleUnsavedDocument();
  }

  fetchDocuments() {
    this.dataService.fetchData().subscribe((documents) => {
      this.documents = documents;
      if (this.documents.length > 0 && !this.selectedDocument) {
        this.selectLatestDocument();
      }
    });
  }

  selectLatestDocument() {
    const latestDocument = this.documents[this.documents.length - 1];
    this.dataService.setSelectedDocument(latestDocument);
  }

  selectNextDocument() {
    const nextDocument = this.documents.length > 0 ? this.documents[this.documents.length - 1] : null;
    this.dataService.setSelectedDocument(nextDocument);
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

  viewDocument(document: Document) {
    this.dataService.setSelectedDocument(document);
    console.log(document);
  }

  saveChanges() {
    if (this.selectedDocument) {
      const nameInput = document.querySelector('.nameInput') as HTMLInputElement;
      const index = this.documents.findIndex(doc => doc === this.selectedDocument);
      if (index !== -1) {
        this.documents[index].content = this.selectedDocument.content;
        if (nameInput.value) {
          this.documents[index].name = this.selectedDocument.name = nameInput.value;
        }
        this.dataService.saveData(this.documents);
        console.log(this.documents[index]);
      }
      nameInput.value = '';
      this.clearSelectedDocument();
    }
  }

  deleteDocument() {
    if (this.selectedDocument) {
      this.documents = this.documents.filter(doc => doc !== this.selectedDocument);
      this.dataService.saveData(this.documents);
      if (this.documents.length > 0) {
        this.selectNextDocument();
      } else {
        this.selectedDocument = null;
        this.dataService.setSelectedDocument(null);
      }
      this.closePopup();
    }
  }

  confirmDelete() {
    const popup = document.getElementById('deletePopUp');
    if (popup) {
      popup.classList.remove('hidden');
      popup.classList.add('flex');
    }
  }

  closePopup() {
    const popup = document.getElementById('deletePopUp');
    if (popup) {
      popup.classList.remove('flex');
      popup.classList.add('hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const popup = document.getElementById('deletePopUp');
    if (event.target === popup) {
      this.closePopup();
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
      this.applyTheme();
    }
  }

  applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  saveSelectedDocument() {
    if (this.selectedDocument) {
      localStorage.setItem('selectedDocument', JSON.stringify(this.selectedDocument));
    }
  }

  loadSelectedDocument() {
    const savedDocument = localStorage.getItem('selectedDocument');
    if (savedDocument) {
      this.selectedDocument = JSON.parse(savedDocument);
      this.dataService.setSelectedDocument(this.selectedDocument);
    }
  }

  clearSelectedDocument() {
    localStorage.removeItem('selectedDocument');
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    this.handleUnsavedDocument();
  }

  handleUnsavedDocument() {
    if (this.selectedDocument && (!this.selectedDocument.name || !this.selectedDocument.content)) {
      this.deleteDocument();
    }
  }
}
