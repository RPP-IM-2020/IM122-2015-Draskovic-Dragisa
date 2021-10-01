import { MatIconModule } from '@angular/material/icon';
import { NacionalnostService } from './../../services/nacionalnost.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nacionalnost-dialog',
  templateUrl: './nacionalnost-dialog.component.html',
  styleUrls: ['./nacionalnost-dialog.component.css']
})
export class NacionalnostDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
       public dialogRef: MatDialogRef<NacionalnostDialogComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      public nacionalnostService: NacionalnostService) { }


  public add(): void {
    this.nacionalnostService.addNacionalnost(this.data);
    this.snackBar.open('Uspesno je dodata nacionalonst: ' + this.data.naziv, 'Uredu', {
    duration: 3000
     });
  }

  public update(): void {
    this.nacionalnostService.updateNacionalnost(this.data);
    this.snackBar.open('Uspesno je azurirana nacionalnost:' + this.data.naziv, 'Uredu', {
      duration: 3000
    });
  }

  public delete(): void {
    this.nacionalnostService.deleteNacionalnost(this.data.id);
    this.snackBar.open('Uspesno je obrisana nacionalnost: ' + this.data.id, 'Uredu', {
      duration: 3000
    });
  }

  public cencel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {
      duration: 1000
    });
  }
  ngOnInit(): void {
  }

}
