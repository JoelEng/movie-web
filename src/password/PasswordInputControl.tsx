import classNames from "classnames";
import { forwardRef, useState } from "react";

import { Icon, Icons } from "../components/Icon";

export interface PasswordInputControlPropsNoLabel {
  onChange?: (data: string) => void;
  onUnFocus?: () => void;
  onFocus?: () => void;
  onSubmit?: () => void;
  value?: string;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  passwordToggleable?: boolean;
}

export interface PasswordInputControlProps
  extends PasswordInputControlPropsNoLabel {
  label?: string;
}

export const PasswordInputControl = forwardRef<
  HTMLInputElement,
  PasswordInputControlProps
>(
  (
    {
      onChange,
      onUnFocus,
      onSubmit,
      value,
      label,
      name,
      autoComplete,
      className,
      placeholder,
      onFocus,
      passwordToggleable,
    },
    ref,
  ) => {
    let inputType = "text";
    const [showPassword, setShowPassword] = useState(true);
    if (passwordToggleable) inputType = showPassword ? "password" : "text";

    const input = (
      <div className="relative">
        <input
          type={inputType}
          ref={ref}
          className={classNames(className, passwordToggleable && "pr-12")}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          value={value}
          name={name}
          autoComplete={autoComplete}
          onBlur={() => onUnFocus && onUnFocus()}
          onFocus={() => onFocus?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
              if (onSubmit !== undefined) {
                onSubmit();
              }
            }
          }}
        />
        {passwordToggleable ? (
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-1 text-xl p-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon icon={showPassword ? Icons.EYE : Icons.EYE_SLASH} />
          </button>
        ) : null}
      </div>
    );

    if (label) {
      return (
        <label>
          <span>{label}</span>
          {input}
        </label>
      );
    }

    return input;
  },
);
