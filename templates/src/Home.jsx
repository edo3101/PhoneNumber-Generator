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
      <div class="card border-primary mb-3">
        <div class="card-header bg-transparent text-center border-primary">
          Data No Handphone
        </div>
        <div class="card-body text-success">
          <div class="mb-3">
            <label for="no_hp" class="form-label">
              No Handphone
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
              class="form-control"
              id="PhoneNumber"
              name="PhoneNumber"
            />
          </div>
          <div class="mb-6">
            <label for="Provider">Choose a Provider:</label>
            <select id="Provider" name="Provider" value={selectedValue} onChange={handleDropdownChange}>
              <option value="XL">XL</option>
              <option value="Telkomsel">Telkomsel</option>
              <option value="Indosat">Indosat</option>
            </select>

            <div class="card-footer bg-transparent border-light">
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
