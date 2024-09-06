class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // { lat: 6767.8989, lon: 7i8798 }
        this.id = new Date().toString() + Math.random().toString();
    }
}