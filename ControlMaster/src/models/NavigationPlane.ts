import { Beacon } from "./NavPoint";
import { NavigationCell } from "./NavigationCell";

export class NavigationPlane {
  private level: number;
  private cells: NavigationCell[][];

    constructor(level: number) {
      this.level = level;
    }

    public findCell(beacons: Beacon[]): NavigationCell {
      for (let rowIndex = 0; rowIndex < this.cells.length; rowIndex++) {
        const row = this.cells[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const cell = row[columnIndex];

          if (cell.withinBounds(beacons))  {
            return cell;
          }
        }
      }

      return undefined;
    }
}
