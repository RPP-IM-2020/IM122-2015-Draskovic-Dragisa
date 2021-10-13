import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nacionalnost } from '../models/nacionalnost.model';
import { NacionalnostService } from '../services/nacionalnost.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NacionalnostDialogComponent } from '../dialog/nacionalnost-dialog/nacionalnost-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  dataSource: MatTableDataSource<Nacionalnost>;
  database: NacionalnostService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  

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
   this.nacionalnostService.getAllNacionalnost().subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();  
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
