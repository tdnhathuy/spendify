import { AccordionItemProps } from "@radix-ui/react-accordion";
import { RefAttributes, useEffect, useRef } from "react";

export const useAccordionAutoScroll = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Setup observer to watch for accordion state changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "data-state" &&
          mutation.target instanceof HTMLElement &&
          mutation.target.getAttribute("data-state") === "open"
        ) {
          // Find the parent AccordionItem to scroll to
          let element = mutation.target;
          while (element && !element.hasAttribute("data-value")) {
            element = element.parentElement as HTMLElement;
          }

          if (element) {
            const categoryId = element.getAttribute("data-value");
            if (categoryId) {
              setTimeout(() => {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                });
              }, 200);
            }
          }
        }
      });
    });

    // Observe all current and future accordion triggers
    const observeAccordionTriggers = () => {
      const triggers = container.querySelectorAll(
        '[data-slot="accordion-trigger"]'
      );
      triggers.forEach((trigger) => {
        observer.observe(trigger, { attributes: true });
      });
    };

    observeAccordionTriggers();

    // Re-observe after any content changes
    const contentObserver = new MutationObserver(() => {
      observeAccordionTriggers();
    });

    contentObserver.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  return { containerRef, itemRefs };
};
