import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

async function fetchPhoneNumberByID(id) {
  const response = await fetch(`http://localhost:5000/phone/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);

  return data;
}

const PhoneDetail = () => {
  const params = useParams();

  const phoneNumberRef = useRef();

  const [phone, setPhone] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    fetchPhoneNumberByID(params.phoneID).then((v) => {
      console.log(v);
      setPhone(v.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
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
          EDIT!
        </button>
      </div>

    </>
  );
};

export default PhoneDetail;
