import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "../models/Register";

@Injectable({
    providedIn: 'root'
})

export class TeachersServices {
    private apiUrl = 'http://localhost:3000/registered';
    id: any;
    
    constructor (private http: HttpClient) { }

    getRegistered(): Observable<Register[]> {
        return this.http.get<Register[]>(this.apiUrl)
    }
    createRegistration(register: Register): Observable<Register> {
        return this.http.post<Register>(this.apiUrl, register);
    }
    editRegistration(register: Register): Observable<any> {
        const url = `${this.apiUrl}/${register.id}`;
        return this.http.put(url, register);
    }
    deleteRegistration(register: Register): Observable<Register> {
        const url = `${this.apiUrl}/${this.id}`;
        return this.http.delete<Register>(url);
    }
}