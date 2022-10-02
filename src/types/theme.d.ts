import { Theme, Palette } from '@mui/material';
export interface ICustomShadows {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  //
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  //
  card: string;
  dialog: string;
  dropdown: string;
}
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface Theme {
    customShadows: ICustomShadows;
  }

  interface ThemeOptions {
    customShadows?: ICustomShadows;
  }
}

declare module '@emoji-mart/react' {
  interface PickerProps {
    /** NOTE: default is not preventable */
    onClick?(emoji: EmojiData, e: React.MouseEvent<HTMLElement>): void;
    onSelect?(emoji: EmojiData): void;
    onSkinChange?(skin: EmojiSkin): void;
    perLine?: number | undefined;
    emojiSize?: number | undefined;
    i18n?: PartialI18n | undefined;
    style?: React.CSSProperties | undefined;
    title?: string | undefined;
    theme?: 'auto' | 'light' | 'dark' | undefined;
    emoji?: string | undefined;
    color?: string | undefined;
    set?: EmojiSet | undefined;
    skin?: EmojiSkin | undefined;
    defaultSkin?: EmojiSkin | undefined;
    native?: boolean | undefined;
    backgroundImageFn?: BackgroundImageFn | undefined;
    sheetSize?: EmojiSheetSize | undefined;
    emojisToShowFilter?(emoji: EmojiData): boolean;
    showPreview?: boolean | undefined;
    showSkinTones?: boolean | undefined;
    emojiTooltip?: boolean | undefined;
    include?: CategoryName[] | undefined;
    exclude?: CategoryName[] | undefined;
    recent?: string[] | undefined;
    autoFocus?: boolean | undefined;
    /** NOTE: custom emoji are copied into a singleton object on every new mount */
    custom?: CustomEmoji[] | undefined;
    skinEmoji?: string | undefined;
    notFound?(): React.Component;
    notFoundEmoji?: string | undefined;
    icons?: CustomIcons | undefined;
    enableFrequentEmojiSort?: boolean | undefined;
    useButton?: boolean | undefined;
  }
}
