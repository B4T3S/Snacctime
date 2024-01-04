import { inject, Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'

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

  public async items() {
    return await this.apiService.pb.collection('articles').getFullList({
      sort: 'name',
    })
  }
}
