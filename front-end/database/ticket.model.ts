import { Schema, model, models, Document } from "mongoose";

export interface ITicket extends Document {
  type: Schema.Types.String;
  title: Schema.Types.String;
  platform: Schema.Types.String;
  link: Schema.Types.String;
  points: Schema.Types.Number;
  finisher: Schema.Types.String[];
}
const TicketSchema = new Schema<ITicket>({
  type: { type: Schema.Types.String, required: true },
  title: { type: Schema.Types.String, required: true },
  platform: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
  finisher: [{ type: Schema.Types.String }],
});

const Ticket = models.Ticket || model<ITicket>("Ticket", TicketSchema);

export default Ticket;