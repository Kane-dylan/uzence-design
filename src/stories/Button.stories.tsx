import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Click Me",
    backgroundColor: "blue",
    size: "sm",
  },
};

export const Secondary: Story = {
  args: {
    label: "Cancel",
    size: "md",
    backgroundColor: "red",
  },
};
