import { Component, inject } from '@angular/core'
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
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { OrderService } from 'src/app/services/order/order.service'
import { UserService } from 'src/app/services/user/user.service'

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
    CommonModule,
  ],
})
export class OrdersPage implements ViewWillEnter {
  orderService: OrderService
  userService: UserService

  orders: Array<RecordModel> = new Array()
  ordersLoading: boolean = true

  constructor() {
    this.orderService = inject(OrderService)
    this.userService = inject(UserService)
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
  }

  async openOrder(order: RecordModel): Promise<void> {
    console.log('Opening ', order)
    // await this.router.navigate(['/order', order['id']])
  }

  getDate(dateString: string): string {
    return new Date(dateString).toDateString()
  }
}
