import * as React from "react";

export interface IMailSendProps {
  from: string;
  to: string;
  subject: string;
  react: () => React.ReactElement;
}
