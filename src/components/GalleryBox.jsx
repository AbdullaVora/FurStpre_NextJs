import React from 'react'
import Link from "next/link";


const GalleryBox = ({ img, title_1, title_2 }) => {
    return (
        <>
            <div className="box rounded-3 position-relative">
                <img src={img} alt="image" className='img-fluid rounded-3 w-100' />
                <h2 style={{ color: title_1 == 'Chain' ? 'white' : 'black' }} className=' fs-1 position-absolute translate-middle fw-semibold'><span style={{ color: title_1 == 'Chain' ? '#AA8453' : '#0A5D5D' }}>{title_1}&nbsp;</span>{title_2}</h2>
                <p style={{ color: title_1 == 'Chain' ? 'white' : 'black' }} className='position-absolute translate-middle fw-semibold'>Get up to 40% off</p>
                <Link href="/collection"><button style={{ background: title_1 == 'Chain' ? 'white' : '#2c2c2c', color: title_1 == 'Chain' ? 'black' : 'white' }} className='py-2 px-3 position-absolute translate-middle fw-semibold'>SHOP NOW</button></Link>
            </div>
        </>
    )
}

export default GalleryBox
