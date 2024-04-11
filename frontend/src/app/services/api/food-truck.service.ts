import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { ENVIROMENT } from "@env/env";

export interface Location {
    human_address: string;
    latitude: string;
    longitude: string;
}

export interface FoodTruck {
    address: string;
    applicant: string;
    block: string;
    blocklot: string;
    cnn: string;
    expirationdate: string;
    facilitytype: string;
    fooditems?: string;
    latitude: string;
    location: Location;
    locationdescription: string;
    longitude: string;
    lot: string;
    objectid: string;
    permit: string;
    priorpermit: string;
    received: string;
    schedule: string;
    status: string;
    x: string;
    y: string;
    ":@computed_region_yftq_j783": string;
    ":@computed_region_p5aj_wyqh": string;
    ":@computed_region_rxqg_mtj9": string;
    ":@computed_region_bh8s_q3mv": string;
    ":@computed_region_fyvs_ahh9": string;
}

@Injectable({
    providedIn: 'root'
})

export default class FoodTruckAPIService {
    private foodTruck: BehaviorSubject<FoodTruck[]> = new BehaviorSubject<FoodTruck[]>([]);
    private foodUrl = 'food'

    public foodTruck$: Observable<FoodTruck[]> = this.foodTruck.asObservable();

    constructor(private http: HttpClient) { }

    public getAll = (): Observable<FoodTruck[]> => {
        return this.http.get<FoodTruck[]>(`${ENVIROMENT.API_URL}/${this.foodUrl}`)
            .pipe(
                tap((response) => this.foodTruck.next(response))
            )
    };

    public getBy = (foodType: string): Observable<FoodTruck[]> => {
        return this.http.get<FoodTruck[]>(`${ENVIROMENT.API_URL}/${this.foodUrl}?fooditems=${foodType}`)
            .pipe(
                tap((response) => this.foodTruck.next(response))
            )
    };
}
