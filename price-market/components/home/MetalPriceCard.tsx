type MetalPriceCardProps = {
  name: string;
  price: number;
  change: number;
  direction: "up" | "down";
  unit: string;
};

const MetalPriceCard = ({
  name,
  price,
  change,
  direction,
  unit
}: MetalPriceCardProps) => {
  return (
    <div className="bg-white border rounded-2xl p-4 font-mono flex flex-col items-start gap-2 shadow-sm">
      <h1 className="font-bold uppercase">{name}</h1>
      <p className="text-3xl font-bold text-gray-900">
        ₹{price.toLocaleString("en-IN")}
      </p>

      <p>{unit}</p>
      <p className={direction === "up" ? "text-green-600" : "text-red-600"}>
        {direction === "up" ? "↑" : "↓"}
        {change}%
      </p>
    </div>
  );
};
export default MetalPriceCard;
