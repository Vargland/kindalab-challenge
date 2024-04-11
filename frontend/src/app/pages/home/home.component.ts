import { Component, OnInit } from '@angular/core';

import { FoodTruckAPIService } from '@services';
import { MapContainerComponent, PageContainerComponent } from '@containers';
import { FoodTruck } from '@app/services/api/food-truck.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MapContainerComponent, PageContainerComponent],
    providers: [FoodTruckAPIService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export default class HomeComponent implements OnInit {
    public foodResponse: FoodTruck[] = [];

    constructor(private foodTruckAPIService: FoodTruckAPIService) { }
    
    public ngOnInit(): void {
        this.foodTruckAPIService.getAll().subscribe();

        this.foodTruckAPIService.foodTruck$
            .pipe(
                tap((response) => this.foodResponse = response),
            ).subscribe();
    }
}
