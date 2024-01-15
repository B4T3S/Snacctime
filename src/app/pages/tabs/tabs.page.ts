import { Component, EnvironmentInjector, inject } from '@angular/core'
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  Platform,
  ViewDidEnter,
  ViewWillLeave,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { triangle, ellipse, square } from 'ionicons/icons'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements ViewDidEnter, ViewWillLeave {
  public environmentInjector = inject(EnvironmentInjector)
  private platform: Platform = inject(Platform)
  private subscription: Subscription | undefined = undefined

  constructor() {}

  // This section disables the back button for the entire app.
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        // do nothing
      }
    )
  }

  ionViewWillLeave() {
    this.subscription?.unsubscribe()
  }
}
