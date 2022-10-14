const Welcome = () => {
  const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    window.location.href = "/home";
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
};

export default Welcome;
