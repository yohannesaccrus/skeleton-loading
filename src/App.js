import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

	const [meta, setMeta] = useState(true)
	const [metaQuote, setMetaQuote] = useState(true)
	const [quote, setQuote] = useState('')
	const [users, setUsers] = useState([])

	const get = async () => {
		setMeta(true)
		axios({
			method: 'get',
			url: 'https://json-placeholder-api.now.sh/api/profiles'
		}).then(res => {
			setUsers(res.data.default.profiles)
			setMeta(false)
		})
	}

	const getQuote = async () => {
		setMetaQuote(true)
		axios({
			method: 'get',
			url: 'https://api.kanye.rest/'
		}).then(res => {
			setTimeout(() => {
				setQuote(res.data.quote)
				setMetaQuote(false)
			}, 3000)
		})
	}

	useEffect(() => {
		get()
		getQuote()
	}, [])

	let userMeta = []

	for (let i = 0; i < 10; i++) {
		userMeta.push(
			<div className={'item'} key={i}>
				<div className={'media'}>
					<div className={'img'} state={'meta'} />
				</div>
				<div className={'text'}>
					<h4 className={'text'} state={'meta'}>Loading...</h4>
					<p className={'text'} state={'meta'}>Loading..</p>
					<p className={'text'} state={'meta'}>Loading..</p>
				</div>
			</div>
		)
	}

	return (
		<section className={'user'}>
			<div className={'descriptive'} layer={'title'}>
				<h3>Skeleton Experimental</h3>
				<p className={'text'} state={metaQuote && 'meta'}>{metaQuote ? 'Loading' : `Someone Say : ${quote}`}</p>
			</div>
			<div className={'descriptive'} layer={'container'}>
				{
					meta ?
						userMeta :
						users.map(user => (
							<div className={'item'} key={user.id}>
								<div className={'media'}>
									<img src={user.picture} alt={user.name} />
								</div>
								<div className={'text'}>
									<h4>{user.name}</h4>
									<p>{user.username}</p>
									<p>{user.email}</p>
								</div>
							</div>
						))}
			</div>
		</section>
	)
}

export default App