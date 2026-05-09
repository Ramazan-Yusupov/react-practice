import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    danger: string;
    spacing: {
      xs: string;
      sm: string;
      md: string;
    };
  }
}
