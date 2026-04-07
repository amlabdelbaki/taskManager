import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTerm = signal<string>('');

  constructor() { }

  setSearch(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }
}
