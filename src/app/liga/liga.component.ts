import { LigaDialogComponent } from './../dialog/liga-dialog/liga-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { LigaService } from './../services/liga.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Liga } from '../models/liga.model';


@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit {

  displayedColumns =['id', 'naziv', 'oznaka', 'actions'];
  dataSource: Observable<Liga[]>;
  database: LigaService | null;

  constructor(public httpClient: HttpClient, public ligaService: LigaService, public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, naziv: string, oznaka: string) {
    const dialogRef = this.dialog.open(LigaDialogComponent, {data:{id: id, naziv: naziv, oznaka: oznaka}})
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
    this.dataSource = this.ligaService.getAllLiga();
  }

}
