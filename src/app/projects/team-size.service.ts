import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamSizeService {

  constructor() { }

  getTeamSizeDivider() {
    return 5;
  }
}
