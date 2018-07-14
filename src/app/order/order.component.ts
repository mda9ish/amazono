import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {DataService} from '../data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
	orders:any;

  constructor( private data:DataService, private rest:RestApiService) { }

  async ngOnInit() {
  	try{
  		const data = await this.rest.get(
  			'http://localhost:3030/api/accounts/order'
  			);
  	
  		data['success']
        ? (this.orders = data['orders'])
        : this.data.error(data['message']);

  	}catch (error){
  		this.data.error(error['message']);
  	}
  }

}
