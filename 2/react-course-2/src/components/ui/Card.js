import classes from "./Card.module.css";

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
  //   children is default attribute
  //   It will contain the contents in bettween the tag.
}

export default Card;
