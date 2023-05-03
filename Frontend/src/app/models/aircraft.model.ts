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


