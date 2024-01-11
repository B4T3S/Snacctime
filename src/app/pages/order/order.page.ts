import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { RecordModel } from 'pocketbase'
import { Router } from '@angular/router'
import { OrderService } from 'src/app/services/order/order.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class OrderPage implements OnInit {
  private orderService: OrderService
  private router: Router

  @Input() id = undefined
  protected order: RecordModel | undefined

  constructor() {
    this.orderService = inject(OrderService)

    this.router = inject(Router)
  }

  async ngOnInit() {
    this.order = await this.orderService.fetch(this.id ?? '')
    if (!this.order) {
      await this.router.navigate(['/dashboard'])
    }
  }

  // TODO: Move functions like this into OrderService? Maybe something like OrderService.GetDate(Order)
  getDate(dateString: string | undefined): string {
    if (!dateString) return ''
    return new Date(dateString).toDateString()
  }
}
