import React from "react";
import { Card, Button, Row, Col } from "antd";

interface CameraStreamProps {
  streamUrl: string;
}

export const CameraStream: React.FC<CameraStreamProps> = ({ streamUrl }) => {
  return (
    <Card title="Camera Stream" style={{ height: '100%' }}>
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video
          src={streamUrl}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </Card>
  );
};
