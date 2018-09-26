# Google Maps Geocode Example

Example usage of the google maps geocode node api using NextJS.

## Usage

Rename `example.env` to `.env` and fill in the `GOOGLE_MAPS_API_KEY` variable.

### Start the server

`$ npm start`

The first run may take a bit of time, as a `json` database of geocoded addresses will be built and stored.

You will run into quota issues if you are running with a developer api key.

### Open

`$ open http://localhost:3000/`

You can toggle between a list view and a map view at the top or filter the displayed addresss.

The map will center on the first result in the list.