import { ObjectId } from "bson";


class Room_checklist {

  constructor({
    date,
    room_id,
    staff,
    note,
    partition,
    checkList,
    checkListPros,
    status = Room_checklist.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.checkList = checkList;
    this.checkListPros = checkListPros;
    this.room_id = room_id;
    this.staff = staff;
    this.note = note;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "room_checklist",
    properties: {
      _id: "objectId",
      _partition: "string?",
      date: "int",
      room_id: "string",
      note: "string",
      staff: "string",
      status: "string",
      checkListPros: "array",
      checkList: "array",
    },
    primaryKey: "_id",
  };
}

class Logs {

  constructor({
    date,
    description,
    staff,
    partition,
    status = Room_checklist.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.description = description;
    this.staff = staff;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "logs",
    properties: {
      _id: "objectId",
      _partition: "string?",
      date: "int",
      description: "string",
      staff: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}






export { Room_checklist, Logs };
