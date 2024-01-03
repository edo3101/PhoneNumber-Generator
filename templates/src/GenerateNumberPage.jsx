import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// async function fetchPhoneNumbers() {
//   const response = await fetch("http://localhost:5000/phone/auto", {
//     headers: {
//       "Authorization": `Bearer ${localStorage.getItem('token')}`,
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//
//   return data;
// }

const Home = () => {
  const phoneNumbers = [];

  const [data, setData] = useState();
  const [newArray, setNewArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint you want to fetch data from
        const apiUrl = 'http://localhost:5000/phone/auto';

        // Replace 'your-bearer-token' with the actual bearer token you want to use for authentication
        const bearerToken = localStorage.getItem('token');

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        setNewArray(zip(result.ganjil, result.genap));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchPhoneNumbers().then((v) => {
  //     setData(v);
  //     setNewArray(zip(v.ganjil, v.genap));
  //   });
  // }, []);

  const zip = (a, b) =>
    Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-white">
        <div className="overflow-y-scroll h-96 w-[32rem] px-0 border-2 mb-3 border-zinc-500 rounded-xl">
          <table className="w-[26rem] min-w-max ml-4 table-auto">
            <thead>
              <tr>
                <th className="pt-3">Ganjil</th>
                <th className="border-l-2 pt-3">Genap</th>
              </tr>
            </thead>
            <tbody>
              {newArray.map((value) => {
                const ganjil = value[0];
                console.log(ganjil);
                const genap = value[1];
                return (
                  <tr className="p-3">
                    <td className="p-2">
                      {ganjil?.PhoneNumber}

                      {ganjil ? (
                        <>
                          <button
                            className="border-2 border-green-200 rounded-md p-1 m-1"
                            onClick={() => {
                              navigate(`/phone/${ganjil?.ID}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="border-2 border-red-400 rounded-md p-1"
                            onClick={() => {
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
                    <td className="p-2 border-l-2 border-zinc-200">
                      {genap?.PhoneNumber}
                      {genap ? (
                        <>
                          <button
                            className="border-2 border-green-200 rounded-md p-1 m-1"
                            onClick={() => {
                              navigate(`/phone/${genap?.ID}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="border-2 border-red-400 rounded-md p-1"
                            onClick={() => {
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
        <button
          className="border-2 w-40"
          onClick={() => {
            window.location.assign('/create');
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Home;
