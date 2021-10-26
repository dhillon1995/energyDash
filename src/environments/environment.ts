// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  InfluxDB_Url: "https://us-east-1-1.aws.cloud2.influxdata.com",
  InfluxDB_Token: "WTEP2YugFLVzeztghgeekD-jELiiQ0IDrbiO3bJs7FEv4ThEfXWINrx9bCVS-gtXG34YjmdOU9zq109bmKGDqw==",
  InfluxDB_Org: "bgpoc@stinchcombe.co.uk",
  InfluxDB_Bucket: "bgoffice",
  dayTariff: 15.3022,
  nightTariff: 11.2552
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
