import { Beacon, NavPointModel } from "./NavPoint";

export interface BeaconPoint {
  left: number;

  top: number;

  navPoint: NavPointModel;
}

export class NavigationCell {
  private north: BeaconPoint;
  private east: BeaconPoint;

  private center: BeaconPoint;

  private south: BeaconPoint;

  private west: BeaconPoint;

  constructor(north: BeaconPoint, east: BeaconPoint, center: BeaconPoint, south: BeaconPoint, west: BeaconPoint) {
    this.north = north;
    this.east = east;
    this.center = center;
    this.south = south;
    this.west = west;
  }

  public withinBounds(beacons: Beacon[]): boolean {
    let matches: number = 0;

    if (this.isMatch(this.north, beacons)) {
      matches++;
    }

    if (this.isMatch(this.east, beacons)) {
      matches++;
    }

    if (this.isMatch(this.center, beacons)) {
      matches++;
    }

    if (this.isMatch(this.south, beacons)) {
      matches++;
    }

    if (this.isMatch(this.west, beacons)) {
      matches++;
    }

    return matches >= 3;
  }

  private isMatch(beaconPoint: BeaconPoint, beacons: Beacon[]): boolean {
    let isMatch: boolean = false;
    beaconPoint.navPoint.beacons.forEach(
      b => {
        const beacon = beacons.find(b2 => b2.name === b.name && b2.bssid === b.bssid);
        if (beacon && beacon.level == b.level) {
          isMatch = true;
        }
      }
    );

    return isMatch;
  }
}
