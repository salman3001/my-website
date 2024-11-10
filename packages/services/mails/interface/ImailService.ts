import { IMailSendProps } from "./IMailSendProps.js";

export abstract class IMailService {
  abstract send(sendProps: IMailSendProps): Promise<void>;
}
