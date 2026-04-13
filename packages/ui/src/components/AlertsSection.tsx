import React from 'react';
import { Stack, Alert, Notification, SimpleGrid, Text } from '@mantine/core';
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon } from
'lucide-react';
export function AlertsSection() {
  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Text fw={500} size="sm">
          Alerts (In-page messages)
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            md: 2
          }}
          spacing="md">
          
          <Alert
            variant="light"
            color="blue"
            title="Information"
            icon={<InfoIcon size={16} />}>
            
            This is an informational alert. Use it to convey general information
            to the user.
          </Alert>

          <Alert
            variant="light"
            color="teal"
            title="Success"
            icon={<CheckCircleIcon size={16} />}>
            
            Your changes have been saved successfully.
          </Alert>

          <Alert
            variant="light"
            color="orange"
            title="Warning"
            icon={<AlertTriangleIcon size={16} />}>
            
            Your subscription is about to expire in 3 days. Please renew to
            avoid interruption.
          </Alert>

          <Alert
            variant="light"
            color="red"
            title="Error"
            icon={<XCircleIcon size={16} />}>
            
            Failed to connect to the server. Please check your internet
            connection and try again.
          </Alert>
        </SimpleGrid>
      </Stack>

      <Stack gap="md">
        <Text fw={500} size="sm">
          Notifications (Toast messages)
        </Text>
        <SimpleGrid
          cols={{
            base: 1,
            md: 2
          }}
          spacing="md">
          
          <Notification
            title="Task Completed"
            color="teal"
            icon={<CheckCircleIcon size={18} />}
            onClose={() => {}}>
            
            The report generation task has finished successfully.
          </Notification>

          <Notification
            title="Upload Failed"
            color="red"
            icon={<XCircleIcon size={18} />}
            onClose={() => {}}>
            
            The file "Q3_Financials.pdf" exceeds the maximum allowed size of
            10MB.
          </Notification>
        </SimpleGrid>
      </Stack>
    </Stack>);

}