import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from './hero';
import { HEROES } from "./mock-heroes";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = "api/heroes";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(_ => this.messageService.add("fetched heroes")),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.add(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.messageService.add(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.messageService.add(`found heroes matching "${term}"`) :
        this.messageService.add(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("serachHeroes", []))
    )
  }
}
