import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Inscription } from "../models/Inscription";

@Injectable({
    providedIn: 'root'
})

export class InscriptionsServices {
    private apiUrl = 'https://json-zeta-sage.vercel.app/Inscription';
    
    constructor (private http: HttpClient) { }

    getInscriptions(): Observable<Inscription[]> {
        return this.http.get<Inscription[]>(this.apiUrl)
    }
    createInscription(enrolled: Inscription): Observable<Inscription> {
        return this.http.post<Inscription>(this.apiUrl, enrolled);
    }
    editInscription(enrolled: Inscription): Observable<any> {
        const url = `${this.apiUrl}/${enrolled.id}`;
        return this.http.put(url, enrolled);
    }
    deleteInscription(enrolled: Inscription): Observable<Inscription> {
        const url = `${this.apiUrl}/${enrolled.id}`;
        return this.http.delete<Inscription>(url);
    }
}