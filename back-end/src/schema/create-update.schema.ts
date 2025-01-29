import { Prop } from '@nestjs/mongoose';

export class CreateUpdate {
  @Prop({
    required: false,
    type: Date,
    default: () => Date.now(),
  })
  created_at: Date;

  @Prop({
    required: false,
    type: Date,
    default: () => Date.now(),
  })
  updated_at: Date;

  @Prop({
    required: false,
    type: Date,
    default: () => null,
  })
  deleted_at: Date;
}
