import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IgracDialogComponent } from './../dialog/igrac-dialog/igrac-dialog.component';
import { Tim } from './../models/tim.model';
import { Nacionalnost } from './../models/nacionalnost.model';
import { HttpClient } from '@angular/common/http';
import { IgracService } from './../services/igrac.service';
import { Igrac } from './../models/igrac.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojReg', 'datumRodjenja', 'nacionalnost', 'tim', 'actions'];
  dataSource: MatTableDataSource<Igrac>;
  database: IgracService | null;
  currentDate = new Date();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  selektovanTim : Tim;

  constructor(public httpClient: HttpClient, public igracService: IgracService, public dialog: MatDialog) { }


  public openDialog(flag: number, id: number, ime: string, prezime: string, brojReg: number, datumRodjenja: Date, nacionalnost: Nacionalnost, tim: Tim) {
    const dialogRef = this.dialog.open(IgracDialogComponent, {data:{id: id, ime: ime, prezime: prezime, brojReg: brojReg, datumRodjenja: new Date(datumRodjenja), nacionalnost: nacionalnost, tim: tim}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadDate();
      }
    })
  }

  ngOnInit(): void {
    this.loadDate();
  }

  ngOnChanges() {
    if (this.selektovanTim.id) {
      this.loadDate();
    }
  }

  public loadDate() {
      this.igracService.getIgracTima(this.selektovanTim.id).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'id': return data[property];
            case 'ime': return data[property];
            case 'prezime': return data[property];
            case 'brojReg': return data[property];
            case 'datumRodj': return data[property];
            case 'nacionalnost': return data[property];
            case 'tim': return data[property];
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
