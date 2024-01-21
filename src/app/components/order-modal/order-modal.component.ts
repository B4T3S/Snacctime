import { Component, OnInit, inject } from '@angular/core'
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonCard,
  ModalController,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonNote,
  IonSkeletonText,
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { OrderService } from 'src/app/services/order/order.service'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonSkeletonText,
    CommonModule,
  ],
})
export class OrderModalComponent implements OnInit {
  private modalController: ModalController
  private orderId!: string
  private orderService: OrderService

  protected userService: UserService
  protected order: RecordModel | undefined = undefined
  protected totalPrice: number | undefined = undefined

  constructor() {
    this.modalController = inject(ModalController)
    this.orderService = inject(OrderService)
    this.userService = inject(UserService)
  }

  async ngOnInit(): Promise<void> {
    this.order = await this.orderService.fetch(this.orderId)
  }

  async deactivateOrder(): Promise<void> {
    if (this.order) {
      await this.orderService.deactivate(this.order['id'])
      await this.modalController.dismiss(null, 'reload')
    }
  }

  getDate(dateString: string | undefined): string {
    return new Date(dateString ?? '').toDateString()
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel')
  }
}
