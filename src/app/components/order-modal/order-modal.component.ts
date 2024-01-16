import { Component, OnInit, inject } from '@angular/core'
import { ModalController } from '@ionic/angular/standalone'
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
  IonProgressBar,
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { OrderService } from 'src/app/services/order/order.service'
import { CommonModule } from '@angular/common'

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
    IonProgressBar,
    CommonModule,
  ],
})
export class OrderModalComponent implements OnInit {
  private modalController: ModalController
  private orderId!: string
  private orderService: OrderService
  protected order: RecordModel | undefined = undefined

  constructor() {
    this.modalController = inject(ModalController)
    this.orderService = inject(OrderService)
  }

  async ngOnInit(): Promise<void> {
    this.order = await this.orderService.fetch(this.orderId)
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel')
  }
}
