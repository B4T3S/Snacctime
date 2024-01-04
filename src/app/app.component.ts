import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonAvatar,
  IonChip,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import * as ionIcons from 'ionicons/icons'
import { UserService } from './services/user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonAvatar,
    IonChip,
  ],
})
export class AppComponent {
  userService: UserService = inject(UserService)
  router: Router = inject(Router)

  public get isLoggedIn(): boolean {
    return this.userService.IsLoggedIn
  }

  public get username(): string {
    return this.userService.Username
  }

  public get avatar(): string {
    return this.userService.Avatar
  }

  public async logout() {
    this.userService.logout()
    await this.router.navigate(['/login'])
  }

  public appPages = [
    { title: 'Dash', url: '/dashboard', icon: 'mail' },
    { title: 'Items', url: '/items', icon: 'list' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ]
  constructor() {
    addIcons(ionIcons)
  }
}
