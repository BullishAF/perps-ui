import { twMerge } from "tailwind-merge";

import { Token } from "@/lib/Token";

function formatPrice(num: number) {
  const formatter = Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return formatter.format(num);
}

interface Props {
  availableLiquidity: number;
  className?: string;
  fees: number;
  payToken: Token;
  payTokenPrice: number;
  receiveToken: Token;
  receiveTokenPrice: number;
}

export function TradeSwapDetails(props: Props) {
  return (
    <div className={props.className}>
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: `${props.payToken} Price`,
            value: `$${formatPrice(props.payTokenPrice)}`,
          },
          {
            label: `${props.receiveToken} Price`,
            value: `$${formatPrice(props.receiveTokenPrice)}`,
          },
          {
            label: "Available Liquidity",
            value: `$${formatPrice(props.availableLiquidity)}`,
          },
          {
            label: "Fees",
            value: `$${formatPrice(props.fees)}`,
          },
        ].map(({ label, value }, i) => (
          <div
            className={twMerge(
              "border-zinc-700",
              i < 2 && "pb-4",
              i < 2 && "border-b"
            )}
            key={i}
          >
            <div className="text-sm text-zinc-400">{label}</div>
            <div className="text-sm text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
