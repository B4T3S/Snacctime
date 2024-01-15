import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UserService } from '../../services/user/user.service'
import { Router } from '@angular/router'
import {
  ViewWillEnter,
  LoadingController,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonButton,
  ],
})
export class LoginPage implements ViewWillEnter {
  userService: UserService
  router: Router
  loadingController: LoadingController

  username: string = ''
  password: string = ''
  errorText: string = ''

  constructor() {
    this.userService = inject(UserService)
    this.router = inject(Router)
    this.loadingController = inject(LoadingController)

    if (this.userService.IsLoggedIn) {
      this.router.navigate(['/tabs/orders'])
    }
  }

  ionViewWillEnter(): void {
    this.username = ''
    this.password = ''
    this.errorText = ''
  }

  public async login() {
    const loader = await this.loadingController.create()
    loader.present()
    try {
      if (await this.userService.login(this.username, this.password)) {
        await this.router.navigate(['/tabs/orders'])
      }
    } catch (ex) {
      this.errorText = 'Login failed! Wrong username/password?'
    } finally {
      loader.dismiss()
    }
  }

  public async register() {
    // TODO: Create modal for registration
  }
}
