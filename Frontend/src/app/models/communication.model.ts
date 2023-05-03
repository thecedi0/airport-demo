import { Aircraft, IAircraft } from "./aircraft.model";
import { Controller } from "./decorators";

export enum CommunicationIntent {
  TAKEOFF = 1,
  LAND = 2,
}


export interface ICommunication {
  id: number,
  aircraft: IAircraft,
  intent: CommunicationIntent,
  response: boolean,
  created: string
}


@Controller({ name: 'public/communication' })
export class Communication implements ICommunication {
  constructor(
    public id = 0,
    public aircraft = new Aircraft,
    public intent = CommunicationIntent.TAKEOFF,
    public response = false,
    public created = ''
  ) { }
}
