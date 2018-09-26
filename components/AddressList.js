const AddressList = (props) => (
    <ul>
        {props.addresses.map(address => <li key={address.id}>{address.formatted_address}</li>)}
        <style jsx>{`
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }
            
            li {
                border-bottom: 1px solid #ccc;
                margin: 10px;
                padding: 20px 0 10px;
                text-indent: 20px;
            }
            
            li:last-child {
                border: none;
            }
        `}</style>
    </ul>
)

export default AddressList