import { CityDTO } from "./city.dto";

export interface AdressDTO{
    id : string;
    logadouro : string;
    number : string;
    complement : string;
    district : string;
    cep : string;
    city : CityDTO;
}