import { Nacionalnost } from './nacionalnost.model';
import { Tim } from './tim.model';

export class Igrac {
    id: number;
    ime: string;
    prezime: string;
    brojReg: number;
    datumRodjenja: Date;
    nacionalnost: Nacionalnost;
    tim: Tim;
}