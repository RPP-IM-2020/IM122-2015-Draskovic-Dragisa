import { LigaService } from './services/liga.service';
import { NacionalnostService } from './services/nacionalnost.service';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input'

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { NacionalnostComponent } from './nacionalnost/nacionalnost.component';
import { LigaComponent } from './liga/liga.component';
import { TimComponent } from './tim/tim.component';
import { IgracComponent } from './igrac/igrac.component';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { AboutComponent } from './core/about/about.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NacionalnostDialogComponent } from './dialog/nacionalnost-dialog/nacionalnost-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LigaDialogComponent } from './dialog/liga-dialog/liga-dialog.component';



const Routes = [
      {path: 'nacionalnost', component: NacionalnostComponent},
      {path: 'liga', component: LigaComponent},
      {path: 'tim', component: TimComponent},
      {path: 'igrac', component: IgracComponent},
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'author', component: AuthorComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    NacionalnostComponent,
    LigaComponent,
    TimComponent,
    IgracComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    NacionalnostDialogComponent,
    LigaDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule.forRoot(Routes)      
  ],
  providers: [
   NacionalnostService,
   LigaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
