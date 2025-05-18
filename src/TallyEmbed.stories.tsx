
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TallyEmbed from "./TallyEmbed";

const meta: Meta<typeof TallyEmbed> = {
  title: "TallyEmbed/Playground",
  component: TallyEmbed
};

export default meta;

type Story = StoryObj<typeof TallyEmbed>;

export const Default: Story = {
  args: {
    formId: "your-form-id",
    fullscreen: false,
    queryParams: {
      hideTitle: 1,
      transparentBackground: 1,
      dynamicHeight: 1
    },
    theme: "light",
    showLoader: true
  }
};
