import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  pb: PocketBase

  constructor() {
    this.pb = new PocketBase('https://pocketbase.b4t.es')
  }
}
