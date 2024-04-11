import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FoodTruck, FoodTruckAPIService } from '@services';

import { SearchInputComponent } from '@components';

@Component({
    selector: 'app-page-container',
    standalone: true,
    imports: [CommonModule, SearchInputComponent],
    templateUrl: './page-container.component.html',
    styleUrl: './page-container.component.scss'
})
export default class PageContainerComponent {
    @Input() foodResponse: FoodTruck[] = [];

    constructor(private foodTruckAPIService: FoodTruckAPIService) { }

    public getSearchValue(searchValue: any): void {
        this.foodTruckAPIService.getBy(searchValue).subscribe();
    }
}
