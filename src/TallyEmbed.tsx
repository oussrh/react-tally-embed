// src/TallyEmbed.tsx
import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export interface TallyEmbedProps {
  formId: string;
  height?: number;
  queryParams?: Record<string, string | number | boolean>;
  onOpen?: () => void;
  onSubmit?: () => void;
  onClose?: () => void;
  showLoader?: boolean;
  loaderComponent?: React.ReactNode;
  fullscreen?: boolean;
  animation?: "fade" | "slide";
  theme?: "light" | "dark";
}

export interface TallyEmbedRef {
  open: () => void;
  close: () => void;
}

const TallyEmbed = forwardRef<TallyEmbedRef, TallyEmbedProps>(
  (
    {
      formId,
      height = 500,
      queryParams = {},
      onOpen,
      onSubmit,
      onClose,
      showLoader = false,
      loaderComponent = <div>Loading...</div>,
      fullscreen = false,
      animation = "fade",
      theme = "light",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(!fullscreen);

    const loadForm = () => {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        setLoaded(true);
        if ((window as any).Tally) (window as any).Tally.loadEmbeds();
      };

      const options = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [k, v]) => {
          acc[k] = String(v);
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      if (containerRef.current) {
        containerRef.current.innerHTML = `
        <iframe data-tally-src="https://tally.so/embed/${formId}?${options}"
                loading="lazy"
                width="100%"
                height="${height}"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                title="Tally Form"></iframe>`;
        containerRef.current.appendChild(script);
      }
    };

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    useEffect(() => {
      if (!visible) return;
      loadForm();

      const handleMessage = (event: MessageEvent) => {
        if (typeof event.data !== "object" || !event.data?.event) return;
        switch (event.data.event) {
          case "tally:open":
            onOpen?.();
            break;
          case "tally:submit":
            onSubmit?.();
            break;
          case "tally:close":
            onClose?.();
            break;
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [visible]);

    const content = (
      <div
        className={clsx(
          "tally-embed-container",
          theme === "dark" && "bg-black text-white",
          fullscreen && "fixed inset-0 z-50 flex items-center justify-center",
          animation === "fade" && fullscreen && "animate-fade-in",
          animation === "slide" && fullscreen && "animate-slide-up"
        )}
      >
        {showLoader && !loaded && loaderComponent}
        <div ref={containerRef} className="w-full" />
      </div>
    );

    if (fullscreen && visible) return createPortal(content, document.body);
    if (!fullscreen) return content;
    return null;
  }
);

export default TallyEmbed;
