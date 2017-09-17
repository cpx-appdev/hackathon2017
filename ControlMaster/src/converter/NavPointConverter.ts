"use strict";

import { default as NavPoint, NavPointModel, Beacon } from "../models/NavPoint";
import { NavPointDto, EntryDto } from "../models/NavPointDto";

export let convertFrom = (dto: NavPointDto) => {
  const doc = {
    name: dto.navPointName,
    beacons: Array<Beacon>()
  };

  dto.entries.forEach(e =>
    doc.beacons.push({
      name: e.name,
      bssid: e.bssid,
      level: e.level
    })
  );

  const navPoint = new NavPoint(doc);
  return navPoint;
};
