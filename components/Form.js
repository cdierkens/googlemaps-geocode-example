const Form = (props) => (
    <form>
        <fieldset>
            <legend>Display</legend>

            <div>
                <input 
                    type="radio"
                    id="map"
                    name="toggle"
                    value="map" 
                    checked={props.checked === "map"}
                    onChange={props.onToggle} 
                />
                <label for="map">Map</label>
            
                <input 
                    type="radio"
                    id="list"
                    name="toggle"
                    value="list" 
                    checked={props.checked === "list"} 
                    onChange={props.onToggle}
                />
                <label for="list">List</label>

                <input
                    type="text"
                    id="filter"
                    name="filter"
                    value={props.filter}
                    placeholder="Filter addresses..."
                    onChange={props.onFilter}
                />
            </div>
        </fieldset>
        <style jsx>{`
            fieldset {
                margin: 10px;
                border: 1px solid #ddd;
            }

            input[type='radio'] {
                appearance: none;
                display: inline-block;
                position: relative;
                background-color: #f1f1f1;
                color: #666;
                top: 10px;
                height: 30px;
                width: 30px;
                border: 0;
                border-radius: 50px;
                cursor: pointer;     
                margin-right: 7px;
                outline: none;
            }

            input[type='radio']:checked:before {
                 position: absolute;
                 font: 13px/1 'Open Sans', sans-serif;
                 left: 11px;
                 top: 7px;
                 content: '\\02143';
                 transform: rotate(40deg);
            }

            input[type='radio']:hover {
                background-color: #f7f7f7;
            }

            input[type='radio']:checked {
                background-color: #f1f1f1;
            }

            label {
                font: 300 16px/1.7 'Open Sans', sans-serif;
                color: #666;
                cursor: pointer;
            } 

            label ~ input {
                margin-left: 20px;
            }

            input[type='text'] {
                padding: 10px;
                float: right;
                border: 0;
                background-color: #f1f1f1;
                border-radius: 5px;
            }

            input[type='text']:hover {
                padding: 10px;
                float: right;
                border: 0;
                background-color: #f7f7f7;
                border-radius: 5px;
            }
        `}</style>
    </form>
)

export default Form