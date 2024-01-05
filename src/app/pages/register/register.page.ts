import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage {
  userService: UserService
  router: Router
  loadingController: LoadingController

  email: string = ''
  password: string = ''
  passwordRepeat: string = ''
  errorText: string = ''

  constructor() {
    this.userService = inject(UserService)
    this.router = inject(Router)
    this.loadingController = inject(LoadingController)
  }

  public async register() {}

  public async login() {
    await this.router.navigate(['/login'])
  }
}
