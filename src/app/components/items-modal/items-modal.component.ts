import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone'
import { RecordModel } from 'pocketbase'
import { ItemService } from 'src/app/services/item/item.service'

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
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
export class ItemsModalComponent implements OnInit {
  private readonly modalController: ModalController
  private readonly itemService: ItemService

  protected categories: Array<RecordModel> | undefined
  protected items: Array<RecordModel> | undefined

  public selectedItems: Array<RecordModel> = new Array<RecordModel>()

  constructor() {
    this.modalController = inject(ModalController)
    this.itemService = inject(ItemService)
  }

  ngOnInit() {
    // Asynchronously fetch categories and items from API
    this.itemService.categories().then(async result => {
      this.categories = result
    })

    this.itemService.items().then(async result => {
      // this.items = result
    })
  }

  addItem(item: RecordModel) {}

  cancel() {
    return this.modalController.dismiss(null, 'cancel')
  }
}
