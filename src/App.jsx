import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  const allCookies = Cookies.get(); 
  const cookiesArray = Object.entries(allCookies);

  const [count, setCount] = useState(0); 
  const [token, setToken] = useState({ name: "", value: "" });


  const handleChange = (event) => {
    const { name, value } = event.target;

    setToken((prevToken) => {
      return {
        ...prevToken,
        [name]: value,
      };
    });
  };

 
  const handleSubmit = () => {
    setCount((prevCount) => prevCount + 1); 
    Cookies.set(token.name, token.value); 
    // Clears the input fields
    setToken((prevToken) => {
      return {
        ...prevToken,
        name: "",
        value: "",
      };
    });
  };


  const handleDelete = (name) => {
    setCount((prevCount) => prevCount + 1); 
    Cookies.remove(name); 
  };

  useEffect(() => {}, [count]);

  return (
    <div className="main">
      <div className="title">
        <img src="/cookies.png" alt="cookies" />
        <span>Cookies</span>
      </div>
      <div className="content">
        <div className="cookies">
          <span>Tus Cookies</span>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {cookiesArray.length > 0 &&
                cookiesArray.map((cookie, index) => (
                  <tr key={index}>
                    <td>{cookie[0]}</td>
                    <td>{cookie[1]}</td>
                    <td>
                      <button onClick={() => handleDelete(cookie[0])}>
                        <span>Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="actions">
          <div>
            <span>Nombre:</span>
            <input
              name="name"
              value={token.name}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <div>
            <span>Valor:</span>
            <input
              name="value"
              value={token.value}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <button disabled={!token.name || !token.value} onClick={handleSubmit}>
            <span>Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;