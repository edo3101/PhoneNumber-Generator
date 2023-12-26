import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

async function fetchPhoneNumbers() {
  const response = await fetch("http://localhost:5000/phone/auto");
  const data = await response.json();

  return data;
}

const Home = () => {
  const phoneNumbers = [];

  const [data, setData] = useState();
  const [newArray, setNewArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPhoneNumbers().then((v) => {
      setData(v);
      setNewArray(zip(v.ganjil, v.genap));
    });
  }, []);

  const zip = (a, b) =>
    Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Ganjil</th>
              <th>Genap</th>
            </tr>
          </thead>
          <tbody>
            {newArray.map((value) => {
              const ganjil = value[0];
              console.log(ganjil);
              const genap = value[1];
              return (
                <tr>
                  <td>
                    {ganjil?.PhoneNumber}

                    {ganjil ? (
                      <>
                        <button
                          onClick={() => {
                            navigate(`/phone/${ganjil?.ID}`);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => {
                          fetch(`http://localhost:5000/phone/${ganjil?.ID}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }).then(alert(`Phone Number : ${ganjil?.PhoneNumber} Deleted`))
                            .then(() => {
                              window.location.reload();
                            });
                        }}>Delete</button>
                      </>
                    ) : null}
                  </td>
                  <td>
                    {genap?.PhoneNumber}
                    {genap ? (
                      <>
                        <button
                          onClick={() => {
                            navigate(`/phone/${genap?.ID}`);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => {
                          fetch(`http://localhost:5000/phone/${genap?.ID}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }).then(alert(`Phone Number : ${genap?.PhoneNumber} Deleted`))
                            .then(() => {
                              window.location.reload();
                            });
                        }}>Delete</button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
