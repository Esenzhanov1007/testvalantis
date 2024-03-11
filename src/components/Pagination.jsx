import React from 'react'
import "./Pagination.css"

export default function Pagination(props) {
  return (
    <div className="pagination">
        <nav role="navigation" aria-label="pagination" className="pagination-nav">
            <ul className='pagination-list'>
                <li className={(props.page != 0) ? 'pagination-prev' : 'disabled'} onClick={() => (props.page !=0) ? props.setPage(props.page - 1) : null}>Prev</li>
                <li className={(props.products?.length < 49) ? 'disabled' : 'pagination-next'} onClick={() => props.setPage(props.page + 1)}>Next</li>
            </ul>
        </nav>
    </div>
  )
}
