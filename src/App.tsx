import { useState } from "react";
import "./App.css"
import Item from "./components/Item";
import MenuBar from "./components/MenuBar";
import Navbar from "./components/Navbar";
import Size from "./components/Size";
import Summary from "./components/Summary";
import Chat from "./components/Chat";
import FindSize from "./components/FindSize";
// import Header from "./components/Navbar";

function App() {
  const [view, setView] = useState(0);

  const handleMenuClick = (menu: string) => {
    if(menu == 'summary'){
      setView(0);
    }
    else if(menu == 'chatbot'){
      setView(1);
    }
    else if(menu == 'findsize'){
      setView(2);
    }
    console.log(menu);
    setContent(menu === 'summary' ? 'Summary Content' : menu === 'chatbot' ? 'Chatbot Content' : 'Find Size Content');
  };

  return (
    <div className="App flex flex-col">
      <Navbar />
      {view == 0 ? <Summary onMenuClick={handleMenuClick}/> : view == 1 ? <Chat/> :<FindSize onMenuClick={handleMenuClick}/>}
      {/* <FindSize /> */}
     <MenuBar onMenuClick={handleMenuClick} />
    </div>
  );
}

export default App;
function setContent(arg0: string) {
  throw new Error("Function not implemented.");
}

