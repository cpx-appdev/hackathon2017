import { NavigationPlane } from "./NavigationPlane";
import { Beacon } from "./NavPoint";
import { NavigationCell } from "./NavigationCell";

export class Navigator {
  private grid: NavigationPlane;

  constructor(grid: NavigationPlane) {
    this.grid = grid;
  }

  private findCell(...beacons: Beacon[]): NavigationCell {
    return this.grid.findCell(beacons);
  }
}
