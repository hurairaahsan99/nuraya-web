import Link from "next/link";

const baseStyles: React.CSSProperties = {
  gap: 10,
  borderRadius: 40,
  borderWidth: 1.5,
  padding: "18px 36px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontFamily: "var(--font-body)",
  whiteSpace: "nowrap",
};

const type1Styles: React.CSSProperties = {
  border: "1.5px solid #FFFFFF",
  color: "#FFFFFF",
  background: "transparent",
};

const type2Styles: React.CSSProperties = {
  border: "1.5px solid transparent",
  color: "#FFFFFF",
  background: "#C92600",
};

type ButtonProps = {
  title: string;
  icon?: React.ReactNode;
  variant?: 1 | 2;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "className" | "children"
>;

const Button = ({
  title,
  icon,
  variant = 1,
  href,
  className = "",
  style = {},
  onClick,
  ...rest
}: ButtonProps) => {
  const variantStyles = variant === 1 ? type1Styles : type2Styles;
  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles,
    ...style,
  };

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={combinedStyles}
        onClick={onClick}
      >
      {  icon &&
        <span>
          {icon}
        </span>}
        {title}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={combinedStyles}
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
