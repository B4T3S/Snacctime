import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('https://pocketbase.b4t.es');
  }

  public get IsLoggedIn(): boolean {
    return this.pb.authStore.isValid;
  }

  public get Username(): string {
    if (!this.IsLoggedIn) return "<NOT LOGGED IN>";
    if (this.pb.authStore.model?.['name']) return this.pb.authStore.model?.['name'];
    return this.pb.authStore.model?.['username'];
  }

  public get Avatar(): string {
    const avatar = this.pb.authStore.model?.['avatar'];
    if (!this.IsLoggedIn || !avatar) return "https://ionicframework.com/docs/img/demos/avatar.svg";
    const url = "https://pocketbase.b4t.es/api/files/users/" + this.pb.authStore.model?.['id'] + "/" + avatar;
    return url;
  }

  public async login(username: string, password: string): Promise<boolean> {
    await this.pb.collection('users').authWithPassword(username, password);

    return this.IsLoggedIn;
  }

  public logout() {
    this.pb.authStore.clear();
  }
}
