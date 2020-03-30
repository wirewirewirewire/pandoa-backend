API:
https://documenter.getpostman.com/view/543781/SzS7R6ux?version=latest

## How to run this service locally?

1. Ensure mongodb is [installed and running](https://docs.mongodb.com/manual/administration/install-community/)
2. Copy `./config/database.js.example` to `./config/database.js`.
3. Run `npm install`
4. Run `export NODE_ENV=development`
5. Run `npm start`

## Generate Sample Data

To generate Samples for Upload use:

https://www.json-generator.com/

Template upload Container:

[
  '{{repeat(100, 100)}}',
  
  {
  
    speed: '{{integer(20, 40)}}',
    lat: '{{floating(-90.000001, 90)}}',
    lng: '{{floating(-180.000001, 180)}}',
    time: '{{date()}}'
  }
]
