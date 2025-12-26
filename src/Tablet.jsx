import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";

/** Button that attempts to use the token in context when clicked */
export default function Tablet() {
  const [errorMsg, setErrorMsg] = useState("");
  // TODO: call authenticate when form is submitted
  const { authenticate } = useAuth();

  const tryAuth = async () => {
    try {
      await authenticate();
    } catch (error) {
      //console.log("Error message", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <section>
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        "Place your hand upon this stone tablet, and thus will your true self be
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form action={tryAuth}>
        <button>Place your palm upon the tablet.</button>
      </form>
      <p>{errorMsg}</p>
    </section>
  );
}
