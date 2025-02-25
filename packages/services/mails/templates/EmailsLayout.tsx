import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import React from "react";
import { PropsWithChildren, ReactElement } from "react";

interface RenderProps {
  baseUrl: string;
  appName: string;
  frontUrl: string;
}

interface props {
  render: (props: RenderProps) => ReactElement;
}

export const EmailsLayout = ({ render }: PropsWithChildren<props>) => {
  const baseUrl = process.env?.APP_URL
    ? process.env.APP_URL
    : "http://localhost:4000";

  const frontUrl = process.env?.FRONT_URL
    ? process.env.FRONT_URL
    : "http://localhost:3000";

  const appName = process.env?.APP_NAME ? process.env.APP_NAME : "SalmanDev";

  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/images/logo-black.webp`}
            width="200"
            height="auto"
            alt="Koala"
            style={logo}
          />
          {render({ baseUrl, frontUrl, appName })}
          <Hr style={hr} />
          <Text style={footer}>Developed by Salman</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
