// Inside header.component.ts

import { Component } from '@angular/core';
import { BodyContentComponent } from "../body-content/body-content.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [BodyContentComponent]
})
export class HeaderComponent {

  ngOnInit() {}
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
}
