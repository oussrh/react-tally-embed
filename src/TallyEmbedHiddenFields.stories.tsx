
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TallyEmbed from "./TallyEmbed";

const meta: Meta<typeof TallyEmbed> = {
  title: "TallyEmbed/HiddenFields",
  component: TallyEmbed
};

export default meta;

type Story = StoryObj<typeof TallyEmbed>;

export const WithHiddenFields: Story = {
  args: {
    formId: "your-form-id",
    fullscreen: true,
    theme: "dark",
    animation: "slide",
    queryParams: {
      user_id: "oussama-9876",
      source: "storybook",
      campaign: "demo"
    },
    showLoader: true
  }
};
