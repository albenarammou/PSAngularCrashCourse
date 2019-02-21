import { Injectable } from "@angular/core";
import { Entry } from "./model/entry";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeightEntriesService {
  /* public entriesArray: Entry[] = [
    {id:1,date:new Date('1/1/1996'),weight:165,bodyfat:.20},
    {id:2,date:new Date('1/2/1996'),weight:164,bodyfat:.19},
    {id:3,date:new Date('1/3/1996'),weight:164,bodyfat:.19},
    {id:4,date:new Date('1/12/1996'),weight:161,bodyfat:.18},
    {id:5,date:new Date('12/31/1995'),weight:167,bodyfat:.20},
    {id:6,date:new Date('12/1/1995'),weight:161,bodyfat:.18},
  ] */

  // public sortedEntries: Entry[];

  constructor( private http: HttpClient) {
      // this.sortEntries();
  }
  
  public getEntries(){
    return this.http.get<Entry[]>('http://localhost:3000/entries').pipe(
      map(entries => {
        return entries.map(e => {
          e.date = new Date(e.date);
          return e;
        })  
      }),
      map(entries => {
        return entries.sort((a:Entry, b:Entry) => {
          if(a.date > b.date) {
            return 1;
          } else if (a.date.getTime() == b.date.getTime()) {
            return 0;
          } else {
            return -1
          }
        });
      }) 
    )
  }

 /*  private sortEntries() {
    this.sortedEntries = [...this.entriesArray].sort((a:Entry, b:Entry) => {
      if(a.date > b.date) {
        return 1;
      } else if (a.date.getTime() == b.date.getTime()) {
        return 0;
      } else {
        return -1
      }
    })
  } */

  addEntry(entry: Entry) {
    return this.http.post('http://localhost:3000/entries', entry)
   
    /*     entry.id = getMaxId(this.entriesArray) + 1;
    this.entriesArray = [...this.entriesArray, { ...entry}];
    this.sortEntries();
   */ 
  } 

}

/* function getMaxId(data) {
  return data.reduce((p, c) => {
    return Math.max(p, c.id);
  },0)
} */