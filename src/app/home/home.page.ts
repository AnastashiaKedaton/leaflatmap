import { Component } from '@angular/core';
import * as L from 'leaflet';

interface Location {
  coords: [number, number]; // Explicitly define as tuple type
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  basemapLayers: any = {};
  markerIcon!: L.Icon;
  locations: Location[] = [
    {
      coords: [106.730481481902, -6.1226180490744],
      name: "Happy Puppy Taman Palem"
    },
    {
      coords: [106.760007238154, -6.15265727071443],
      name: "Happy Puppy Green Garden"
    },
    {
      coords: [106.761380529143, -6.10759780419197],
      name: "Happy Puppy Pantai Indah Kapuk"
    },
    {
      coords: [106.832105015049, -6.13900328901989],
      name: "Happy Puppy Grand Kartini"
    },
    {
      coords: [106.781293248476, -6.20249132159564],
      name: "Happy Puppy Permata Hijau"
    },
    {
      coords: [106.797086094843, -6.26119388363819],
      name: "Happy Puppy Plaza Golden Fatmawati"
    },
    {
      coords: [106.744901037281, -6.26187643288048],
      name: "Happy Puppy Bintaro Marcella"
    }
  ];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {
    // Initialize map with center point in Central Java
    this.map = L.map('mapId').setView([-6.208763, 106.845599], 8);

// Define basemap layers
this.basemapLayers = {
  'Topographic': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors',
  }),
  'Streets': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }),
  'Satellite': L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
  }),
  'Hybrid': L.layerGroup([
    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
    }),
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.5,
      attribution: '&copy; OpenStreetMap contributors',
    }),
    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
    })
  ])
};

// Set default basemap
this.basemapLayers['Streets'].addTo(this.map);

// Initialize marker icon and add markers
this.initializeMarkerIcon();
this.addMarkers();

// Add layer control
L.control.layers(this.basemapLayers).addTo(this.map);
}

initializeMarkerIcon() {
this.markerIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});
}

addMarkers() {
// Create markers array to track all markers
const markers: L.Marker[] = [];

this.locations.forEach(location => {
  // Create LatLng object from coordinates
  const latlng = L.latLng(location.coords[1], location.coords[0]); // Note: Swap coordinates for correct order

  const marker = L.marker(latlng, {
    icon: this.markerIcon
  })
    .addTo(this.map)
    .bindPopup(location.name);

  markers.push(marker);
});

// Create a feature group from markers
const group = L.featureGroup(markers);

// Fit the map to show all markers with some padding
this.map.fitBounds(group.getBounds().pad(0.1));
  }
}