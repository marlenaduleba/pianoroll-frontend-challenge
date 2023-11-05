import Logo from "../assets/white.svg";

export const AppBar: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
      </nav>

      <h1> Welcome to PianoRoll frontend coding challenge!</h1>
    </>
  );
};
