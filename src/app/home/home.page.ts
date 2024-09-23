import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  currentLayer!: L.TileLayer;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([51.505, -0.09], 13);

    this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Add a marker
    const circleMarker = L.circleMarker([51.505, -0.09], {
      radius: 10, // Radius in pixels
      color: 'blue', // Border color
      fillColor: '#30f', // Fill color
      fillOpacity: 0.5 // Fill opacity
    }).addTo(this.map);

    circleMarker.bindPopup('<b>London</b><br>London is the capital and largest city of both England and the United Kingdom, with a population of 8,866,180 in 2022.').openPopup();
  }

  onBasemapChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Remove the current layer
    this.map.removeLayer(this.currentLayer);

    // Add the new layer based on the selected value
    switch (selectedValue) {
      case 'osm':
        this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });
        break;
      case 'terrain':
        this.currentLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors',
        });
        break;
      case 'dark':
        this.currentLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        });
        break;
      default:
        break;
    }

    this.currentLayer.addTo(this.map);
  }
}