import React, { useCallback } from "react";
import { CameraOutlined } from "@ant-design/icons";

import { Card, Button, Row, Col, Image, Spin } from "antd";
import IImageData from "../types/IImageData";

interface ImageCaptureProps {
  onImageCapture: () => void;
  loading: boolean;
  imageData: IImageData | null;
}

export const ImageDisplay: React.FC<ImageCaptureProps> = ({
  onImageCapture,
  loading,
  imageData,
}) => {
  const handleImageCapture = useCallback(() => {
    onImageCapture();
  }, [onImageCapture]);

  const getImgSrc = (): string => {
    const imageDataUrl: string = `data:image/jpeg;base64,${imageData?.imageData}`;
    return imageDataUrl;
  };

  return (
    <Card title="Image Display" style={{ height: "100%" }}>
      <Row style={{ marginTop: "16px" }} gutter={[16, 16]}>
        <Col span={24}>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? <Spin /> : <Image width={300} src={getImgSrc()} />}
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Button
            type="primary"
            onClick={handleImageCapture}
            icon={<CameraOutlined />}
            size="large"
            style={{ fontWeight: "bold" }}
            block
          >
            Capture Image
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
