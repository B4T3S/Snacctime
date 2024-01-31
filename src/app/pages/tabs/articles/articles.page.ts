import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonNote,
} from '@ionic/angular/standalone'
import { ItemService } from 'src/app/services/item/item.service'
import { RecordModel } from 'pocketbase'
import { ItemDto } from 'src/app/dto/item/item-dto'

@Component({
  selector: 'app-articles',
  templateUrl: 'articles.page.html',
  styleUrls: ['articles.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonNote,
    CommonModule,
  ],
})
export class ArticlesPage {
  // Services
  itemService: ItemService

  // Local variables
  protected categories: Array<RecordModel> | undefined
  protected items: Array<ItemDto> | undefined

  constructor() {
    this.itemService = inject(ItemService)

    // Asynchronously fetch categories and items from API
    this.itemService.categories().then(async result => {
      this.categories = result
    })

    this.itemService.items().then(async result => {
      this.items = result
    })
  }
}
