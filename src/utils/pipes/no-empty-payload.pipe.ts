import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class NoEmptyPayloadPipe implements PipeTransform {
  public transform<T = unknown>(payload: T): T {
    if (!Object.keys(payload as keyof T).length) {
      throw new UnprocessableEntityException('Payload is required');
    }

    return payload;
  }
}
