import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity } from 'src/schema/identity.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(Identity.name) private readonly identityModel: Model<Identity>,
  ) {}

  async getIdentityByApiKey(apiKey: string): Promise<Identity | null> {
    try {
      return await this.identityModel.findOne({ api_key: apiKey });
    } catch (error) {
      this.logger.error('Error getting identity by api key', error);
      throw error;
    }
  }
}
