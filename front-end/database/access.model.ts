import { Schema, model, models, Document } from "mongoose";

export interface IAccess extends Document {
  title: Schema.Types.String;
  image: Schema.Types.String;
  price: Schema.Types.Number;
  total: Schema.Types.Number;
  sold: Schema.Types.Number;
  details: Schema.Types.String;
  privateContent: Schema.Types.String;
  claimers: Schema.Types.String[];
  dueDate: Schema.Types.Date;
}

const AccessSchema = new Schema<IAccess>({
  title: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true },
  total: { type: Schema.Types.Number, required: true },
  sold: { type: Schema.Types.Number, default: 0 },
  details: { type: Schema.Types.String, required: true },
  privateContent: { type: Schema.Types.String },
  claimers: [{ type: Schema.Types.String }],
});

const Access = models.Access || model<IAccess>("Access", AccessSchema);

export default Access;