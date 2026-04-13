import React from 'react';
import { Tabs, Box, Text } from '@mantine/core';
import { CrmPipeline } from './flow/CrmPipeline';
import { OrgChart } from './flow/OrgChart';
import { TaskDependencies } from './flow/TaskDependencies';
import { CustomNodes } from './flow/CustomNodes';
export function ReactFlowSection() {
  return (
    <Box>
      <Tabs defaultValue="crm" variant="outline">
        <Tabs.List mb="md">
          <Tabs.Tab value="crm">CRM Pipeline</Tabs.Tab>
          <Tabs.Tab value="org">Org Chart</Tabs.Tab>
          <Tabs.Tab value="tasks">Task Dependencies</Tabs.Tab>
          <Tabs.Tab value="custom">Custom Nodes</Tabs.Tab>
        </Tabs.List>

        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--mantine-color-body)'
          }}>
          
          <Tabs.Panel value="crm">
            <CrmPipeline />
          </Tabs.Panel>

          <Tabs.Panel value="org">
            <OrgChart />
          </Tabs.Panel>

          <Tabs.Panel value="tasks">
            <TaskDependencies />
          </Tabs.Panel>

          <Tabs.Panel value="custom">
            <CustomNodes />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Box>);

}