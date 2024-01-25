import c from "classnames";
import { sha256 } from "node-forge";
import { useState } from "react";

import { PasswordInputControl } from "./PasswordInputControl";
import { Icon, Icons } from "../components/Icon";
import { Flare } from "../components/utils/Flare";
import { Lightbar } from "../components/utils/Lightbar";
import { conf } from "../setup/config";

export function Password({ children }: { children: any }) {
  const [password, setPassword] = useState(
    localStorage.getItem("password") || "",
  );
  const [focused, setFocused] = useState(true);
  const [value, setValue] = useState("");
  if (password === conf().PASSWORD) {
    return children;
  }

  const handleSubmit = () => {
    const sha = sha256.create();
    sha.update(value);
    const pass = sha.digest().toHex();
    localStorage.setItem("password", pass);
    setPassword(pass);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute inset-x-0 top-[6%] flex items-center sm:mt-0">
        <Lightbar />
      </div>
      <Flare.Base
        className={c({
          "hover:flare-enabled group flex flex-col rounded-[28px] transition-colors sm:flex-row sm:items-center relative":
            true,
          "bg-search-background": !focused,
          "bg-search-focused": focused,
        })}
      >
        <Flare.Light
          flareSize={400}
          enabled={focused}
          className="rounded-[28px]"
          backgroundClass={c({
            "transition-colors": true,
            "bg-search-background": !focused,
            "bg-search-focused": focused,
          })}
        />
        <Flare.Child className="flex flex-1 flex-col">
          <div className="pointer-events-none absolute bottom-0 left-5 top-0 flex max-h-14 items-center text-search-icon">
            <Icon icon={Icons.LOCK} />
          </div>

          <PasswordInputControl
            onUnFocus={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            onChange={(val: any) => setValue(val)}
            onSubmit={handleSubmit}
            value={value}
            className="w-full flex-1 bg-transparent px-4 py-4 pl-12 text-search-text placeholder-search-placeholder focus:outline-none sm:py-4 sm:pr-2"
            placeholder="Password"
            passwordToggleable
          />
        </Flare.Child>
      </Flare.Base>
    </div>
  );
}
