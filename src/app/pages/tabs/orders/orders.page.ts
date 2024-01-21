import { Component, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonBadge,
  IonSkeletonText,
  ViewWillEnter,
  IonProgressBar,
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { OrderService } from 'src/app/services/order/order.service'
import { UserService } from 'src/app/services/user/user.service'
import { ModalController } from '@ionic/angular/standalone'
import { OrderModalComponent } from 'src/app/components/order-modal/order-modal.component'

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonLabel,
    IonButton,
    IonIcon,
    IonItem,
    IonList,
    IonBadge,
    IonSkeletonText,
    IonProgressBar,
    CommonModule,
  ],
})
export class OrdersPage implements ViewWillEnter {
  @ViewChild(IonContent) ionContent!: HTMLElement

  orderService: OrderService
  userService: UserService
  modalController: ModalController

  orders: Array<RecordModel> = new Array()
  ordersLoading: boolean = true

  constructor() {
    this.orderService = inject(OrderService)
    this.userService = inject(UserService)
    this.modalController = inject(ModalController)
  }

  async ionViewWillEnter() {
    await this.loadOrders()
  }

  async loadOrders(event: any = undefined): Promise<void> {
    this.ordersLoading = true
    this.orders = await this.orderService.fetchAll()
    this.ordersLoading = false
    event?.target?.complete()
  }

  async newOrder(): Promise<void> {
    await this.orderService.create()
    await this.loadOrders()
  }

  async openOrder(order: RecordModel): Promise<void> {
    const modal = await this.modalController.create({
      component: OrderModalComponent,
      componentProps: { orderId: order['id'] },
      presentingElement: this.ionContent,
    })

    await modal.present()

    const { data, role } = await modal.onWillDismiss()
    if (role === 'reload') {
      await this.loadOrders()
    }
  }

  getDate(dateString: string): string {
    return new Date(dateString).toDateString()
  }
}
