import React from 'react'
import fetch from 'isomorphic-unfetch'
import Map from '../components/Map';
import AddressList from '../components/AddressList'
import Form from '../components/Form'

class Index extends React.Component {
    state = {
        checked: "map",
        filter: "",
        addresses: this.props.data.addresses
    }

    handleToggleChange = (event) => {
        this.setState({
            checked: event.target.value
        })
    }

    handlerFilterChange = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    addressFilter = address => (address.formatted_address
        .toLowerCase()
        .indexOf(this.state.filter.toLowerCase()) > -1)
    

    filteredAddresses = () => {
        if (!this.state.filter) {
            return this.state.addresses
        }

        return this.state.addresses.filter(this.addressFilter)
    }

    render = () => (<main>
        <section>
            <h1>Rooftop Addresses</h1>
            <Form 
                checked={this.state.checked}
                onToggle={this.handleToggleChange}
                filter={this.state.filter}
                onFilter={this.handlerFilterChange}
            />
            {
                (this.state.checked === "map") ? 
                <Map markers={this.filteredAddresses()} /> :
                <AddressList addresses={this.filteredAddresses()} />
            }
            <style jsx global>{`
                body { 
                    font-family: "Open Sans", Arial,"Helvetica Neue",Helvetica,sans-serif;
                    font-size: 16px;
                    color: #444
                }

                h1 {
                    border-bottom: 1px solid #ccc;
                    font-weight: normal;
                }
            `}</style>
        </section>
    </main>)
}

Index.getInitialProps = async function({ req }) {
    const res = await fetch(`http://${req.headers.host}/api?geometry.location_type=ROOFTOP`)
    const data = await res.json()
    
    return { data }
}

export default Index