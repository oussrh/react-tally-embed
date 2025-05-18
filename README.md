# react-tally-embed v3

> Advanced React component to embed Tally.so forms with **fullscreen modal**, **custom animations**, **ref-based controls**, **theme support**, and **loader**.

![npm version](https://img.shields.io/npm/v/react-tally-embed)
![license](https://img.shields.io/npm/l/react-tally-embed)

## Why use Tally.so?

Tally is a modern, Notion-style form builder used by indie devs, startups, and product teams. Compared to other platforms like Typeform or Google Forms, Tally offers:

- **Unlimited forms and responses** (even on the free plan)
- **No branding** on most features, unlike Typeform
- **Fast and intuitive interface** (like Notion)
- **Custom domains, file uploads, logic jumps** in the Pro plan
- **Easy embed options** for developers and no-code tools

This makes it perfect for simple, powerful, and affordable form integrations.

---

## Installation

```bash
npm install react-tally-embed
```

---

## Features

- **Fullscreen modal** support (no external modal lib required)
- **Ref control**: open/close the form programmatically
- **Theme**: light or dark mode
- **Custom loader** while loading the iframe
- **Event hooks**: `onOpen`, `onSubmit`, `onClose`
- **Custom animations**: `fade`, `slide`

---

## Usage

```tsx
import { TallyEmbed } from "react-tally-embed";

<TallyEmbed
  formId="your-form-id"
  queryParams={{
    hideTitle: 1,
    transparentBackground: 1,
    dynamicHeight: 1,
  }}
  fullscreen
  theme="dark"
  animation="slide"
  showLoader={true}
  loaderComponent={<div>Loading...</div>}
  onSubmit={() => console.log("Form submitted")}
/>
```

---

## Pre-filling hidden fields (queryParams)

If your Tally form includes **hidden fields**, you can pass values directly using `queryParams`. These will be filled automatically in the form, without being visible to the user.

```tsx
<TallyEmbed
  formId="your-form-id"
  queryParams={{
    user_id: "oussama-9876",
    ref: "website",
    plan: "pro"
  }}
/>
```

---

## Ref control (open/close)

```tsx
import { useRef } from "react";
import { TallyEmbed, TallyEmbedRef } from "react-tally-embed";

const ref = useRef<TallyEmbedRef>(null);

<button onClick={() => ref.current?.open()}>Open Form</button>
<TallyEmbed ref={ref} formId="your-form-id" fullscreen />
```

---

## Props

| Prop              | Type                                 | Default   | Description                                  |
|-------------------|--------------------------------------|-----------|----------------------------------------------|
| `formId`          | `string`                             | —         | **Required.** Tally form ID                  |
| `height`          | `number`                             | `500`     | Height of the iframe (if not dynamic)        |
| `queryParams`     | `Record<string, string | number | boolean>` | `{}` | Optional Tally query parameters              |
| `onOpen`          | `() => void`                         | —         | Triggered when form is opened                |
| `onSubmit`        | `() => void`                         | —         | Triggered when form is submitted             |
| `onClose`         | `() => void`                         | —         | Triggered when form is closed                |
| `fullscreen`      | `boolean`                            | `false`   | Open form in fullscreen overlay              |
| `animation`       | `"fade" | "slide"`                   | `fade`    | Animation style for fullscreen               |
| `showLoader`      | `boolean`                            | `false`   | Show a loader until iframe is ready          |
| `loaderComponent` | `React.ReactNode`                    | `<div>Loading...</div>` | Custom loader UI       |
| `theme`           | `"light" | "dark"`                   | `light`   | Color theme for the container                |

---

## License

MIT