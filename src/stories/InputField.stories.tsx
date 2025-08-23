import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof InputField>;


export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be visible to others",
    size: "md",
    variant: "outlined",
    value: "",
    disabled: true,
    invalid: false,
    loading: true,
  },
};


export const Filled: Story = {
  args: {
    label: "Email",
    placeholder: "example@mail.com",
    helperText: "We’ll never share your email",
    size: "md",
    variant: "filled",
    value: "",
  },
};


export const Error: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    errorMessage: "Password must be at least 8 characters",
    helperText: "Password must be at least 8 characters",
    size: "md",
    variant: "outlined",
    value: "",
  },
};



export const Interactive = () => {
  const [value, setValue] = useState("");

  return (
    <InputField
      label="Search"
      placeholder="Type something..."
      helperText="You can actually type here"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      size="md"
      variant="outlined"
    />
  );
};
