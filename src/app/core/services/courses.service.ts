import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Courses } from "../models/Courses";

@Injectable({
    providedIn: 'root'
})

export class CoursesServices {
    private apiUrl = 'http://localhost:3000/courses';
    id: any;
    
    constructor (private http: HttpClient) { }

    getCourses(): Observable<Courses[]> {
        return this.http.get<Courses[]>(this.apiUrl)
    }
    createCourse(course: Courses): Observable<Courses> {
        return this.http.post<Courses>(this.apiUrl, course);
    }
    editCourse(course: Courses): Observable<any> {
        const url = `${this.apiUrl}/${course.id}`;
        return this.http.put(url, course);
    }
    deleteCourse(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}