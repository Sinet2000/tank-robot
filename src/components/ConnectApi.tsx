import React, { useState } from "react";
import { Row, Col, Button, Input, message } from "antd";
import { setApiBaseUrl } from "../api/api";
import { useApiConnection } from "../hooks/useTestApiConnection";

interface ConnectApiProps {
  onApiUrlChange: (apiUrl: string) => void;
  onConnectionStatusChange: (isConnected: boolean) => void;
}

export const ConnectApi: React.FC<ConnectApiProps> = ({
  onApiUrlChange,
  onConnectionStatusChange,
}) => {
  const { apiUrl, setApiUrl, isConnected, setIsConnected, testApiConnection } =
    useApiConnection();

  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    if (!isValidUrl(apiUrl)) {
      message.info("Incorrect URL provided!");
      return;
    }

    setLoading(true);

    setApiBaseUrl(apiUrl);

    const connected = await testApiConnection();
    onApiUrlChange(apiUrl);
    onConnectionStatusChange(connected);
    connected
      ? message.success("Connected successfully!")
      : message.error("Error connecting to API");

    setLoading(false);
  };

  const isValidUrl = (urlString: string) => {
    if (urlString.trim().length === 0) {
      return false; // string is empty
    }

    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <Row justify="space-between">
      <Col span={19}>
        <Input
          placeholder="Enter API URL"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          onClick={handleTestConnection}
          loading={loading}
          block
        >
          Connect
        </Button>
      </Col>
    </Row>
  );
};
