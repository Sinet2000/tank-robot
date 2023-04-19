import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Card, Statistic, message } from "antd";

interface DistanceDisplayProps {
  socketUrl: string;
}

export const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  socketUrl,
}) => {
  const [distance, setDistance] = useState<number | null>(null);
  const socket = io(getBaseUrl(socketUrl)).connect();

  function getBaseUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}:${parsedUrl.port}`;
    } catch (error) {
      message.error("Invalid socket url - will be changed to default");
      return "http://192.168.1.15:5000";
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
      // socket.emit("request_distance");
    });
    
    socket.on("disconnect", (data) => {
      console.log('on disconnect');
    });

    socket.on("distance_update", ({ distance }) => {
      console.log(`distance: ${distance}`);
      setDistance(distance);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Card
      title="Ultrasonic ditance measurement"
      style={{ marginTop: "1rem", marginBottom: "1rem" }}
    >
      <div style={{ textAlign: "center", margin: "1rem" }}>
        {distance !== null ? (
          <Statistic title="Distance to object" value={distance} suffix="cm" />
        ) : (
          <p>Waiting for distance data from sensors...</p>
        )}
      </div>
    </Card>
  );
};
