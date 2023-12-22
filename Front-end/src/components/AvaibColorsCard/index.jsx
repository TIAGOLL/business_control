function AvaibColorsCard(props) {
  console.log(props);
  return (
    <ul className="list-disc">
      <li>{props.color}: {props.quantity}</li>
    </ul >
  );
}

export default AvaibColorsCard;
