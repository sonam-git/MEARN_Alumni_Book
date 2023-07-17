// import necessary components
import Signup from "../components/Signup";
import Login from "../components/Login";

// Home page
const Home = () => {
    return (
      <div className="container">
        <Signup />
        <Login/>
      </div>
    );
  };
  
  export default Home;