import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
}

export default meta;
type Story = StoryObj<typeof InputField>;


export const simple: Story = {
  args: {
    label: "Input text",
    size: "md",
    // value: "",
    placeholder: "Type Your amazing text",
    variant: "filled",
  }
}