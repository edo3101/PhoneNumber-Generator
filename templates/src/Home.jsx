import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenerateNumberPage = () => {
  const [phoneNumber, setPhone] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const navigate = useNavigate();

  const handleCreate = async () => {
    await fetch(`http://localhost:5000/phone/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PhoneNumber: phoneNumber,
        Provider: selectedValue,
      }),
    });
    alert(`Phone Number: ${phoneNumber} created`);
    window.location.reload();
  };
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col text-center bg-gray-100 border-2 border-zinc-500 justify-center h-48 w-[26rem]">
          <div className="text-xl m-4">
            Data No Handphone
          </div >
          <div class="card-body text-success">
            <div class="mb-3">
              <label for="no_hp" className="text-black mr-2">
                No Handphone
              </label>
              <input
                className="border-2 border-black rounded-md ml-2"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
                class="form-control"
                id="PhoneNumber"
                name="PhoneNumber"
              />
            </div>
            <div className="mt-2">
              <label for="Provider">Choose a Provider:</label>
              <select id="Provider" className="border-2 border-black ml-2" name="Provider" value={selectedValue} onChange={handleDropdownChange}>
                <option value="XL">XL</option>
                <option value="Telkomsel">Telkomsel</option>
                <option value="Indosat">Indosat</option>
              </select>

              <div className="mt-2">
                <button
                  type="submit"
                  className="border-2 w-40"
                  onClick={handleCreate}>save</button>
                <button
                  type="submit"
                  className="border-2 w-40 ml-2"
                  onClick={() => {
                    fetch(`http://localhost:5000/phone/auto`, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                      },
                    }).then(() => {
                      navigate(`/auto`);
                    });
                  }
                  }
                >auto</button>
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  );
};

export default GenerateNumberPage;
