import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

import { FoodTruck } from '@app/services';


@Component({
    selector: 'app-map-container',
    standalone: true,
    imports: [LeafletModule],
    templateUrl: './map-container.component.html',
    styleUrl: './map-container.component.scss'
})
export default class MapContainerComponent implements OnChanges, AfterViewInit {
    @Input() foodResponse: FoodTruck[] = [];

    private map!: L.Map
    private markers!: L.LayerGroup;

    private initMap(): void {
        this.map = L.map('map', {
            center: [39.8282, -98.5795],
            zoom: 3
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    private getIcon(): L.Icon {
        const icon = L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'https://www.ippc.int/static/leaflet/images/marker-icon.png',
            iconRetinaUrl: 'https://www.ippc.int/static/leaflet/images/marker-icon%402x.png',
            shadowUrl: 'https://www.ippc.int/static/leaflet/images/marker-shadow.png',
        })

        return icon;
    }

    public ngAfterViewInit(): void {
        this.initMap()
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.updateMakers(changes['foodResponse'].currentValue)
    }

    public updateMakers(foodResponse: FoodTruck[]): void {
        let markers: any = []

        if (this.map && this.markers) {
            this.map.removeLayer(this.markers)
        }

        foodResponse.forEach(({ address, applicant, latitude, longitude, fooditems }) => {
            markers.push(
                L.marker([Number(latitude), Number(longitude)],
                    { icon: this.getIcon() }).bindPopup(
                        `
                        <b>${applicant}</b><br>
                        <b>${address}</b><br>
                        <span>${fooditems}<span>
                    `
                    )
            )
        })

        if (this.map) {
            this.markers = L.layerGroup(markers)
            this.map.addLayer(this.markers)
        }
    }
}
