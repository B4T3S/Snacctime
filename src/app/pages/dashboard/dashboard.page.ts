import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { UserService } from '../../services/user/user.service'
import { OrderService } from 'src/app/services/order/order.service'
import { RecordModel } from 'pocketbase'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DashboardPage {
  router: Router

  userService: UserService
  orderService: OrderService

  orders: Array<RecordModel> = new Array()

  constructor() {
    this.router = inject(Router)

    this.userService = inject(UserService)
    this.orderService = inject(OrderService)

    this.orderService.fetchAll().then(result => {
      this.orders = result
      console.log('result:', result)
    })
  }

  async newOrder(): Promise<void> {
    await this.orderService.create()
  }

  getDate(dateString: string): string {
    return new Date(dateString).toDateString()
  }

  async openOrder(order: RecordModel): Promise<void> {
    console.log('Opening ', order)
    await this.router.navigate(['/order', order['id']])
  }
}
