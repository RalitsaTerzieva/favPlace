export class Place {
    constructor(title, imageUri, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { lat: location.lat, lng: location.lng}; // { lat: 6767.8989, lng: 7i8798 }
        this.id = new Date().toString() + Math.random().toString();
    }
}