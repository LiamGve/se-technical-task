import { StyledButton } from "./Button.styles";

interface IButtonProps {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton type={type ?? "button"} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
