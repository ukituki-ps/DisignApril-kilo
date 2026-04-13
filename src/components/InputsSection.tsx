import React from 'react';
import {
  Stack,
  Group,
  TextInput,
  PasswordInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Text,
  SimpleGrid } from
'@mantine/core';
import { useDensity } from '../DensityContext';
export function InputsSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  return (
    <Stack gap="xl">
      <SimpleGrid
        cols={{
          base: 1,
          md: 2
        }}
        spacing="xl">
        
        <Stack gap="md">
          <Text fw={500} size="sm">
            Text Inputs
          </Text>

          <TextInput
            label="Standard Input"
            description="Please enter your full name"
            placeholder="John Doe"
            size={size} />
          

          <TextInput
            label="Disabled Input"
            placeholder="Cannot edit this"
            disabled
            size={size} />
          

          <TextInput
            label="Error Input"
            placeholder="Enter email"
            error="Invalid email address"
            size={size} />
          

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size={size} />
          
        </Stack>

        <Stack gap="md">
          <Text fw={500} size="sm">
            Other Controls
          </Text>

          <Select
            label="Select Box"
            placeholder="Pick one"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            size={size} />
          

          <Textarea
            label="Textarea"
            placeholder="Enter your message here..."
            minRows={3}
            size={size} />
          
        </Stack>
      </SimpleGrid>

      <SimpleGrid
        cols={{
          base: 1,
          md: 3
        }}
        spacing="xl">
        
        <Stack gap="sm">
          <Text fw={500} size="sm">
            Checkboxes
          </Text>
          <Checkbox label="Default checkbox" size={size} />
          <Checkbox label="Checked checkbox" defaultChecked size={size} />
          <Checkbox label="Disabled checkbox" disabled size={size} />
        </Stack>

        <Stack gap="sm">
          <Text fw={500} size="sm">
            Radio Buttons
          </Text>
          <Radio.Group
            name="favoriteFramework"
            defaultValue="react"
            size={size}>
            
            <Stack gap="xs" mt="xs">
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" disabled />
            </Stack>
          </Radio.Group>
        </Stack>

        <Stack gap="sm">
          <Text fw={500} size="sm">
            Switches
          </Text>
          <Switch label="Default switch" size={size} />
          <Switch label="Checked switch" defaultChecked size={size} />
          <Switch label="Disabled switch" disabled size={size} />
        </Stack>
      </SimpleGrid>
    </Stack>);

}