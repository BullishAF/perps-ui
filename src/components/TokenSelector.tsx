import { twMerge } from "tailwind-merge";
import ChevronRightIcon from "@carbon/icons-react/lib/ChevronRight";
import { cloneElement, useState } from "react";

import { useDailyPriceStats } from "@/hooks/useDailyPriceStats";
import { Token, getTokenIcon } from "@/lib/Token";
import { TokenSelectorList } from "./TokenSelectorList";

function formatNumber(num: number) {
  const formatter = Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return formatter.format(num);
}

function decimalTrim(num: number) {
  return parseFloat(num.toFixed(2));
}

interface Props {
  className?: string;
  amount: number;
  token: Token;
  onChangeAmount?(amount: number): void;
  onSelectToken?(token: Token): void;
  liqRatio: number;
  setLiquidity?: (amount: number) => void;
  tokenList?: Token[];
}

export function TokenSelector(props: Props) {
  const stats = useDailyPriceStats();
  const [selectorOpen, setSelectorOpen] = useState(false);
  console.log("props", props, props.token, props.token === undefined);

  // check if props.token is undefined

  if (props.token === undefined) {
    return (
      <div
        className={twMerge(
          "grid-cols-[max-content,1fr]",
          "bg-zinc-900",
          "grid",
          "h-20",
          "items-center",
          "p-4",
          "rounded",
          "w-full",
          props.className
        )}
      >
        <p>no Tokens</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={twMerge(
          "grid-cols-[max-content,1fr]",
          "bg-zinc-900",
          "grid",
          "h-20",
          "items-center",
          "p-4",
          "rounded",
          "w-full",
          props.className
        )}
      >
        <button
          className="group flex items-center"
          onClick={() => setSelectorOpen(true)}
        >
          {cloneElement(getTokenIcon(props.token), {
            className: "h-6 rounded-full w-6",
          })}
          <div className="ml-1 text-2xl text-white">{props.token}</div>
          <ChevronRightIcon className="ml-2 fill-gray-500 transition-colors group-hover:fill-white" />
        </button>
        <div>
          <input
            className={twMerge(
              "bg-transparent",
              "h-full",
              "text-2xl",
              "text-right",
              "text-white",
              "top-0",
              "w-full",
              "focus:outline-none",
              typeof props.onChangeAmount === "function"
                ? "cursor-pointer"
                : "cursor-none",
              typeof props.onChangeAmount === "function"
                ? "pointer-events-auto"
                : "pointer-events-none"
            )}
            placeholder="0"
            type="number"
            value={decimalTrim(props.amount) || ""}
            onChange={(e) => {
              const text = e.currentTarget.value;
              props.onChangeAmount?.(Number(text));

              // console.log(
              //   "all nujbers ratio",
              //   (Number(text) * stats[props.token].currentPrice) *
              //     props.liqRatio
              // );

              props.setLiquidity?.(
                Number(
                  (
                    Number(text) *
                    stats[props.token].currentPrice *
                    props.liqRatio
                  ).toFixed(2)
                )
              );
            }}
          />
          {!!stats[props.token]?.currentPrice && (
            <div className="mt-0.5 text-right text-xs text-zinc-500">
              {formatNumber(props.amount * stats[props.token].currentPrice)}
            </div>
          )}
        </div>
      </div>
      {selectorOpen && (
        <TokenSelectorList
          onClose={() => setSelectorOpen(false)}
          onSelectToken={props.onSelectToken}
          tokenList={props.tokenList}
        />
      )}
    </>
  );
}
