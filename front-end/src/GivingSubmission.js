
function GivingSubmission(){

    return(
        //onSubmit={handleSubmit}
        <form> 
            <ul>
                <label>$</label>
                <input
                type="text"
                placeholder="0"
                />
                <select>
                    <option value="tithes and offerings">tithes and offerings</option>
                </select>
            </ul>
            <h3>Frequency</h3>
            <ul>
                <select>
                    <option value="One Time">One Time</option>
                    <option value="Regularly">Regularly</option>
                </select>
            </ul>
            <h3>Email</h3>
            <ul>
                <input
                    type="text"
                    placeholder="Email..."
                />
            </ul>
            <h3>Name</h3>
            <ul>
                <input
                    type="text"
                    placeholder="First name..."
                />
            </ul>
            <ul>
                <input
                    type="text"
                    placeholder="Last name..."
                />
            </ul>

        </form>
    )
}

export default GivingSubmission