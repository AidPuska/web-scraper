import React, { useState } from 'react'
import Results from '../components/Results'
import axios from 'axios'
import loader from '../assets/loader.png'

const Home = () => {

    const [link, setLink] = useState('')
    const [limit, setLimit] = useState(0)

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {

        if (link.slice(0, 14) !== 'https://olx.ba') {
            alert("Please enter olx site category")
            return setLink('')
        }

        try {
            setLoading(true)
            const res = await axios.post("http://localhost:8080/", {
                url: link,
                limit
            })
            if(res.status === 200) {
                setResults(res.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-[calc(100vh-64px)] flex md:flex-row flex-col justify-center gap-20 items-center'>
            <div className='w-[350px] flex flex-col gap-3'>
                <label>
                    <h3>Enter olx category link: </h3>
                    <input
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                        type="text"
                        className='focus:outline-none p-2 w-full focus:border-[#31acbf] focus:border-2 border-2 rounded'
                        placeholder='e.g. https://olx.ba/pretraga?category_id=224'
                    />
                </label>

                <label>
                    <h3>Enter number of pages to scrape: </h3>
                    <input 
                        type="number" 
                        className='focus:outline-none p-2 w-full focus:border-[#31acbf] focus:border-2 border-2 rounded'
                        onChange={(e) => setLimit(e.target.value)}
                        value={limit}
                    />
                    <p className='text-[13px] text-gray-400'>If you leave 0 it will scrape all available pages</p>
                </label>
                <button onClick={handleSubmit} type="submit" disabled={loading} className={loading ? 'bg-[#31acbf] px-1 py-2 text-white rounded font-semibold animate-pulse pointer cursor-wait' : 'bg-[#31acbf] px-1 py-2 text-white rounded font-semibold'}>
                    {loading ? <div className='flex justify-center items-center gap-5'>
                        <p>Scraping</p>
                        <img src={loader} alt="Scraping loader" className='w-7 h-7 animate-spin' />
                    </div> : 'Search'}
                </button>
            </div>

            <div className='w-[600px] max-h-[80vh] my-auto flex flex-col items-center'>
                <h3 className='mb-5'>Results: </h3>
                {results.length > 0 ? (
                    <div className='bg-sky-900 flex flex-col w-full h-[300px] overflow-y-auto'>
                        <p className='text-white p-2 text-sm'>Number of results is: {results.length}</p>
                        {results.map((result, i) => <Results result={result} index={i} />)}
                    </div>
                ) : (
                    <p>Not found</p>
                )}
            </div>
        </div>
    )
}

export default Home