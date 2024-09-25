import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styles: ``,
})
export class DashboardSidebarComponent implements OnInit {
  collapseShow = 'hidden';
  activeLink: string = '';
  userEmail: unknown = 'email';
  constructor(private router: Router) {}

  setActiveLink(link: string) {
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
  }

  isMenuOpen = false;
  isScrolled = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  logout() {
    this.router.navigate(['/Auth/login']);
    localStorage.removeItem('activeLink');
  }
  ngOnInit() {
    const statuSidebar = localStorage.getItem('activeLink');
    if (!statuSidebar) {
      this.activeLink = 'home';
      localStorage.setItem('activeLink', 'home');
    } else {
      this.activeLink = statuSidebar;
    }
    // this.userEmail = this.authServices.getUserEmail();
    console.log(this.userEmail);
  }
}
