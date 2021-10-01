import { LigaService } from './../../services/liga.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-liga-dialog',
  templateUrl: './liga-dialog.component.html',
  styleUrls: ['./liga-dialog.component.css']
})
export class LigaDialogComponent implements OnInit {

  public flag: number;

  constructor(public snacBar: MatSnackBar, public dialogRef: MatDialogRef<LigaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public ligaService: LigaService) { }

  
  public add(): void {
    this.ligaService.addLiga(this.data);
    this.snacBar.open('Uspesno je dodata liga: ' + this.data.naziv, 'Uredu', {
      duration: 3000
    });
  }

  public update(): void {
    this.ligaService.updateLiga(this.data);
    this.snacBar.open("Uspesno je azurirana liga: " + this.data.naziv, 'Uredu', {
      duration: 3000
    });
  }

  public delete(): void {
    this.ligaService.deleteLiga(this.data.id);
    this.snacBar.open('Uspesno je obrisana liga: ' + this.data.id, 'Uredu', {
      duration: 3000
    });
  }

  public cencel(): void {
    this.dialogRef.close();
    this.snacBar.open('Odustali ste','Uredu', {
      duration: 1000
    })
  }
  ngOnInit(): void {
  }

}
