export class Place {
    constructor(title, imageUri, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location
        this.location = { lat: location,  lng: location }; // { lat: 6767.8989, lng: 7i8798 }
        this.id = new Date().toString() + Math.random().toString();
    }
}