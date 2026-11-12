interface Card {
  title: string;
  count: number;
}

function DisplayCard(props: Card) {
  return (
    <div className="bg-grey p-5 rounded-xl shadow-md ">
      <h2 className="text-black">{props.title}</h2>
      <h2 className="text-3xl font-bold text-black">Count:{props.count}</h2>
    </div>
  );
}
export default DisplayCard;
