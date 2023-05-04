import { Controller } from "./decorators";

export enum AircraftStatus {
  PARKED = 1,
  AIRBORNE = 2,
  APROACH = 3,
  LANDED = 5
}
export enum AircraftType {
  AIRLINER = 1,
  PRIVATE = 2
}

export interface IAircraft {
  id: number,
  name: string,
  callSign?: string,
  autoPilot?: boolean,
  status: AircraftStatus,
  type: AircraftType,
  created: string
}


@Controller({ name: 'Aircraft' })
export class Aircraft implements IAircraft {
  constructor(
    public id = 0,
    public name = '',
    public status = AircraftStatus.PARKED,
    public type = AircraftType.AIRLINER,
    public created = ''
  ) { }
}


@Controller({ name: 'api' })
export class AircraftLocation {
  constructor(
    public type = 'AIRLINER',
    public latitude = 44.8212,
    public longitude = 20.4555,
    public altitude = 3500,
    public heading = 220
  ) { }
}


