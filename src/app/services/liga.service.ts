import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Liga } from './../models/liga.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LigaService {

    private readonly API_URL = 'http://localhost:8083/liga/';
    dataChange: BehaviorSubject<Liga[]> = new BehaviorSubject<Liga[]>([]);

    constructor(private httpClient: HttpClient) {

    }

    public getAllLiga(): Observable<Liga[]> {
        this.httpClient.get<Liga[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        }, 
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addLiga(liga: Liga): void {
        this.httpClient.post(this.API_URL, liga).subscribe();
    }

    public updateLiga(liga: Liga): void {
        this.httpClient.put(this.API_URL + liga.id, liga).subscribe();
    }

    public deleteLiga(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }
}