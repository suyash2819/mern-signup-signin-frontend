const Welcome = (props) => {
  return <h1>Hi {props.location.state.name}</h1>;
};

export default Welcome;
