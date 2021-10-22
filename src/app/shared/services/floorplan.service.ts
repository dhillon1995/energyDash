import { Injectable } from '@angular/core';
import  { InfluxService } from './influx.service';

@Injectable({
	providedIn: 'root'
})
export class FloorplanService {
	sensorList = [
		{ id: '6119810', location:'-' },
		{ id: '6119798', location:'meeting room 2' },
		{ id: '6119795', location:'meeting 4' },
		{ id: '6119765', location:'IT/CF window' },
		{ id: '6119729', location:'ops rear centre' },
		{ id: '6119815', location:'meeting 1' },
		{ id: '6120094', location:'finance window' },
		{ id: '6119813', location:'Praxis window' },
		{ id: '6119818', location:'Ops rear window' },
		{ id: '6120084', location:'TPI Sales Window' },
		{ id: '6120043', location:'-' },
		{ id: '6120042', location:'Guest kitchen' },
		{ id: '6119939', location:'main kitchen' },
		{ id: '6119920', location:'reception' },
		{ id: '6120085', location:'meeting 3' },
		{ id: '6120127', location:'direct sales printer 2' },
		{ id: '6119806', location:'meeting 5' },
		{ id: '6119791', location:'Trading window (fred)' },
		{ id: '6120093', location:'direct sales window' },
		{ id: '6119801', location:'finance centre' }
	];

	constructor(private influxService: InfluxService) {
		//this.processSensordata();
	}

	getSensorsData() {
		return this.sensorList;
	}

	processSensordata() {
		this.sensorList.map((item, index) => {
			const humiQuery = `|> range(start: -1h)
				|> filter(fn:(r) => r._field == "uplink_message_decoded_payload_humidity_value" and
				r.topic == "v3/bgoffice@bgpoc/devices/bgstrips-${item.id}/up" )`;
			this.influxService.runInfluxQuery( humiQuery ).then( ( res: any ) => {
				if ( res.length > 0 ) Object.assign( item, { 'humidity': res[0]._value } );
				else Object.assign(item, { 'humi': 0 } );
			});

			const tempQuery = `|> range(start: -1h)
				|> filter(fn:(r) => r._field == "uplink_message_decoded_payload_averageTemperature_value" and
				r.topic == "v3/bgoffice@bgpoc/devices/bgstrips-${item.id}/up" )`;
			this.influxService.runInfluxQuery( tempQuery ).then( ( res: any ) => {
				if ( res.length > 0 ) Object.assign( item, { 'temperature': res[0]['_value'] } );
				else Object.assign( item, { 'temperature': 0 } );
			});

			const luxQuery = `|> range(start: -1h)
				|> filter(fn:(r) => r._field == "uplink_message_decoded_payload_lux_value" and
				r.topic == "v3/bgoffice@bgpoc/devices/bgstrips-${item.id}/up" )`;
			
			this.influxService.runInfluxQuery( luxQuery ).then( ( res: any ) => {
				if (res.length > 0) Object.assign( item, {'lux':res[0]['_value'] } );
				else Object.assign(item, { 'lux': 0 } );
			});
		});
		console.log(this.sensorList);
	}
}
