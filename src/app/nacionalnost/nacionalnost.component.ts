import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nacionalnost } from '../models/nacionalnost.model';
import { NacionalnostService } from '../services/nacionalnost.service';
import { MatTableDataSource } from '@angular/material/table';
import { NacionalnostDialogComponent } from '../dialog/nacionalnost-dialog/nacionalnost-dialog.component';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  dataSource: Observable<Nacionalnost[]>;
  database: NacionalnostService | null;

  constructor(public httpClient: HttpClient, public nacionalnostService: NacionalnostService, public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, naziv: string, skracenica: string) {
    const dialogRef = this.dialog.open(NacionalnostDialogComponent, { data:{id: id, naziv: naziv, skracenica: skracenica }})
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadDate();
      }
    })
    
  }

  ngOnInit(): void {
    this.loadDate();
  }

  public loadDate() {
    this.dataSource = this.nacionalnostService.getAllNacionalnost();
  }

}
