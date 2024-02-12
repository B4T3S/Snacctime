import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  pb: PocketBase

  constructor() {
    this.pb = new PocketBase(environment.pocketBaseUrl)
  }
}
