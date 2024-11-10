import { Button, Section, Text } from "@react-email/components";
import { EmailsLayout } from "./EmailsLayout.js";
import { ReactElement } from "react";
import React from "react";

interface mailProps {
  userName: string;
  resetUrl: string;
}

export default function ForgotPasswordEmail(props: mailProps): ReactElement {
  return (
    <EmailsLayout
      render={(renderProps) => (
        <>
          <Text style={paragraph}>Hi {props.userName || "UserName"},</Text>
          <Text style={paragraph}>
            Forgot your password? Please click below to reset your password
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${renderProps.baseUrl + props.resetUrl}`}
            >
              Reset Password
            </Button>
          </Section>
          <Text style={paragraph}>
            Best Regards,
            <br />
            {renderProps.appName || "appName"} team
          </Text>
        </>
      )}
    />
  );
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};
