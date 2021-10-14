import { Tim } from './../models/tim.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Igrac } from './../models/igrac.model';
import { Injectable } from "@angular/core";

@Injectable()
export class IgracService{
    timovi: Igrac[];

    //End Point u Development mode-u
    //private readonly API_URL = 'http://localhost:8083/igrac/';
    //private readonly API_URL_I = 'http://localhost:8083/igracTima/';

    //End Point u Development mode-u
    private readonly API_URL = 'http://backend-rva.herokuapp.com/igrac/';
    private readonly API_URL_I = 'http://backend-rva.herokuapp.com/igracTima/';
    dataChange: BehaviorSubject<Igrac[]> = new BehaviorSubject<Igrac[]>([]);

    constructor(private httpClient: HttpClient){

    }

    public getAllIgrac(): Observable<Igrac[]>{
        this.httpClient.get<Igrac[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.timovi = data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + '' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public getIgracTima(idTim): Observable<Igrac[]>{
       this.httpClient.get<Igrac[]>(this.API_URL_I + idTim).subscribe(data => {
           this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message); 
        });
        return this.dataChange.asObservable();
    }

    public getIgrac(idTimovi): Observable<Igrac[]> {
        this.httpClient.get<Igrac[]>(this.API_URL_I + idTimovi).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + '' + error.message);
        });
       return this.dataChange.asObservable();
  }

    public addIgrac(igrac: Igrac): void{
        this.httpClient.post(this.API_URL, igrac).subscribe();
    }

    public updateIgrac(igrac: Igrac): void {
        this.httpClient.put(this.API_URL + igrac.id, igrac).subscribe();
    }

    public deleteIgrac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}