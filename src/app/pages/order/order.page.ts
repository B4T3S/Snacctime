import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecordModel } from 'pocketbase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderPage implements OnInit {
  @Input() id = undefined;

  private router: Router

  constructor() {
    this.router = inject(Router);

    console.log("Order is ", this.id)
  }

  ngOnInit() {
  }

}
