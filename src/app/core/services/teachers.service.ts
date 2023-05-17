import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Teachers } from "../models/Teachers";

@Injectable({
    providedIn: 'root'
})

export class TeachersServices {
    private apiUrl = 'http://localhost:3000/teachers';
    
    constructor (private http: HttpClient) { }

    getTeachers(): Observable<Teachers[]> {
        return this.http.get<Teachers[]>(this.apiUrl)
    }
    createTeacher(teacher: Teachers): Observable<Teachers> {
        return this.http.post<Teachers>(this.apiUrl, teacher);
    }
    editTeacher(teacher: Teachers): Observable<any> {
        const url = `${this.apiUrl}/${teacher.id}`;
        return this.http.put(url, teacher);
    }
    deleteTeacher(teacher: Teachers): Observable<Teachers> {
        const url = `${this.apiUrl}/${teacher.id}`;
        return this.http.delete<Teachers>(url);
    }
}