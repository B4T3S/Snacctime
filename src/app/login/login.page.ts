import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular/standalone'
import { ViewWillEnter } from '@ionic/angular/standalone'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements ViewWillEnter {
  userService: UserService
  router: Router
  loadingController: LoadingController = inject(LoadingController)

  username: string = ''
  password: string = ''
  errorText: string = ''

  constructor() {
    this.userService = inject(UserService)
    this.router = inject(Router)
    if (this.userService.IsLoggedIn) {
      this.router.navigate(['/dashboard'])
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
        await this.router.navigate(['/dashboard'])
      }
    } catch (ex) {
      this.errorText = 'Login failed! Wrong username/password?'
    } finally {
      loader.dismiss()
    }
  }
}
