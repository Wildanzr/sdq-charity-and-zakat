import { Prop, SchemaFactory } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { CreateUpdate } from './create-update.schema';
import { HydratedDocument } from 'mongoose';

export class Identity extends CreateUpdate {
  @Prop({
    required: true,
    type: String,
  })
  identifier: string;

  @Prop({
    required: false,
    type: String,
    unique: true,
    default: `ap-${crypto.randomBytes(16).toString('hex')}`,
  })
  api_key: string;

  @Prop({
    required: false,
    type: String,
    unique: true,
    default: `sk-${crypto.randomBytes(16).toString('hex')}`,
  })
  secret_key: string;
}

export type IdentityDocument = HydratedDocument<Identity>;
export const IdentitySchema = SchemaFactory.createForClass(Identity);
