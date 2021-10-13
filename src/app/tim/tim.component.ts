import { TimDialogComponent } from './../dialog/tim-dialog/tim-dialog.component';
import { Liga } from './../models/liga.model';
import { HttpClient } from '@angular/common/http';
import { TimService } from './../services/tim.service';
import { Tim } from './../models/tim.model';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit {

  displayedColumns =['id','naziv','osnovan','sediste','liga','actions']
  dataSource: MatTableDataSource<Tim>;
  database: TimService | null;
  currentDate = new Date();
  
  selektovanTim : Tim;

  @ViewChild(MatPaginator)
  pagintor: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  
  constructor(public httpClient: HttpClient, public timService: TimService, public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, naziv: string, osnovan: Date, sediste: string, liga: Liga) {
    const dialogRef = this.dialog.open(TimDialogComponent, {data:{id: id, naziv: naziv, osnovan: new Date(osnovan), sediste: sediste, liga: liga }});
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
    this.timService.getAllTim().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'osnovan': return data[property];
          case 'sediste': return data[property];
          case 'liga': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.pagintor;
      this.dataSource.sort = this.sort;
    });
  }

  public selectRow(row) {
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
