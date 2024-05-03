import { Posts } from "./components/Posts.tsx";
import { Form } from "./components/Form.tsx";

function App() {
  return (
    <>
      <div
        className={
          "bg-blue-300  flex justify-center items-center gap-10 rounded-md m-4 p-4"
        }
      >
        <h1 className={"text-3xl font-bold"}>Memories</h1>
        <img src={"img.png"} alt={"memories"} className={"w-20"} />
      </div>

      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full sm:w-7/12 p-3">
            <Posts />
          </div>
          <div className="w-full sm:w-4/12 p-3">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
