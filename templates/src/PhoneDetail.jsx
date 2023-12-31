import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// async function fetchPhoneNumberByID(id) {
//   const response = await fetch(`http://localhost:5000/phone/${id}`, {
//     headers: {
//       'Authorization': `Bearer ${bearerToken}`,
//     },
//     method: "GET",
//   });
//   const data = await response.json();
//   console.log(data);
//
//   return data;
// }

const PhoneDetail = () => {
  const params = useParams();

  const phoneNumberRef = useRef();

  const paramId = params.phoneID;

  const [phone, setPhone] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5000/phone/${paramId}`;


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
        console.log(result);
        setPhone(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //
  // useEffect(() => {
  //   fetchPhoneNumberByID(params.phoneID).then((v) => {
  //     console.log(v);
  //     setPhone(v.data);
  //   });
  // }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col border-2 border-black rounded-md p-5">
          <div className="inline-flex">
            <label for="id">ID: {phone?.ID}</label>
          </div>
          <br />
          <div className="inline-flex">
            <label for="phoneNumber">Phone Number: </label>
            <input
              className="border-2"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder={phone?.PhoneNumber}
              ref={phoneNumberRef}
            />
          </div>
          <div className="inline-flex">Provider: {phone?.Provider}
            <label for="Provider">Provider</label>
            <select id="Provider" name="Provider" value={selectedValue} onChange={handleDropdownChange}>
              <option value="XL">XL</option>
              <option value="Telkomsel">Telkomsel</option>
              <option value="Indosat">Indosat</option>
            </select>
          </div>
          <button
            className="border-2 w-40"
            onClick={() => {
              const newNumber = phoneNumberRef.current.value;
              fetch(`http://localhost:5000/phone/${params.phoneID}`, {
                method: "PUT",
                headers: {
                  'Authorization': `Bearer ${bearerToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  PhoneNumber: newNumber,
                  Provider: selectedValue,
                }),
              }).then(alert(`Phone Number : ${phone?.PhoneNumber} Updated`))
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            Edit
          </button>
          <button
            className="border-2 w-40"
            onClick={() => {
              window.location.assign('/auto');
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PhoneDetail;
