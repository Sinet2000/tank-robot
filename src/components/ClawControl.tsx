import React, { useState, useCallback } from "react";
import { Card, Button, Row, Col, Slider, InputNumber } from "antd";
import { initClawControl } from "../api/tankApi";
import {
  LeftOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import IClawInitControl from "../types/IClawInitControl";

interface ClawControlProps {
  onClawControl: (clawControlModel: IClawInitControl) => void;
}

export const ClawControl: React.FC<ClawControlProps> = ({ onClawControl }) => {
  const [clawActive, setClawActive] = useState(false);
  const [clawInitControlData, setClawInitControlData] = useState<IClawInitControl | null>(null);

  const onClawSqueezeChange = (newValue: number) => {

    if (clawInitControlData && clawInitControlData.clawMinValue !== null && clawInitControlData.clawMaxValue !== null) {
      const newControlData: IClawInitControl = {
        ...clawInitControlData,
        clawCurrentValue: newValue,
      };
      setClawInitControlData(newControlData);
      onClawControl(newControlData);
    }
  };

  const onClawVerticalChange = (newValue: number) => {

    if (clawInitControlData && clawInitControlData.clawHandlerMinValue !== null && clawInitControlData.clawHandlerMaxValue !== null) {
      const newControlData: IClawInitControl = {
        ...clawInitControlData,
        clawHandlerCurrentValue: newValue,
      };
      setClawInitControlData(newControlData);
      onClawControl(newControlData);
    }

  };

  const handleActivateClaw = async () => {
    const response = await initClawControl();

    if (response.status === 200) {
      const responseData = response.data.data;
      const clawInitControlData: IClawInitControl = {
        clawMaxValue: responseData.clawMaxValue,
        clawMinValue: responseData.clawMinValue,
        clawCurrentValue: responseData.clawCurrentValue,
        clawHandlerMaxValue: responseData.clawHandlerMaxValue,
        clawHandlerMinValue: responseData.clawHandlerMinValue,
        clawHandlerCurrentValue: responseData.clawHandlerCurrentValue,
      };
      setClawInitControlData(clawInitControlData);
      setClawActive(true);
    } else {
      setClawActive(false);
    }
  };

  return (
    <Card title="Claw Control" style={{ marginBottom: "2rem" }}>
      {clawActive ? (
        <>
          <Row gutter={[16, 16]}>
            <div style={{ display: "inline-block", height: 300 }}>
              <Slider
                vertical
                min={clawInitControlData?.clawHandlerMinValue}
                max={clawInitControlData?.clawHandlerMaxValue}
                onChange={onClawVerticalChange}
                defaultValue={clawInitControlData?.clawHandlerCurrentValue}
              />
            </div>
          </Row>
          <Row>
            <Col span={24}>
              <Slider
                min={clawInitControlData?.clawMinValue}
                max={clawInitControlData?.clawMaxValue}
                onChange={onClawSqueezeChange}
                value={clawInitControlData?.clawCurrentValue}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Row style={{ marginTop: "16px" }}>
          <Col span={24}>
            <Button
              type="primary"
              onClick={handleActivateClaw}
              icon={<RobotOutlined />}
              size="large"
              style={{ fontWeight: "bold" }}
              block
            >
              Activate Claw
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};
