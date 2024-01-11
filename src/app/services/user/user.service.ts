import { inject, Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiService: ApiService

  constructor() {
    this.apiService = inject(ApiService)
  }

  public get IsLoggedIn(): boolean {
    return this.apiService.pb.authStore.isValid
  }

  public get Username(): string {
    if (!this.IsLoggedIn) return '<NOT LOGGED IN>'
    if (this.apiService.pb.authStore.model?.['name'])
      return this.apiService.pb.authStore.model?.['name']
    return this.apiService.pb.authStore.model?.['username']
  }

  public get Avatar(): string {
    const avatar = this.apiService.pb.authStore.model?.['avatar']
    if (!this.IsLoggedIn || !avatar)
      return 'https://ionicframework.com/docs/img/demos/avatar.svg'
    const url =
      'https://pocketbase.b4t.es/api/files/users/' +
      this.apiService.pb.authStore.model?.['id'] +
      '/' +
      avatar
    return url
  }

  public get Id(): string|null {
    if (!this.IsLoggedIn) return null;
    return this.apiService.pb.authStore.model?.['id'];
  }

  public async login(username: string, password: string): Promise<boolean> {
    await this.apiService.pb
      .collection('users')
      .authWithPassword(username, password)

    return this.IsLoggedIn
  }

  public logout() {
    this.apiService.pb.authStore.clear()
  }
}
