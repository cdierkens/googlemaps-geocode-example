import React from 'react'
import fetch from 'isomorphic-unfetch'
import Map from '../components/map';

const Index = (props) => {
    let markers = Object.keys(props.data.addresses).filter((key) => {
        let address = props.data.addresses[key]
        return address && address.geometry && address.geometry.location_type === 'ROOFTOP'
    }).reduce((result, key) => result.concat(props.data.addresses[key]), [])

    return (<main>
        <section>
            <h1>Hello</h1>
            <Map markers={markers} />
            <pre>{JSON.stringify(props.data.addresses, null, 4)}</pre>
        </section>
    </main>)
}

Index.getInitialProps = async function({ req }) {
    const res = await fetch(`http://${req.headers.host}/api`)
    const data = await res.json()
    
    return { data }
}

export default Index