import { TimService } from './../../services/tim.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LigaService } from './../../services/liga.service';
import { LigaDialogComponent } from './../liga-dialog/liga-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Liga } from './../../models/liga.model';
import { Tim } from './../../models/tim.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tim-dialog',
  templateUrl: './tim-dialog.component.html',
  styleUrls: ['./tim-dialog.component.css']
})
export class TimDialogComponent implements OnInit {
  lige: Liga[];

  public flag: number;


  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<TimDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Tim,
    public ligaService: LigaService,
    public timService: TimService) {}


  public add(): void{
    this.timService.addTim(this.data);
    this.snackBar.open('Uspesno dodat tim: ' + this.data.id, 'Uredu', {duration: 3000});
  }

  public update(): void {
    this.timService.updateTim(this.data);
    this.snackBar.open('Uspenso izmenjen tim: ' + this.data.id, 'Uredu', {duration: 3000});
  }

  public delete(): void {
    this.timService.deleteTim(this.data.id);
    this.snackBar.open('Uspesno obrisan tim: ' + this.data.id,'Uredu', {duration: 3000});
  }

  public cencel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste','Uredu', {duration: 1000});
  }

  ngOnInit(): void {
    this.ligaService.getAllLiga().subscribe(lige =>
      this.lige = lige);
  }

  compareTo(a,b) {
    return a.id === b.id;
  }

}
