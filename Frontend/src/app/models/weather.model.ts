import { Controller } from "./decorators";

export interface IWeather {
  id: number,
  description: string,
  temperature: number,
  visibility: number,
  windSpeed: number,
  windDeg: number,
  last_update: string,
}

@Controller({ name: 'public/weather' })
export class Weather implements IWeather {
  constructor(
    public id = 0,
    public description = 'broken clouds',
    public temperature = 25,
    public visibility = 1000,
    public windSpeed = 4.9,
    public windDeg = 220,
    public last_update = '',
  ) { }
}
