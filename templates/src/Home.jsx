import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenerateNumberPage = () => {
  const [phoneNumber, setPhone] = useState();
  const [selectedValue, setSelectedValue] = useState('');

  const navigate = useNavigate();

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="text-center mt-48 mb-3">
        <div class="card-header bg-transparent text-center border-primary">
          Data No Handphone
        </div>
        <div class="card-body text-success">
          <div class="mb-3">
            <label for="no_hp" class="form-label">
              No Handphone
            </label>
            <input
              className="border-2 ml-2"
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
            <select id="Provider" className="ml-2" name="Provider" value={selectedValue} onChange={handleDropdownChange}>
              <option value="XL">XL</option>
              <option value="Telkomsel">Telkomsel</option>
              <option value="Indosat">Indosat</option>
            </select>

            <div className="mt-2">
              <button
                type="submit"
                className="border-2 w-40"
                onClick={() => {
                  fetch(`http://localhost:5000/phone/create`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      PhoneNumber: phoneNumber,
                      Provider: selectedValue,
                    }),
                  }).then(alert(`Phone Number: ${phoneNumber} created`))
                    .then(() => {
                      window.location.reload();
                    });
                }}>save</button>
              <button
                type="submit"
                className="border-2 w-40 ml-2"
                onClick={() => {
                  fetch(`http://localhost:5000/phone/auto`, {
                    method: "POST",
                    headers: {
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
      </div>
    </>
  );
};

export default GenerateNumberPage;
