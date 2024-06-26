import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { INote } from "@notes/shared-lib/interfaces/note.interface";
import { environment } from "@notes/web/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NoteHttp {
    private readonly url = `${environment.baseApi}/notes`;

    private readonly http = inject(HttpClient);

    addNote = (note: Omit<INote, 'id' | 'status'>): Observable<INote> => this.http.post<INote>(`${this.url}`, { note });
    deleteNote = (note: INote): Observable<void> => this.http.delete<void>(`${this.url}/${note.id}`);
    getNotes = (searchQuery?: string): Observable<INote[]> => this.http.get<INote[]>(`${this.url}`, { params: { search: searchQuery || '' } });
}