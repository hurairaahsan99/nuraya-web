export const TITLE_COLOR = "#F1EFE0";
export const SUBTITLE_COLOR = "#F1EFE0CC";

export function useBrandColors() {
  return {
    titleColor: TITLE_COLOR,
    subtitleColor: SUBTITLE_COLOR,
  } as const;
}
