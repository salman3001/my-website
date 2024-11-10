import { Button, Section, Text } from "@react-email/components";
import { EmailsLayout } from "./EmailsLayout.js";
import { ReactElement } from "react";
import React from "react";

interface mailProps {
  userName: string;
  verifyUrl: string;
}

export default function VerifyYourEmail(props: mailProps): ReactElement {
  return (
    <EmailsLayout
      render={(renderProps) => (
        <>
          <Text style={paragraph}>Hi {props?.userName || "User"},</Text>
          <Text style={paragraph}>
            Welcome to {renderProps?.appName || "AppName"}, Pleaese verify your
            email
          </Text>
          <Section style={btnContainer}>
            <Button>
              <a
                style={button}
                href={`${renderProps.baseUrl + props.verifyUrl}`}
                target="_blank"
              >
                Verify Email
              </a>
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
