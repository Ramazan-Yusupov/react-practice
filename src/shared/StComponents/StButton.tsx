import styled from "styled-components";

type StButtonProps = {
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

export const StButton = styled.button<StButtonProps>`
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 8px;
  transition: all 0.2s ease;

  background: ${(props) => {
    if (props.variant === "outline") return "transparent";
    if (props.variant === "danger") return "#ef4444";
    return "#3b82f6";
  }};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.variant === "outline" ? "#3b82f6" : "#fff")};
  border: ${(props) =>
    props.variant === "outline" ? "2px solid #3b82f6" : "none"};

  padding: ${(props) => {
    if (props.size === "sm") return "6px 12px";
    if (props.size === "lg") return "12px 24px";
    return "10px 18px";
  }};
  font-size: ${(props) => (props.size === "sm" ? "0.875rem" : "1rem")};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
