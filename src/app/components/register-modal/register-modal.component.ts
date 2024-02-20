import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToolbar,
  IonHeader,
  ModalController,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone'
import { ApiService } from 'src/app/services/api/api.service'

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonButton,
    IonButtons,
    IonTitle,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterModalComponent {
  modalController: ModalController
  apiService: ApiService

  protected username: string
  protected email: string
  protected password: string
  protected passwordConfirm: string
  protected errorText: string

  constructor() {
    this.modalController = inject(ModalController)
    this.apiService = inject(ApiService)

    this.username = ''
    this.email = ''
    this.password = ''
    this.passwordConfirm = ''
    this.errorText = ''
  }

  public async cancel(): Promise<void> {
    await this.modalController.dismiss()
  }

  public async checkUsernameAvailability(): Promise<void> {
    // TODO: Use the value of this function.
    //? Do we use angulars form validation or a string value (like how we currently show API errors?)

    if (!this.username) return

    try {
      console.log(
        await this.apiService.pb
          .collection('users')
          .getFirstListItem(`username="${this.username}"`)
      )
    } catch (ex) {
      console.log(ex)
    }
  }

  public async register(): Promise<void> {
    const data = {
      username: this.username,
      name: this.username,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    }

    try {
      await this.apiService.pb.collection('users').create(data)
    } catch (ex) {
      this.errorText = 'There was an error creating your account!'
    }
  }
}
