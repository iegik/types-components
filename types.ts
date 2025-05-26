/**
 * Terms and aliases:
 * contained = filled
 * outlined = bordered
 * standard = default
 * severity = color?
 * pill = rectangle (rounded or not - by design)
 * children = content?
 * default = text
 */
export type ComponentType = (props: any) => unknown;
export type Slot = ReturnType<ComponentType>;
export type Style = object;

export type CamelCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Lowercase<T>
    ? `${T}${CamelCase<Capitalize<U>>}`
    : `${Lowercase<T>}${CamelCase<U>}`
  : S;

export type ComponentKeys = {
  [K in keyof Components as CamelCase<K & string>]: Components[K];
};

export type Components = {
  [key: string]: ComponentType;
};

export type PolymorphicProps<T extends keyof ComponentKeys = keyof ComponentKeys> = {
  as: T; // `as` will refer to a key of `ComponentTypes` in camelCase
};

// type Action = () => void | Promise<void> //| (reducer: (state: object) => void) => void;
// type Event = `${'click' | 'close' | 'open'}:${string}`; // Example: "click:doSomething", "close:completeAll"
export type Action = `${'click' | 'close' | 'open'}:${string}`; // Example: "click:doSomething", "close:completeAll"
export type Validation = `${'regex' | 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'email' | 'url' | 'phone' | 'date' | 'time' | 'datetime-local' | 'month' | 'number' | 'password' | 'confirm' | 'custom'}:${string}`; // Example: "regex:[\\d]+", "required", "needs:name"

export type ActionProps = {
  actions?: Action[];
};

export type ResourceProps = {
  resource?: string;
};

export type ShapesProps = {
  shape?: 'none' | 'circular' | 'rounded' | 'square' | 'pill' | 'rectangular' | 'text';
};

export type ValidationProps = {
  validations?: Validation[]; // Example validation actions like 'required', 'minLength:8', etc.
};

/*** WEB SPECIFIC ***/
export type Component = PolymorphicProps & ActionProps & A11yProps & {
  className?: string;
  style?: Style;
};

export type A11yProps = {
  ariaAtomic?: boolean;        // Whether screen reader should read entire content
  ariaBusy?: boolean;           // For loading states
  ariaControls?: string;         // For elements that control other elements
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'; // For current items
  ariaDescribedBy?: string;
  ariaDisabled?: boolean;       // Whether element is disabled
  ariaDisabledBy?: string;      // For elements that disable this element
  ariaExpanded?: boolean;        // For expandable elements (dropdowns, accordions)
  ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'; // For elements with popups
  ariaHidden?: boolean;
  ariaInvalid?: boolean | 'grammar' | 'spelling'; // For form validation
  ariaLabel?: string;          // Current
  ariaLive?: 'polite' | 'assertive' | 'off'; // For dynamic content updates
  ariaPressed?: boolean;        // For toggle buttons
  ariaRequired?: boolean;       // For required form fields
  ariaRelevant?: 'additions' | 'removals' | 'text' | 'all'; // What changes to announce
  ariaSelected?: boolean;       // For selectable elements
  autoFocus?: boolean;         // For focus management
  platform: 'web' | 'desktop' | 'console' | 'mobile';
  role?: string;
  tabIndex?: number;
  focusable?: boolean;         // Whether element can receive focus
  focusVisible?: boolean;      // Whether element shows focus ring
  focusWithin?: boolean;       // Whether element contains focused element
  severity?: 'error' | 'warning' | 'info' | 'success';
};

export type Colorized = {
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | string;
}

/*** ATOMS ***/

/**
 * Button Props
 * Used for interactive elements that trigger actions
 *
 * Usage:
 * - Regular buttons: <Button label="Click me" />
 * - Icon buttons: <Button startIcon={<Icon name="add" />} />
 * - Loading state: <Button loading={true} label="Loading..." />
 * - Badge/Chip: <Button shape="pill" label="New" />
 * - Tag: <Button variant="outlined" label="Tag" />
 */
export type ButtonProps = Component & Colorized & ResourceProps & ShapesProps & {
  // label?: string;    // Direct prop (for simple text)
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  // Use array in Slot for multiple icons
  startIcon?: Slot;
  endIcon?: Slot;
  label?: string;    // Direct prop (for simple text)
  children?: Slot;
};

/** Link Props (Alias for Button with variant 'contained') */
export type LinkProps = Omit<ButtonProps, 'variant'> & {
  variant: 'contained';
  target?: '_blank' | '_self' | '_parent' | '_top'; // HTML specific
  download?: string; // HTML specific
  href?: string; // HTML specific
};

/**
 * Text Props, as also Typography, Alert
 * Used for formatting text, not interactive
 */
export type TextProps = Component & Colorized & {
  children: string;
  variant?: 'body1' | 'body2' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'contained' | 'outlined';
  align?: 'left' | 'center' | 'right';
  noWrap?: boolean;
  ellipsis?: boolean;
  // Use array in Slot for multiple icons
  icon?: Slot;
};

/**
 * Input Props
 * Used for form controls and data entry
 *
 * Usage:
 * - Text input: <Input type="text" value="Hello" />
 * - Select: <Input type="select" options={[{ label: "Option 1", value: "1" }]} />
 * - Checkbox: <Input type="checkbox" value="true" />
 * - Date picker: <Input type="date" value="2024-03-20" />
 * - Rating: <Input type="rating" value={4} />
 */
export type InputProps = Component & Colorized & {
  max?: number;
  value: string;
  placeholder?: string;
  type?: 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'rating' | 'search' | 'select' | 'tel' | 'text' | 'time' | 'url' |'week';
  disabled?: boolean;
  readOnly?: boolean;
  component?: string;
  multiple?: boolean;
  options?: Array<{ label: string; value: string }>;
};

/** Progress Props, also act as Spinner/Loader Props */
export type ProgressProps = Component & Colorized & {
  value?: number;
  max?: number;
  variant?: 'determinate' | 'indeterminate';
  size?: 'small' | 'medium' | 'large';
};

// /** Icon Props */
// export type IconProps = Component & Colorized & ResourceProps & {
//   name: string;
//   size?: number;
// };

// /** Image Props */
// export type ImageProps = Component & Colorized & {
//   src: string;
//   alt: string;
//   width?: string | number;
//   height?: string | number;
// };

/**
 * Media Props
 * Used for displaying images and icons
 *
 * Usage:
 * - Icon: <Media name="user" size={24} />
 * - Image: <Media src="photo.jpg" alt="Description" width={100} />
 * - Responsive: <Media src="photo.jpg" size={100} /> // uses aspect ratio
 * - Avatar: <Media src="avatar.jpg" shape="circular" />
 */
export type MediaProps = Component & Colorized & ResourceProps & {
  // type: 'icon' | 'image'; // detected by src or name
  // Common props
  size?: number; // if present, uses width and aspect-ratio to define height
  width?: string | number;
  height?: string | number;
  name?: string;
  src?: string;
  alt?: string;
};

/** Divider Props */
export type DividerProps = Component & {
  orientation?: 'horizontal' | 'vertical';
};

export type SkeletonProps = Component & ShapesProps & {
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
};

/*** MOLECULES ***/

/** Card Props */
export type CardProps = Component & {
  header?: Slot;
  children?: Slot;
  footer?: Slot;
};

/**
 * Modal Props
 * Used for displaying content in an overlay
 *
 * Usage:
 * - Dialog: <Modal type="dialog" title="Confirm" content="Are you sure?" />
 * - Drawer: <Modal type="drawer" content={<Sidebar />} />
 * - Tooltip: <Modal type="tooltip" content="Help text" />
 * - Alert: <Modal type="alert" content="Error message" />
 * - Snackbar: <Modal type="snackbar" content="Operation completed" />
 */
export type ModalProps = Component & {
  type: 'modal' | 'popover' | 'drawer' | 'tooltip' | 'snackbar' | 'alert' | 'dialog' | 'confirmation';
  open: boolean;
  title?: string; // Named slot
  content?: Slot; // Named slot (alternative to children)
  children?: Slot;
};

export type FormProps = Component & {
  method?: 'get' | 'post';
  action?: string;
  encType?: string;
};

export type FieldProps = Component & {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
};

/** Form Group Props */
export type FormGroupProps = Component & {
  children: Slot;
  label?: string;
  errorMessage?: string;
};

/** Tooltip Props */
export type TooltipProps = Component & {
  content: string;
  children: Slot;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

/** Table Props */
export type TableProps = Component & {
  headers: string[];
  rows: Array<Record<string, any>>;
};

/**
 * List Props
 * Used for displaying collections of items with various interaction patterns
 *
 * Usage:
 * - Simple list: <List items={[{ content: "Item 1" }]} />
 * - Tabs: <List type="tabs" items={[{ label: "Tab 1", content: "Content 1" }]} />
 * - Accordion: <List type="accordion" items={[{ title: "Section 1", content: "Content 1" }]} />
 * - Stepper: <List type="stepper" items={[{ label: "Step 1", completed: true }]} />
 * - Pagination: <List type="pagination" count={10} />
 */
export type ListProps = Component & {
  type?: 'default' | 'tabs' | 'accordion' | 'stepper' | 'pagination' | 'timeline' | 'carousel';
  items: Array<{
    content: Slot;
    label?: string;        // for navigation types
    icon?: Slot;
    action?: Slot;         // for default list
    disabled?: boolean;
    description?: string;  // for stepper
    completed?: boolean;   // for stepper
    error?: boolean;      // for stepper
  }>;
  variant?: 'default' | 'bordered' | 'flush';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  value?: number;
  // Pagination specific
  count?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
};

export type BreadcrumbsProps = ListProps & {
  type: 'breadcrumbs';
  items: Array<{
    label: string;
    href?: string;
    icon?: Slot;
  }>;
  separator?: Slot;
  maxItems?: number;
  expandText?: string;
};

export type CarouselProps = ListProps & {
  type: 'carousel';
  items: Array<{
    content: Slot;
    title?: string;
    description?: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
  indicators?: boolean;
  navigation?: boolean;
  animation?: 'fade' | 'slide';
};

export type StepperProps = ListProps & {
  type: 'stepper';
  alternativeLabel?: boolean;
}

export type TreeViewProps = ListProps & {
  items: Array<{
    id: string;
    label: string;
    icon?: Slot;
    children?: TreeViewProps['items'];
    expanded?: boolean;
  }>;
  defaultExpanded?: string[];
};

export type RatingProps = InputProps & {
  precision?: number;
  icon?: Slot;
  emptyIcon?: Slot;
};

/**
 * Data Display Props
 * Mix of Text, Button, Input, Progress, Rating.
 * Used for declare how to display data
 */
export type DataDisplayProps = Component & {
  type?: 'text' | 'button' | 'submit' | 'reset' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'rating' | 'search' | 'select' | 'tel' | 'text' | 'time' | 'url' |'week';
  variant?: 'body1' | 'body2' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'contained' | 'outlined';

  value: string | number;
  prefix?: Slot;
  suffix?: Slot;
  precision?: number;
  formatter?: (value: any) => string;
};

export type AlertProps = TextProps & Colorized & {
  type: 'alert';
  action?: Slot;
};

export type FeedbackProps = ModalProps & AlertProps & {
  autoHideDuration?: number;
};

/*** ORGANISMS ***/

/** Navbar Props */
export type NavbarProps = Component & {
  brand?: Slot;
  links: Array<{ label: string; href: string }>;
};

/** Sidebar Props */
export type SidebarProps = Component & {
  items: Array<{ icon?: Slot; label: string; href: string }>;
  open: boolean;
};

/** Footer Props */
export type FooterProps = Component & {
  content: Slot;
  links?: Array<{ label: string; href: string }>;
};

/** Dashboard Props */
export type DashboardProps = Component & {
  header?: Slot;
  sidebar?: Slot;
  content: Slot;
  footer?: Slot;
};

/*** TEMPLATES ***/

/**
 * Layout Props
 * Used for structuring page layout and spacing
 *
 * Usage:
 * - Container: <Layout type="container" children={<Content />} />
 * - Grid: <Layout type="grid" spacing={2} children={<GridItems />} />
 * - Stack: <Layout type="stack" direction="column" spacing={1} />
 * - Box: <Layout type="box" padding={2} margin={1} />
 * - Paper: <Layout type="paper" elevation={2} />
 */
export type LayoutProps = Component & {
  type: 'container' | 'grid' | 'stack' | 'box' | 'paper';
  direction?: 'row' | 'column';
  spacing?: number;
  wrap?: boolean;
  elevation?: number;
  padding?: number | string;
  margin?: number | string;
};

/** Page Layout Props */
export type PageLayoutProps = Component & {
  navbar?: Slot;
  sidebar?: Slot;
  mainContent: Slot;
  footer?: Slot;
};

/** Email Template Props */
export type EmailTemplateProps = Component & {
  header?: Slot;
  body: Slot;
  footer?: Slot;
};

/*** Effects ***/

export type RippleProps = Component & {
  color?: string;
  duration?: number;
};

export type ShadowProps = Component & {
  color?: string;
  intensity?: number;
};

export type TransitionProps = Component & {
  type: 'fade' | 'slide' | 'zoom' | 'collapse';
  in?: boolean;
  timeout?: number;
  children?: Slot;
};

export type AnimationProps = TransitionProps & {
  direction?: 'up' | 'down' | 'left' | 'right';
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
};

export type UtilityProps = Component & {
  type: 'portal' | 'clickaway' | 'popper' | 'modal' | 'backdrop';
  container?: HTMLElement;
  disablePortal?: boolean;
  keepMounted?: boolean;
};

export type ProviderProps<T = any> = {
  type: 'context' | 'reducer' | 'store';
  initialState: T;
  reducer?: string;
  children: Slot;
};
