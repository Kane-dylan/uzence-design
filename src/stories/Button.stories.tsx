import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Click Me",
    backgroundColor: "green"
  },
};

export const Secondary: Story = {
  args: {
    label: "Cancel",
    size: "md",
    backgroundColor: "green",
  },
};
