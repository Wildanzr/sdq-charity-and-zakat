import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HmacSHA256, enc } from 'crypto-js';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class HmacGuard implements CanActivate {
  private readonly logger = new Logger(HmacGuard.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const request = context.switchToHttp().getRequest();
    const protocol =
      this.configService.get<string>('NODE_ENV') === 'production'
        ? 'https'
        : 'http';
    const body = request.body ?? undefined;
    const completeURL = `${protocol}://${request.get('host')}${request.originalUrl}`;
    const key = request.headers['x-api-key'] ?? request.query['key'];
    const timestamp =
      request.headers['x-timestamp'] ?? request.query['timestamp'];
    const signature =
      request.headers['x-signature'] ?? request.query['signature'];

    if (!key || !timestamp || !signature) {
      throw new UnauthorizedException('Missing required headers');
    }

    // this.logger.log('Key: ', key);
    // this.logger.log('Timestamp: ', timestamp);
    // this.logger.log('Signature: ', signature);
    // this.logger.log('Body: ', body);
    // this.logger.log('URL: ', completeURL);
    const identifier = await this.authService.getIdentityByApiKey(key);
    if (!identifier) {
      throw new UnauthorizedException('Invalid API Key');
    }

    const result = this.validateSignature(
      identifier.secret_key,
      signature,
      parseInt(timestamp),
      request.method,
      completeURL,
      body,
    );
    if (!result) {
      throw new UnauthorizedException('Invalid Signature');
    }

    return true;
  }

  /**
   * Validates the signature based on the provided secret, signature, timestamp, method, url, and optional body.
   * @param secret - The secret key used for signing the request.
   * @param signature - The signature to be validated.
   * @param timestamp - The timestamp of the request.
   * @param method - The HTTP method of the request.
   * @param url - The URL of the request.
   * @param body - The optional request body.
   * @returns A boolean indicating whether the signature is valid or not.
   */
  private validateSignature(
    secret: string,
    signature: string,
    timestamp: number,
    method: string,
    url: string,
    body?: object,
  ): boolean {
    if (body && Object.keys(body).length === 0) {
      body = undefined;
    }

    const toBeSigned = `${timestamp}|${method}|${url}${body ? `|${JSON.stringify(body)}` : ''}`;
    // this.logger.log('To be signed: ', toBeSigned);
    const localSignature = HmacSHA256(toBeSigned, secret).toString(enc.Hex);
    return localSignature === signature;
  }
}
