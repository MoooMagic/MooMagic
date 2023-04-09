import React from 'react'
import './Loader.css'

const Loader = (props) => {
    return (
        <>
            {
                props.loading ?
                    <div className="loader">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    : <></>
            }
        </>
    )
}

export default Loader
