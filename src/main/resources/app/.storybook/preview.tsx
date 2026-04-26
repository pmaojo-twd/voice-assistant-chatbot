import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "1024px" },
          type: "desktop",
        },
        wide: {
          name: "Wide",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#ffffff" },
        { name: "navy", value: "#000835" },
        { name: "sand", value: "#F5E6D3" },
        { name: "slate", value: "#0f172a" },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for stories",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeClass = context.globals.theme === "dark" ? "dark" : undefined;

      return (
        <div className={themeClass}>
          <div className="min-h-screen bg-background p-6 text-foreground transition-colors">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
