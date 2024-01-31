import { Component, OnInit, ViewChild, inject } from '@angular/core'
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
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { OrderService } from 'src/app/services/order/order.service'
import { CommonModule } from '@angular/common'
import { UserService } from 'src/app/services/user/user.service'
import { ItemsModalComponent } from '../items-modal/items-modal.component'

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
    IonFab,
    IonFabButton,
    CommonModule,
  ],
})
export class OrderModalComponent implements OnInit {
  @ViewChild(IonContent) ionContent!: HTMLElement

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

  async addItems() {
    const itemsModal = await this.modalController.create({
      component: ItemsModalComponent,
      presentingElement: this.ionContent,
    })

    await itemsModal.present()
  }

  getDate(dateString: string | undefined): string {
    return new Date(dateString ?? '').toDateString()
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel')
  }
}
