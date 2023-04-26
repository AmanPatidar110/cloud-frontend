// @flow
import { Card, Descriptions, Space, Tag } from 'antd';
import * as React from 'react';

const gridStyle = {
  width: '100%',
  textAlign: 'center',
};
const tagPlusStyle = {
  background: 'success',
  borderStyle: 'dashed',
  margin: '0.5rem',
};

export const ProjectContainers = ({ containers }) => {
  console.log(containers);
  return (
    <Card
      title={`Containers (${containers?.length || 0})`}
      style={{
        width: 650,
      }}
    >
      {containers.map((container, index) => (
        <Card.Grid style={gridStyle}>
          <Descriptions
            layout="vertical"
            title={`Container ${index + 1}`}
            bordered
          >
            <Descriptions.Item label="CPU Usage">
              {container?.stats?.cpuUsagePercent || 0}%
            </Descriptions.Item>
            <Descriptions.Item label="Memory %">
              {container?.stats?.memUsagePercent || 0}%
            </Descriptions.Item>
            <Descriptions.Item label="Memory Usage / Limt">
              {container?.stats?.memUsageRatio || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Network Usage">
              <Space align="center">
                {container?.stats?.networkStats?.map((network) => (
                  <Card
                    style={{
                      margin: '1rem 0',
                      width: '15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                    title={network?.networkName}
                  >
                    <Tag style={tagPlusStyle}>
                      {network?.transmittedMB} MB (Outbound)
                    </Tag>
                    <Tag style={tagPlusStyle}>
                      {network?.receivedMB} MB (Inbound)
                    </Tag>
                    <Tag style={tagPlusStyle}>
                      {network?.totalMB} MB (Total Traffic)
                    </Tag>
                    <Tag style={tagPlusStyle}>
                      {network?.throughput} MB (Throughput)
                    </Tag>
                  </Card>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card.Grid>
      ))}
    </Card>
  );
};
