import * as React from "react";

export interface IMailSendProps {
  to: string;
  subject: string;
  react: () => React.ReactElement;
}
