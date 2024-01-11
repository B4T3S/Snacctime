import { Injectable, inject } from '@angular/core'
import { ApiService } from '../api/api.service'
import { UserService } from '../user/user.service'
import { LoadingController } from '@ionic/angular'
import { RecordModel } from 'pocketbase'
import { ToastController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiService: ApiService
  private userService: UserService
  private loadingController: LoadingController
  private toastController: ToastController

  constructor() {
    this.apiService = inject(ApiService)
    this.userService = inject(UserService)

    this.loadingController = inject(LoadingController)
    this.toastController = inject(ToastController)
  }

  public async fetchAll(): Promise<RecordModel[]> {
    var items: RecordModel[] = new Array()

    try {
      items = await this.apiService.pb.collection('orders').getFullList({
        expand: 'creator',
      })
    } catch (ex) {
      console.error('Failed to fetch Orders!', ex)
      this.toastController.create({
        header: 'Error!',
        message: 'Failed to fetch Orders!',
        color: 'danger',
        duration: 3000,
      })
    }

    return items
  }

  public async fetch(id: string) {
    try {
      return await this.apiService.pb.collection('orders').getOne(id, {
        expand: 'creator',
      })
    } catch (ex) {
      console.error(`Error fetching order (${id})`, ex)
    }

    return undefined
  }

  public async create(): Promise<void> {
    const data = {
      creator: this.userService.Id,
      completed: false,
    }

    const loader = await this.loadingController.create()

    try {
      await this.apiService.pb.collection('orders').create(data)
      console.info('Created new order')
    } catch (ex) {
      console.error('Failed to create new order', ex)
    } finally {
      loader.dismiss()
    }
  }
}
