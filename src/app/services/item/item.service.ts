import { inject, Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'
import { ItemDto } from 'src/app/dto/item/item-dto'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiService: ApiService

  constructor() {
    this.apiService = inject(ApiService)
  }

  public async categories() {
    return await this.apiService.pb.collection('categories').getFullList({
      sort: 'name',
    })
  }

  public async items(): Promise<Array<ItemDto>> {
    var items = await this.apiService.pb.collection('articles').getFullList({
      sort: 'name',
    })

    return items.map(item => {
      return new ItemDto(item)
    })
  }
}
