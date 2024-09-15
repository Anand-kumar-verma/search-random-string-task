import "./App.css";
import Alphabet from "./page";

function App() {
  return (
    <div className="!h-[100vh] !w-[100vw] !flex lg:flex-row flex-col lg:justify-center lg:items-center  overflow-y-scroll">
     <div className="!mt-3">
     <Alphabet />
     </div>
    </div>
  );
}

export default App;
