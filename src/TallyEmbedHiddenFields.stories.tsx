
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TallyEmbed from "./TallyEmbed";

const meta: Meta<typeof TallyEmbed> = {
  title: "TallyEmbed/HiddenFields",
  component: TallyEmbed
};

export default meta;

type Story = StoryObj<typeof TallyEmbed>;

export const PreFilledHiddenFields: Story = {
  args: {
    formId: "your-form-id",
    fullscreen: false,
    queryParams: {
      user_id: "oussama-9876",
      plan: "pro",
      ref: "storybook"
    },
    theme: "light",
    showLoader: true
  }
};
