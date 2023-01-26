import React from 'react'

const Keyworditem = (props) => {
    const { Keyword } = props;
    return (
        <div className="col-md-3">

            <div className="card my-3">

                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{Keyword.title}</h5>
                        <i className="fa-solid fa-trash mx-2"></i>
                        <i className="fa-solid fa-user-pen mx-2"></i>
                    </div>

                    <p className="card-text">{Keyword.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Keyworditem
