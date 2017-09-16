import * as mongoose from "mongoose";

export type NavPointModel = mongoose.Document & {
  name: string,
  beacons: Beacon[]
};

export type Beacon = {
  name: string,
  bssid: string,
  level: number
};

const navPointSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  beacons: Array
}, { timestamps: true });

const NavPoint = mongoose.model("NavPoint", navPointSchema);
export default NavPoint;
