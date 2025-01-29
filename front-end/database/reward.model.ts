import { Schema, model, models, Document } from "mongoose";

export interface Reward extends Document {
  year: Schema.Types.Number;
  month: Schema.Types.Number;
  tasks: Schema.Types.ObjectId[];
  winner: Schema.Types.String[];
}

const RewardSchema = new Schema<Reward>({
  year: { type: Schema.Types.Number, required: true },
  month: { type: Schema.Types.Number, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  winner: [{ type: Schema.Types.String }],
});

const Reward = models.Reward || model<Reward>("Reward", RewardSchema);

export default Reward;