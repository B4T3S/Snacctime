import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ItemService } from 'src/app/services/item/item.service'
import { RecordModel } from 'pocketbase'

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ItemsPage {
  // Services
  itemService: ItemService

  // Local variables
  protected categories: Array<RecordModel> | undefined
  protected items: Array<RecordModel> | undefined

  constructor() {
    this.itemService = inject(ItemService)

    // Asynchronously fetch categories and items from API
    this.itemService.categories().then(async (result) => {
      this.categories = result
    })

    this.itemService.items().then(async (result) => {
      this.items = result
    })
  }
}
