import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  ngOnInit() {}
  openNav() {
    const sidebar = document.getElementById("Sidebar");
    const header = document.querySelector("header");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const save_Delete_Div = document.getElementById("save&deleteDocument");
    
    sidebar.style.width = "250px";
    header.style.marginLeft = "250px";
    menuButton.classList.add('hidden'); 
    closeButton.classList.remove('hidden'); 
    closeButton.classList.add('flex'); 
    save_Delete_Div.classList.add('hidden'); 
  }
  
  closeNav() {
    const sidebar = document.getElementById("Sidebar");
    const header = document.querySelector("header");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const save_Delete_Div = document.getElementById("save&deleteDocument");
    sidebar.style.width = "0";
    header.style.marginLeft = "0";
    menuButton.classList.remove('hidden'); 
    closeButton.classList.remove('flex'); 
    closeButton.classList.add('hidden'); 
    save_Delete_Div.classList.remove('hidden');
  }
  
}


