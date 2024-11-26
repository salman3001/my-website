import { Button, Section, Text } from "@react-email/components";
import { EmailsLayout } from "./EmailsLayout.js";

import React from "react";

interface mailProps {
  email: string;
  message: string;
  phone: string | null;
}

export default function NewContactMessageEmail(props: mailProps) {
  return (
    <EmailsLayout
      render={(renderProps) => (
        <>
          <Text style={paragraph}>Hello, My Creator Salman,</Text>
          <Text style={paragraph}>You have a new contact message</Text>
          <Text style={paragraph}>
            Email: {props?.email || "xxxxx"}
            <br />
            Phone: {props?.phone || "xxxxxxx"}
          </Text>
          <Text style={paragraph}>
            Message: {props?.message || "Would like to hire you for job"}
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${renderProps.frontUrl}/admin/contact-messages`}
            >
              Check out here
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
