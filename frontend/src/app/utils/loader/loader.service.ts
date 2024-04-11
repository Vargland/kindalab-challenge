import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export default class LoaderService {
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    this.isLoading$ = this.isLoading.asObservable();
  }

  public setLoading(loader: boolean) {
    this.isLoading.next(loader);
  }
}
