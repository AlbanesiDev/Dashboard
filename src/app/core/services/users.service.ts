import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Users } from "../models/Users";

@Injectable({
    providedIn: 'root'
})

export class UsersServices {
    private apiUrl = 'http://localhost:3000/Users';
    
    constructor (private http: HttpClient) { }
    
    getUser(): Observable<Users[]> {
        return this.http.get<Users[]>(this.apiUrl)
    }

    createUser(users: Users): Observable<Users> {
        return this.http.post<Users>(this.apiUrl, users);
    }

    editUser(users: Users): Observable<any> {
        const url = `${this.apiUrl}/${users.id}`;
        return this.http.put(url, users);
    }
    
    deleteUser(users: Users): Observable<Users> {
        const url = `${this.apiUrl}/${users.id}`;
        return this.http.delete<Users>(url);
    }
}