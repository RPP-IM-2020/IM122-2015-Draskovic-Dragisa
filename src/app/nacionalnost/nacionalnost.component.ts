import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nacionalnost } from '../models/nacionalnost.model';
import { NacionalnostService } from '../services/nacionalnost.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  dataSource: Observable<Nacionalnost[]>;
  database: NacionalnostService | null;

  constructor(public httpClient: HttpClient, public nacionalnostService: NacionalnostService) { }

  ngOnInit(): void {
    this.loadDate();
  }

  public loadDate() {
    this.dataSource = this.nacionalnostService.getAllNacionalnost();
  }

}
