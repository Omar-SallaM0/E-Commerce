import { Router } from "@angular/router";
import { AuthServiceService } from "../../core/services/auth.service";
import { UserDataService } from "../../core/services/user-data-service.service";
import { MenuItem } from "primeng/api";
import { Component, ViewEncapsulation } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";

@Component({selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None, })

export class UserNavComponent {
  constructor(
    private _userData: UserDataService,
    private _auth: AuthServiceService,
    private router: Router,

  ) {}

  items: MenuItem[] | undefined;
  logOut = false;
  username = '';
  cartCount = 0;

  ngOnInit(): void {
    this.getUserName();
    this.getUserCartCount();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: 'home',
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        path: 'products',
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        path: 'categories',
      },
    ];
  }

  getUserName(): void {
    this._userData.userName.subscribe((next) => {
      this.username = next;
    });
  }

  getUserCartCount(): void {
    const id = localStorage.getItem('token') ?? '';
    this._userData.getCartCount(id).subscribe((next) => (this.cartCount = next));
  }
}
