import React, { useEffect, useState } from "react";

import { MotorControl } from "./components/MotorControl";
import { ClawControl } from "./components/ClawControl";
import { CameraStream } from "./components/CameraStream";
import { ImageDisplay } from "./components/ImageDisplay";
import { DistanceDisplay } from "./components/DistanceDisplay";
import { ConnectApi } from "./components/ConnectApi";
import { useMotorControl } from "./hooks/useMotorControl";
import { useImageCapture } from "./hooks/useImageCapture";
import { useClawControl } from "./hooks/useClawControl";
import { useDistance } from "./hooks/useDistance";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Row, Col } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("Robot Control", "1", <DesktopOutlined />)];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const [apiUrl, setApiUrl] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMotorControl = useMotorControl();
  const handleClawControl = useClawControl();
  const { handleImageCapture, imageData, loading } = useImageCapture();
  
  // const distance = useDistance(1000); // Update distance every 1000 ms (1 second)
  const cameraStreamUrl = `http://191.168.1.15:5000/api/camera-stream`;

  const handleMenuSelect = ({ key }: { key: React.Key }) => {
    setSelectedKeys([key.toString()]);
  };

  const handleApiUrlChange = (newApiUrl: string) => {
    setApiUrl(newApiUrl);
  };

  const handleConnectionStatusChange = (status: boolean) => {
    setIsConnected(status);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{marginLeft: '1rem'}}>
            <ConnectApi onApiUrlChange={handleApiUrlChange}
                        onConnectionStatusChange={handleConnectionStatusChange} />
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {selectedKeys[0] === "1" && isConnected ? (
            <div className="App">
              <h1>Tank Control Interface</h1>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <ClawControl onClawControl={handleClawControl} />
                  <MotorControl onMotorControl={handleMotorControl} />
                  <DistanceDisplay socketUrl={apiUrl} />
                </Col>
                <Col xs={24} sm={12} lg={18}>
                  {/* <CameraStream streamUrl={cameraStreamUrl} /> */}
                  <ImageDisplay loading={loading} imageData={imageData} onImageCapture={handleImageCapture} />
                </Col>
              </Row>
            </div>
          ): <p>Not connected</p>}
        </Content>
        <Footer style={{ textAlign: "center" }}>Nikita Nikitins ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
