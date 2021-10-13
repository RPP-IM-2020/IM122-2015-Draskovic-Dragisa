import { TimService } from './../../services/tim.service';
import { NacionalnostService } from './../../services/nacionalnost.service';
import { IgracService } from './../../services/igrac.service';
import { Igrac } from './../../models/igrac.model';
import { NacionalnostDialogComponent } from './../nacionalnost-dialog/nacionalnost-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tim } from './../../models/tim.model';
import { Nacionalnost } from './../../models/nacionalnost.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css']
})
export class IgracDialogComponent implements OnInit {
  nacionalnosti: Nacionalnost[];
  timovi: Tim[];

  public flag: number;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<IgracDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Igrac,
    public igracService: IgracService,
    public nacionalnostService: NacionalnostService,
    public timService: TimService) { }

    public add(): void{
      this.igracService.addIgrac(this.data);
      this.snackBar.open('Uspesno dodat igrac: ' + this.data.id, 'Uredu', {duration: 3000});
    }
  
    public update(): void {
      this.igracService.updateIgrac(this.data);
      this.snackBar.open('Uspenso izmenjen igrac: ' + this.data.id, 'Uredu', {duration: 3000});
    }
  
    public delete(): void {
      this.igracService.deleteIgrac(this.data.id);
      this.snackBar.open('Uspesno obrisan igrac: ' + this.data.id,'Uredu', {duration: 3000});
    }
  
    public cencel(): void{
      this.dialogRef.close();
      this.snackBar.open('Odustali ste','Uredu', {duration: 1000});
    }
  ngOnInit(): void {
    this.nacionalnostService.getAllNacionalnost().subscribe(nacionalnosti => 
      this.nacionalnosti = nacionalnosti);
    this.timService.getAllTim().subscribe(timovi =>
      this.timovi = timovi);
  }

  compareTo(a,b) {
    return a.id === b.id;
  }

}