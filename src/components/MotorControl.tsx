import React, { useState, useCallback } from "react";
import { Card, Button, Row, Col } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
  RobotOutlined,
} from "@ant-design/icons";

interface MotorControlProps {
  onMotorControl: (action: string) => void;
}

export const MotorControl: React.FC<MotorControlProps> = ({
  onMotorControl,
}) => {
  const [forwardPressed, setForwardPressed] = useState(false);
  const [backwardPressed, setBackwardPressed] = useState(false);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const [dutyCycle, setDutyCycle] = useState(0);

  const resetButtons = useCallback(() => {
    setForwardPressed(false);
    setBackwardPressed(false);
    setLeftPressed(false);
    setRightPressed(false);
    setDutyCycle(0);
    onMotorControl("stop");
  }, [onMotorControl]);

  const handleMotorControl = useCallback(
    (action: string, duty: number) => {
      setDutyCycle(duty);
      onMotorControl(action);
    },
    [onMotorControl]
  );

  return (
    <Card title="Motor Control">
      <Row gutter={[16, 16]}>
        <Col span={8} offset={8}>
          <Button
            onMouseDown={() => handleMotorControl("forward", 2000)}
            onMouseUp={() => resetButtons()}
            onTouchStart={() => handleMotorControl("forward", 2000)}
            onTouchEnd={() => resetButtons()}
            type={forwardPressed ? "primary" : "default"}
            icon={<UpOutlined />}
            block
          ></Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Button
            onMouseDown={() => handleMotorControl("left", 2000)}
            onMouseUp={() => resetButtons()}
            onTouchStart={() => handleMotorControl("left", 2000)}
            onTouchEnd={() => resetButtons()}
            type={leftPressed ? "primary" : "default"}
            icon={<LeftOutlined />}
            style={{ borderRight: "none" }}
            block
          />
        </Col>
        <Col span={8} offset={8}>
          <Button
            onMouseDown={() => handleMotorControl("right", 2000)}
            onMouseUp={() => resetButtons()}
            onTouchStart={() => handleMotorControl("right", 2000)}
            onTouchEnd={() => resetButtons()}
            type={rightPressed ? "primary" : "default"}
            icon={<RightOutlined />}
            style={{ borderLeft: "none" }}
            block
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8} offset={8}>
          <Button
            onMouseDown={() => handleMotorControl("backward", 2000)}
            onMouseUp={() => resetButtons()}
            onTouchStart={() => handleMotorControl("backward", 2000)}
            onTouchEnd={() => resetButtons()}
            type={backwardPressed ? "primary" : "default"}
            icon={<DownOutlined />}
            block
          ></Button>
        </Col>
      </Row>
      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Button type="primary" icon={<RobotOutlined />} size="large" style={{ fontWeight: 'bold' }} block>
            Automatic driving
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
