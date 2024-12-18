export default function Header(){
  return(
  <>
    <section className="header">
    <img className="logo" src="/img/logo.png"></img>
    <div className="user">
      <button>Sign-Up</button>
      <button>Sign-In</button>
    </div>
    <div className="search">
    <input type="text" placeholder="search" className="search-bar" ></input>
    <button>search</button>
    </div>
  <div/>
  </section>
  </>
  );

}